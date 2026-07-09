import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { HelperService } from '../../common/services/helper.service';
import { FindOneByOptions } from '../interfaces/find.interface';

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

  async findOneByOptionConfig(id: string) {
    const options: FindOneByOptions = {
      search: { id },
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
    return this.checkValue(orderDoc, 'Không tìm thấy đơn hàng!');
  }
}
