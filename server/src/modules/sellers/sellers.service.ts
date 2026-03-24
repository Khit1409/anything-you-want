import { BadRequestException, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { SellerRepository } from './sellers.repository';
import { CreateSellerDto, CreateSellerPhoneDto } from './dto/create-seller.dto';
import { HttpResponse } from '@/src/helpers/httpResponse';
import { StrHellper } from '@/src/helpers/str.helper';
import { StoreService } from '../stores/stores.service';
import { StoreRepository } from '../stores/stores.repository';

@Injectable()
export class SellerService {
  constructor(
    private readonly repo: SellerRepository,
    private readonly httpHellper: HttpResponse,
    private readonly strHellper: StrHellper,
    private readonly storeService: StoreService,
    private readonly storeRepo: StoreRepository,
  ) {}

  /**
   * create new seller account.
   * @param dto
   * @returns
   */
  async createSeller(dto: CreateSellerDto) {
    const { currentPassword, emailAddress, info, phones, store } = dto;
    //check existing.
    const existing = await this.repo.findByEmail(emailAddress);

    if (existing) throw new BadRequestException('email is exsiting!');

    //check existing store email
    const existingStoreEmail = await this.storeRepo.getByStoreEmail(
      store.info.emailAddress,
    );

    if (existingStoreEmail) {
      throw new BadRequestException('store email is existing!');
    }

    //check same phone number info phones
    if (this.checkExistSamePhone(phones)) {
      throw new BadRequestException('Phone number is duplicate!');
    }

    //rewrite correct date format (yyyy/mm/dd)
    const formatDate = this.strHellper.convertDateStringToCorrectFormat(
      info.dateOfBirth,
    );
    //hash password
    const hashPassword = await bcrypt.hash(currentPassword, 10);
    //rewrite store data
    const hashStoreCode = await bcrypt.hash(store.storeCode, 10);
    const storeData = {
      ...store,
      storeCode: hashStoreCode,
      info: {
        ...store.info,
        slug: this.storeService.createStoreSlug(store.info.name),
        emailAddress: store.info.emailAddress ?? emailAddress,
      },
    };
    //rewrite store data from dto
    const infoData = { ...info, dateOfBirth: formatDate };
    //using repo
    const newSeller = await this.repo.create(
      {
        ...dto,
        info: infoData,
        store: storeData,
      },
      hashPassword,
    );

    if (!newSeller || !newSeller.store) {
      throw new BadRequestException('Cant create new seller auth data!');
    }

    return { ...this.httpHellper.success('New seller is ready created!') };
  }

  /**
   * return true if in array existing same phone number.
   * @param phones
   * @returns
   */
  checkExistSamePhone(phones: CreateSellerPhoneDto[]) {
    const hasDuplicate = phones.some((phone, index) => {
      return (
        phones.findIndex((p) => p.phoneNumber === phone.phoneNumber) !== index
      );
    });
    return hasDuplicate;
  }
}
