import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CreateOrderService } from '../services/create.service';
import { CreateOrderDto } from '../dtos/create.dto';
import type { Request } from 'express';
import { HelperService } from '../../common/services/helper.service';
import { PaymentType } from '../entities/order-payment.entity';
import { ReadOrderService } from '../services/read.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly createService: CreateOrderService,
    private readonly helperService: HelperService,
    private readonly readService: ReadOrderService,
  ) {}

  @Get('')
  async getUserOrders(@Req() req: Request) {
    const { userId } = req;
    const orders = await this.readService.getOrderList(userId);
    return this.helperService.successResponse({
      message: 'Danh sách đơn hàng',
      data: orders,
    });
  }

  @Get('payment/:id')
  async getPayment(@Param('id') id: string) {
    const data = await this.readService.getPaymentBanking(id);
    return this.helperService.successResponse({
      message: 'Thông tin thanh toán của đơn hàng!',
      data,
    });
  }

  @Post('')
  async order(@Body() dto: CreateOrderDto, @Req() req: Request) {
    const { userId } = req;
    const { paymentType, orderId } = await this.createService.createOrder(
      dto,
      userId,
    );
    const message =
      paymentType === PaymentType.DELIVERED
        ? 'Đặt hàng thành công!'
        : 'Đặt hàng thành công, vui lòng thanh toán!';
    return this.helperService.successResponse({
      data: { paymentType, orderId },
      message,
    });
  }
}
