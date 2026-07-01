import { Injectable, NotFoundException } from '@nestjs/common';
import { HelperService } from '../../common/services/helper.service';
import { StoreRepository } from '../repositories/stores.repository';
import { DeleteResult } from 'typeorm';

@Injectable()
export class DeleteStoreService {
  constructor(
    private readonly helperService: HelperService,
    private readonly repository: StoreRepository,
  ) {}

  checkResult(result: DeleteResult) {
    const { affected } = result;
    if (!affected) {
      throw new NotFoundException(
        this.helperService.errorResponse({ message: 'Xóa của hàng thất bại!' }),
      );
    }

    return affected;
  }

  async deleteBySellerId(sellerId: string) {
    const result = await this.repository.deleteBySellerId(sellerId);
    return this.checkResult(result);
  }

  async deleteBySellerEmail(sellerEmail: string) {
    const result = await this.repository.deleteBySellerEmail(sellerEmail);
    return this.checkResult(result);
  }

  async deleteById(id: string) {
    const result = await this.repository.deleteById(id);
    return this.checkResult(result);
  }
}
