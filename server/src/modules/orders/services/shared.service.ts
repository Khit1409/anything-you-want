import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { HelperService } from '../../common/services/helper.service';

@Injectable()
export class SharedOrderService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly helperService: HelperService,
  ) {}

  checkValue<T>(value?: T | null, message?: string) {
    if (!value)
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: message ?? 'Dữ liệu đơn hàng không tồn tại!',
        }),
      );
    return value;
  }

  async findOne(id: string) {
    const orderDoc = await this.repository.findOne(id);
    return this.checkValue(orderDoc, 'Không tìm thấy đơn hàng!');
  }
}
