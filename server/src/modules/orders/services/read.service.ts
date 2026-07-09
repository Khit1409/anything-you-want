import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { HelperService } from '@/modules/common/services/helper.service';
import { CreatePaymentParams } from '@/modules/payments/interfaces/payment.interface';
import { PaymentService } from '@/modules/payments/services/payment.service';
import {
  FindManyByOptions,
  FindOneByOptions,
} from '../interfaces/find.interface';
import { GetSellerOrderQueryDto } from '../dtos/get.dto';

@Injectable()
export class ReadOrderService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly helperService: HelperService,
    private readonly paymentService: PaymentService,
  ) {}

  async getOrderList(userId: string) {
    const search = { user: { id: userId } };
    const orders = await this.repository.findMany({
      search,
      select: {
        address: { detail: true, province: true, ward: true },
        contact: { userName: true, email: true, phone: true },
        shipping: { startedAt: true, finishedAt: true, type: true },
        payment: { status: true, type: true },
        store: {
          id: true,
          info: { name: true },
        },
      },
      relations: {
        address: true,
        contact: true,
        shipping: true,
        payment: true,
        store: { info: true },
        user: true,
      },
    });
    return orders;
  }

  async getOrderDetail({
    orderId,
    sellerId,
    userId,
  }: {
    orderId: string;
    userId?: string;
    sellerId?: string;
  }) {
    const filter: FindManyByOptions = {
      search: {
        id: orderId,
        seller: { id: sellerId },
        user: { id: userId },
      },
      relations: {
        address: true,
        contact: true,
        shipping: true,
        payment: true,
        store: { info: true },
        user: true,
        seller: true,
      },
    };
    const orderDoc = await this.repository.findOneByOption(filter);
    return this.helperService.checkValue(orderDoc, 'Đơn hàng không tồn tại!');
  }

  async getOrderListBySeller(sellerId: string, query: GetSellerOrderQueryDto) {
    const { status, page, paymentStatus } = query;
    const limit = 30;
    const skip = (page ?? 1) * limit - limit;

    console.log(skip);

    const filter: FindManyByOptions = {
      search: {
        seller: { id: sellerId },
        status,
        payment: { status: paymentStatus },
      },
      select: {
        store: { id: true, info: { name: true } },
      },
      relations: {
        seller: true,
        address: true,
        contact: true,
        shipping: true,
        payment: true,
        store: { info: true },
      },
    };
    const orders = await this.repository.findMany(filter);
    return orders;
  }

  async getPaymentBanking(orderId: string) {
    const options: FindOneByOptions = {
      search: { id: orderId },
      select: {
        store: {
          id: true,
          bankPayment: true,
          bankPaymentConfig: true,
        },
      },
      relations: {
        seller: true,
        store: true,
        user: true,
        payment: true,
        address: true,
        contact: true,
      },
    };
    const orderDoc = await this.repository.findOneByOption(options);
    const order = this.helperService.checkValue(
      orderDoc,
      'Đơn hàng không tồn tại!',
    );
    console.log(order);
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
