import { Injectable } from '@nestjs/common';
import { StoreRepository } from '../repositories/stores.repository';
import { HelperStoreService } from './helper.service';
import {
  GetOneStoreRelations,
  GetOneStoreSelects,
  SearchOneStore,
} from '../repositories/interfaces/store-repository.interface';

@Injectable()
export class SharedStoreService {
  constructor(
    private readonly repository: StoreRepository,
    private readonly helperStoreService: HelperStoreService,
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
    const store = this.helperStoreService.checkValue(
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
}
