import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SellerRepository } from '../repositories/sellers.repository';
import { HelperService } from '../../common/services/helper.service';
import { CreateSellerDto, CreateSellerInfoDto } from '../dtos';
import { SellerStatus } from '../entities/seller.entity';
import * as bcrypt from 'bcrypt';
import { HelperSellerService } from './helper.service';
import { CreateStoreService } from '../../stores/services/create.service';
import { SharedUserService } from '../../users/services/shared.service';

@Injectable()
export class CreateSellerService {
  constructor(
    private readonly repository: SellerRepository,
    private readonly sharedUserService: SharedUserService,
    private readonly helperSellerService: HelperSellerService,
    private readonly helperService: HelperService,
    private readonly createStoreService: CreateStoreService,
  ) {}

  createInfoInsertData(currentData: CreateSellerInfoDto) {
    const { dateOfBirth, firstName, fullName, lastName, avatar } = currentData;

    return {
      dateOfBirth:
        this.helperService.convertDateStringToCorrectFormat(dateOfBirth),
      firstName,
      fullName,
      lastName,
      avatar,
    };
  }

  async createInsertData(dto: CreateSellerDto) {
    const { addresses, currentPassword, emailAddress, info, phones, store } =
      dto;
    const hashPassword = await bcrypt.hash(currentPassword, 10);
    return {
      addresses,
      status: SellerStatus.ACTIVE,
      emailAddress,
      hashPassword,
      info: this.createInfoInsertData(info),
      phones,
      store: await this.createStoreService.createStoreInsertData(
        store,
        emailAddress,
      ),
    };
  }

  async create(dto: CreateSellerDto) {
    const { addresses, emailAddress, phones } = dto;

    const existing =
      await this.helperSellerService.checkExistingByEmail(emailAddress);

    if (existing) {
      throw new BadRequestException(
        this.helperService.errorResponse({ message: 'Người dùng đã tồn tại!' }),
      );
    }

    const duplicatePhone = this.helperSellerService.checkDuplicatePhone(phones);
    if (duplicatePhone) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Số điện thoại trùng lặp!',
        }),
      );
    }
    const duplicateAddress =
      this.helperSellerService.checkDuplicateAddress(addresses);

    if (duplicateAddress) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Địa chỉ trùng lặp!',
        }),
      );
    }

    const insertData = await this.createInsertData(dto);

    const newSeller = await this.repository.create(insertData);

    if (!newSeller) {
      throw new NotFoundException(
        this.helperService.errorResponse({
          message: 'Quá trình đăng ký thất bại!',
        }),
      );
    }
    return true;
  }
}
