import { BadRequestException, Injectable } from '@nestjs/common';
import { HelperService } from '../../helpers/helper.service';
import { AcceptedPaymentMethodParams } from '../interfaces/helper.interface';
import { PaymentType } from '../../orders/entities/order-payment.entity';
import { StoreRepository } from '../repositories/stores.repository';

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
    bankingId,
  }: AcceptedPaymentMethodParams) {
    const storeDoc = await this.repository.findOnById(storeId);
    const store = this.checkValue(storeDoc);
    const { momoPayment, bankPayments } = store;
    if (paymentMethod === PaymentType.BANKING) {
      if (!bankingId) {
        throw new BadRequestException(
          this.helperService.errorResponse({
            message: 'Id bank not found while payment method is banking!',
          }),
        );
      }
      const bank = bankPayments.find((f) => f.id === bankingId);
      const bankPayment = this.checkValue(
        bank,
        'Ngân hàng thụ hưởng không tồn tại!',
      );
      return bankPayment.enabled;
    }
    return momoPayment.enabled;
  }
}
