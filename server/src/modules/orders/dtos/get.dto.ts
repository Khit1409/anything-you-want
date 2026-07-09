import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';
import { PaymentStatus } from '../entities/order-payment.entity';

export class GetSellerOrderQueryDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;
  @IsOptional()
  @IsNumber()
  page: number;
}
