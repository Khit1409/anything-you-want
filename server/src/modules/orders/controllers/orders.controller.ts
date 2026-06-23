import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateOrderService } from '../services/create.service';
import { CreateOrderDto } from '../dtos/create.dto';
import type { Request } from 'express';
import { HelperService } from '../../helpers/helper.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly createService: CreateOrderService,
    private readonly helperService: HelperService,
  ) {}

  @Post('')
  async order(@Body() dto: CreateOrderDto, @Req() req: Request) {
    const { userId } = req;
    const { success, paymentLink } = await this.createService.createOrder(
      dto,
      userId,
    );
    const message = paymentLink
      ? 'Đặt hàng thành công, vui lòng thanh toán trong bước tiếp theo'
      : 'Đặt hàng thành công!';
    return this.helperService.responseConfig({
      success,
      data: { paymentLink },
      message,
    });
  }
}
