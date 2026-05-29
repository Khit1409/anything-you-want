import { BadRequestException, Injectable } from '@nestjs/common';
import { SellerRepository } from '../repositories/sellers.repository';
import { HelperService } from '../../helpers/helper.service';

@Injectable()
export class SharedSellerService {
  constructor(
    private readonly repository: SellerRepository,
    private readonly helperService: HelperService,
  ) {}

  checkValue<T>(value: T | null | undefined, message: string) {
    if (!value) {
      throw new BadRequestException(
        this.helperService.errorResponse({ message }),
      );
    }
    return value;
  }

  async findOneById(sellerId: string) {
    const seller = await this.repository.findOneById(sellerId);
    return this.checkValue(seller, 'Người dùng không tồn tại!');
  }

  async findOneByEmail(emailAddress: string) {
    const seller = await this.repository.findOneByEmail(emailAddress);
    return this.checkValue(seller, 'Người dùng không tồn tại!');
  }
}
