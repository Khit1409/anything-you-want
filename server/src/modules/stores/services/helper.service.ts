import { BadRequestException, Injectable } from '@nestjs/common';
import { HelperService } from '../../common/services/helper.service';
import { AcceptedPaymentMethodParams } from '../interfaces/helper.interface';
import { PaymentType } from '../../orders/entities/order-payment.entity';
import { StoreRepository } from '../repositories/stores.repository';
import {
  GetOneStoreRelations,
  GetOneStoreSelects,
  SearchOneStore,
} from '../repositories/interfaces/store-repository.interface';

@Injectable()
export class HelperStoreService {
  constructor(
    private readonly helperService: HelperService,
    private readonly repository: StoreRepository,
  ) {}

  checkValue<T>(value?: T | null, message?: string): T {
    if (!value) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message:
            message ?? 'Dữ liệu cửa hàng không tìm thấy hoặc không tồn tại!',
        }),
      );
    }
    return value;
  }

  async acceptedPaymentMethod({
    storeId,
    paymentMethod,
  }: AcceptedPaymentMethodParams) {
    const search: SearchOneStore = { id: storeId };
    const select: GetOneStoreSelects = ['bankPayment', 'momoPayment'];
    const relations: GetOneStoreRelations = {
      bankPayment: true,
      momoPayment: true,
    };
    const storeDoc = await this.repository.findOneByOptions({
      search,
      select,
      relations,
    });
    const store = this.checkValue(storeDoc);
    const { momoPayment, bankPayment } = store;
    console.log(store, momoPayment, bankPayment);
    if (paymentMethod === PaymentType.BANKING) {
      return bankPayment.enabled;
    }
    return momoPayment.enabled;
  }
}
