import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { HelperService } from '@/modules/common/services/helper.service';
import { CreatePaymentParams } from '@/modules/payments/interfaces/payment.interface';
import { PaymentService } from '@/modules/payments/services/payment.service';

@Injectable()
export class ReadOrderService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly helperService: HelperService,
    private readonly paymentService: PaymentService,
  ) {}

  async getPaymentBanking(orderId: string) {
    const orderDoc = await this.repository.findOne(orderId);
    const order = this.helperService.checkValue(
      orderDoc,
      'Đơn hàng không tồn tại!',
    );
    const { store, user, address, contact, orderCode } = order;
    const storeId = store.id;
    const buyerAddress = `${address.detail}-${address.ward}-${address.province}`;
    const buyerEmail = contact.email;
    const buyerName = contact.userName;
    const buyerPhone = contact.phone;
    const userId = user.id;
    const totalPrice = order.totalPrice;
    const paymentParams: CreatePaymentParams = {
      buyerAddress,
      buyerEmail,
      buyerName,
      buyerPhone,
      orderCode,
      storeId,
      totalPrice,
      orderId,
      userId,
    };
    const paymentData = await this.paymentService.create(paymentParams);
    return { orderId, paymentData };
  }
}
