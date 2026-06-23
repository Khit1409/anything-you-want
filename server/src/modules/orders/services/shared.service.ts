import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { HelperService } from '../../helpers/helper.service';

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

  async findOne() {}
}
