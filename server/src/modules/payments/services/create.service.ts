import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentLinkRequest, PayOS } from '@payos/node';
import { Order } from '../../orders/entities/order.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CreatePaymentService {
  constructor(
    @Inject('PAYOS') private readonly payos: PayOS,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  async createPaymentLink(order: Order) {
    const sercetKey = this.configService.get<string>('PRIVATE_KEY')!;
    const { user, id, orderCode, contact, totalPrice, address } = order;
    const signatureData = {
      uid: user.id,
      oid: id,
      orderCode,
      phone: contact.phone,
      email: contact.email,
    };
    const signature = await this.payos.crypto.createSignature(
      sercetKey,
      signatureData,
    );
    const buyerAddress = `${address.detail}-${address.ward}-${address.province}`;
    const payload: CreatePaymentLinkRequest = {
      amount: totalPrice,
      cancelUrl: `http://localhost:3000/orders/checkout/cancel/${id}`,
      description: `Thanh toán đơn hàng`,
      orderCode,
      returnUrl: `http://localhost:3000/orders/checkout/success/${id}`,
      buyerAddress,
      buyerEmail: contact.email,
      buyerName: contact.userName,
      buyerPhone: contact.phone,
      expiredAt: Math.floor(Date.now() / 1000) + 15 * 60,
      signature,
    };
    const paymentLink = await this.payos.paymentRequests.create(payload);
    return paymentLink;
  }
}
