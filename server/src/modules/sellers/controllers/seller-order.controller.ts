import { HelperService } from '@/modules/common/services/helper.service';
import { GetSellerOrderQueryDto } from '@/modules/orders/dtos/get.dto';
import { ReadOrderService } from '@/modules/orders/services/read.service';
import { IsSeller } from '@/shared/decorators/roles.decorator';
import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import type { Request } from 'express';
@IsSeller()
@Controller('sellers/orders')
export class SellerOrderController {
  constructor(
    private readonly readOrderService: ReadOrderService,
    private helperService: HelperService,
  ) {}
  @Get('')
  async getAllOrder(
    @Req() req: Request,
    @Query() query: GetSellerOrderQueryDto,
  ) {
    const sellerId = req.userId;
    const data = await this.readOrderService.getOrderListBySeller(
      sellerId,
      query,
    );
    return this.helperService.successResponse({
      message: 'Danh sách đơn hàng',
      data,
    });
  }

  @Get('detail/:id')
  async getDetail(@Param('id') orderId: string, @Req() req: Request) {
    const sellerId = req.userId;
    const data = await this.readOrderService.getOrderDetail({
      sellerId,
      orderId,
    });
    return this.helperService.successResponse({
      message: 'Đơn hàng chi tiết',
      data,
    });
  }
}
