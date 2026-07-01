import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderPayment } from '../entities/order-payment.entity';
import { Repository } from 'typeorm';
import { UpdateCheckoutParams } from '../interfaces/update.interface';

@Injectable()
export class OrderPaymentRepository {
  constructor(
    @InjectRepository(OrderPayment)
    private readonly ormRepo: Repository<OrderPayment>,
  ) {}

  async updateCheckout(params: UpdateCheckoutParams) {
    const {
      checkoutUrl,
      orderId,
      description,
      qrCode,
      paymentLinkId,
      expiredAt,
    } = params;
    return await this.ormRepo.update(
      { order: { id: orderId } },
      { checkoutUrl, expiredAt, description, qrCode, paymentLinkId },
    );
  }
}
