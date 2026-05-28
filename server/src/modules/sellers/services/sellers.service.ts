import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { SellerRepository } from '../repositories/sellers.repository';
import { CreateSellerDto, CreateSellerPhoneDto } from '../dtos';
import { StoreService } from '../../stores/stores.service';
import { StoreRepository } from '../../stores/stores.repository';
import { HelperService } from '../../helpers/helper.service';

@Injectable()
export class SellerService {
  constructor(
    private readonly repo: SellerRepository,
    private readonly storeService: StoreService,
    private readonly storeRepo: StoreRepository,
    private readonly helperService: HelperService,
  ) {}

  checkExistSamePhone(phones: CreateSellerPhoneDto[]): boolean {
    const hasDuplicate = phones.some((phone, index) => {
      return (
        phones.findIndex((p) => p.phoneNumber === phone.phoneNumber) !== index
      );
    });
    return hasDuplicate;
  }

  async createSeller(dto: CreateSellerDto) {
    const { currentPassword, emailAddress, info, phones, store } = dto;

    // Kiểm tra email người bán đã tồn tại
    const existing = await this.repo.findByEmail(emailAddress);
    if (existing) {
      throw new BadRequestException(
        this.helperService.errorResponse({ message: 'Email đã được sử dụng!' }),
      );
    }

    // Kiểm tra email cửa hàng đã tồn tại
    const existingStoreEmail = await this.storeRepo.getByStoreEmail(
      store.info.emailAddress,
    );
    if (existingStoreEmail) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Email cửa hàng đã được sử dụng!',
        }),
      );
    }

    // Kiểm tra số điện thoại trùng lặp
    if (this.checkExistSamePhone(phones)) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Số điện thoại trùng lặp!',
        }),
      );
    }

    // Định dạng ngày sinh
    const formatDate = this.helperService.convertDateStringToCorrectFormat(
      info.dateOfBirth,
    );

    // Hash mật khẩu
    const hashPassword = await bcrypt.hash(currentPassword, 10);

    // Chuẩn bị dữ liệu cửa hàng
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

    // Chuẩn bị dữ liệu thông tin cá nhân
    const infoData = { ...info, dateOfBirth: formatDate };

    // Tạo người bán mới
    const newSeller = await this.repo.create(
      {
        ...dto,
        info: infoData,
        store: storeData,
      },
      hashPassword,
    );

    if (!newSeller || !newSeller.store) {
      throw new NotFoundException(
        this.helperService.errorResponse({
          message: 'Có lỗi khi tạo tài khoản mới!',
        }),
      );
    }

    return true;
  }

  async checkExistingSeller(sellerId: string) {
    const seller = await this.repo.getById(sellerId);
    if (!seller) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Không tồn tại người dùng!',
        }),
      );
    }
    return seller;
  }

  async getSellerProfile(id: string) {
    const seller = await this.repo.getById(id);
    if (!seller) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Không tồn tại người dùng',
        }),
      );
    }

    return seller;
  }
}
