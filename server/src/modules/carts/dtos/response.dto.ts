import { ResponseDto } from '@/src/modules/common/dto/response.common.dto';
import { Expose, Type } from 'class-transformer';

export class CartApiResponseDto extends ResponseDto {
  status!: number;
  data!: CartApiDataResponseDto;
}

export class CartApiDataResponseDto {
  carts!: Array<CartResponseDto>;
}
export class CartInfoResponseDto {
  @Expose()
  originPrice: number;
  @Expose()
  productId: string;
  @Expose()
  quantity: number;
  @Expose()
  sale: number;
  @Expose()
  sku: string;
  @Expose()
  totalPrice: number;
}

export class CartResponseDto {
  @Expose({ name: '_id' })
  id!: string;
  @Expose()
  @Type(() => CartInfoResponseDto)
  info!: CartInfoResponseDto;
  @Expose()
  seleted!: string;
  @Expose()
  thumbnail: string;
  @Expose()
  createdAt!: string;
  @Expose()
  updatedAt!: string;
}
