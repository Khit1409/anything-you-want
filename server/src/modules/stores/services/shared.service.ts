import { Injectable } from '@nestjs/common';
import { StoreRepository } from '../repositories/stores.repository';
import {
  GetOneStoreOptions,
  GetOneStoreRelations,
  GetOneStoreSelects,
  SearchOneStore,
} from '../repositories/interfaces/store-repository.interface';
import { HelperService } from '../../common/services/helper.service';
import { StoreBankingPaymentConfigRepository } from '../repositories/store-banking-config.repository';

@Injectable()
export class SharedStoreService {
  constructor(
    private readonly repository: StoreRepository,
    private readonly helperService: HelperService,
    private readonly storeBankingConfigRepository: StoreBankingPaymentConfigRepository,
  ) {}

  async getPaymentList(storeId: string, sellerId?: string) {
    const relations: GetOneStoreRelations = {
      bankPayment: true,
      momoPayment: true,
    };
    const search: SearchOneStore = {
      id: storeId,
    };
    const select: GetOneStoreSelects = ['id'];
    if (sellerId) {
      search.seller = { id: sellerId };
    }

    const storeDoc = await this.repository.findOneByOptions({
      search,
      relations,
      select,
    });
    const store = this.helperService.checkValue(
      storeDoc,
      'Dữ liệu cửa hàng không tìm thấy! Store not found!',
    );

    const bankPayment = store.bankPayment.enabled;
    const momoPayment = store.momoPayment.enabled;

    const list: { name: string; supported: boolean }[] = [
      { name: 'delivered', supported: true },
    ];

    if (bankPayment) {
      list.push({ name: 'banking', supported: true });
    }

    if (momoPayment) {
      list.push({ name: 'momo', supported: true });
    }

    return list;
  }

  async getOneStoreBySeller(sellerId: string) {
    const storeDoc = await this.repository.getOneBySellerId(sellerId);
    return this.helperService.checkValue(storeDoc, 'Cửa hàng không tìm thấy!');
  }

  async getBankingConfig(storeId: string) {
    const storeDoc = await this.storeBankingConfigRepository.getConfig(storeId);
    return this.helperService.checkValue(
      storeDoc,
      'Không tìm thấy cấu hình ngân hàng!',
    );
  }

  async getOneStoreByOptions(otpions: GetOneStoreOptions) {
    const storeDoc = await this.repository.findOneByOptions(otpions);
    return this.helperService.checkValue(storeDoc, 'Không tìm thấy cửa hàng');
  }
}
