import { BadRequestException, Injectable } from '@nestjs/common';
import { StoreRepository } from '../repositories/stores.repository';
import { HelperService } from '../../helpers/helper.service';

@Injectable()
export class ReadStoreService {
  constructor(
    private readonly repository: StoreRepository,
    private readonly helperService: HelperService,
  ) {}

  checkValue<T>(value?: T | null) {
    if (!value) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Không tìm thấy cửa hàng!',
        }),
      );
    }
    return value;
  }

  async getBySellerEmail(sellerEmail: string) {
    const store = await this.repository.getOneBySellerEmail(sellerEmail);
    return this.checkValue(store);
  }

  async getBySellerId(sellerId: string) {
    const store = await this.repository.getOneBySellerId(sellerId);
    return this.checkValue(store);
  }

  async getBySlugName(slug: string) {
    const store = await this.repository.getOneBySlugName(slug);
    return this.checkValue(store);
  }

  async getByEmail(storeEmail: string) {
    const store = await this.repository.getOneStoreEmail(storeEmail);
    return this.checkValue(store);
  }

  async getInfoById(id: string) {
    const info = await this.repository.getInfoById(id);
    return this.checkValue(info);
  }
}
