import { Expose } from 'class-transformer';
export class ShippingResponseDto {
  @Expose()
  flash: boolean;
  @Expose()
  normal: boolean;
}
