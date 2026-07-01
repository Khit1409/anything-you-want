import { IsOptional, IsString } from 'class-validator';
export class CancelPaymentDto {
  @IsString()
  orderId: string;
  @IsString()
  paymentLinkId: string;
  @IsOptional()
  @IsString()
  cancellationReason?: string;
}
