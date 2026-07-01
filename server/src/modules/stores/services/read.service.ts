import { Injectable } from '@nestjs/common';
import { StoreRepository } from '../repositories/stores.repository';
import { HelperService } from '../../common/services/helper.service';

@Injectable()
export class ReadStoreService {
  constructor(
    private readonly repository: StoreRepository,
    private readonly helperService: HelperService,
  ) {}

  async getBySellerEmail(sellerEmail: string) {
    const store = await this.repository.getOneBySellerEmail(sellerEmail);
    return this.helperService.checkValue(store);
  }

  async getBySellerId(sellerId: string) {
    const store = await this.repository.getOneBySellerId(sellerId);
    return this.helperService.checkValue(store);
  }

  async getBySlugName(slug: string) {
    const store = await this.repository.getOneBySlugName(slug);
    return this.helperService.checkValue(store);
  }

  async getByEmail(storeEmail: string) {
    const store = await this.repository.getOneStoreEmail(storeEmail);
    return this.helperService.checkValue(store);
  }

  async getInfoById(id: string) {
    const info = await this.repository.getInfoById(id);
    return this.helperService.checkValue(info);
  }
}
