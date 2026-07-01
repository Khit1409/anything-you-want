import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { HelperService } from '@/modules/common/services/helper.service';

@Injectable()
export class DeleteOrderService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly helperService: HelperService,
  ) {}

  async deleteById(orderId: string) {
    const orderDoc = await this.repository.findOneIsPending(orderId);
    this.helperService.checkValue(
      orderDoc,
      'Đơn hàng không tồn tại hoặc đang trong trạng thái đã xác nhận!',
    );
    const { affected } = await this.repository.delete(orderId);
    if (affected == 1) return true;
    return false;
  }
}
