import { BadRequestException, Injectable } from '@nestjs/common';
import { SellerRepository } from '../repositories/sellers.repository';
import { HelperService } from '../../common/services/helper.service';

@Injectable()
export class ReadSellerService {
  constructor(
    private readonly repository: SellerRepository,
    private readonly helperService: HelperService,
  ) {}

  checkValue<V>(value?: V | null) {
    if (!value) {
      throw new BadRequestException(
        this.helperService.errorResponse({ message: 'Dữ liệu không tồn tại!' }),
      );
    }
    return value;
  }

  async getProfileById(sellerId: string) {
    const existing = await this.repository.getById(sellerId);
    const seller = this.checkValue(existing);
    const {
      info,
      addresses,
      phones,
      createdAt,
      updatedAt,
      lastLoginAt,
      status,
      store,
    } = seller;

    return {
      info,
      addresses,
      phones,
      createdAt,
      updatedAt,
      lastLoginAt,
      status,
      store,
    };
  }
}
