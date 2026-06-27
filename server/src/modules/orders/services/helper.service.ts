import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { PaymentType } from '../entities/order-payment.entity';
import { HelperStoreService } from '../../stores/services/helper.service';
import { CheckPaymethodParams } from '../interfaces/helper.interface';
import { HelperService } from '../../helpers/helper.service';

@Injectable()
export class HelperOrderService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly helperStoreService: HelperStoreService,
    private readonly helperService: HelperService,
  ) {}

  async checkPaymethod({ paymentType, storeId }: CheckPaymethodParams) {
    let isAcceptedPaymethod = true;
    if (paymentType !== PaymentType.DELIVERED) {
      isAcceptedPaymethod = await this.helperStoreService.acceptedPaymentMethod(
        {
          storeId,
          paymentMethod: paymentType,
        },
      );
    }
    if (!isAcceptedPaymethod) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: `Cửa hàng này không hộ trợ phương thức thanh toán ${paymentType}, vui lòng chọn phương thức khác!`,
        }),
      );
    }
  }
}
