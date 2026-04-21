import { Expose, Type } from 'class-transformer';
import { ResponseDto } from '../../common/dto/response.common.dto';
import { ProductImageResponseDto } from '../../products/dto/products.response.dto';

export class CartCategoryResponseDto {
  @Expose()
  name!: string;
  @Expose()
  id!: string;
}

export class CartOwnerResponseDto {
  @Expose()
  sellerId: string;
  @Expose()
  storeId: string;
  @Expose()
  userId: string;
}

export class CartShippingResponseDto {
  @Expose()
  flash!: boolean;
  @Expose()
  normal!: boolean;
}

export class CartApiResponseDto extends ResponseDto {
  status!: number;
  data!: CartApiDataResponseDto;
}

export class CartApiDataResponseDto {
  carts!: Array<CartResponseDto>;
}

export class CartInfoResponseDto {
  @Expose()
  @Type(() => CartCategoryResponseDto)
  category: CartCategoryResponseDto;
  @Expose()
  name: string;
  @Expose()
  originPrice: number;
  @Expose()
  sale: number;
  @Expose()
  description: string;
  @Expose()
  brand: string;
  @Expose()
  origin: string;
  @Expose()
  quantity: string;
  @Expose()
  totalPrice: number;
}

export class CartClassificationValueResponseDto {
  @Expose()
  name: string;
  @Expose()
  extraPrice: number;
  @Expose()
  stock: number;
  @Expose()
  img?: string;
  @Expose()
  choosen: boolean;
}

export class CartClassificationResponseDto {
  @Expose()
  name!: string;
  @Expose()
  @Type(() => CartClassificationValueResponseDto)
  values!: Array<CartClassificationValueResponseDto>;
}

export class CartImageResponseDto extends ProductImageResponseDto {
  readonly;
}

export class CartResponseDto {
  @Expose({ name: '_id' })
  id!: string;
  @Expose()
  @Type(() => CartInfoResponseDto)
  info!: CartInfoResponseDto;
  @Expose()
  @Type(() => CartClassificationResponseDto)
  classification!: Array<CartClassificationValueResponseDto>;
  @Expose()
  @Type(() => CartShippingResponseDto)
  shipping!: CartShippingResponseDto;
  @Expose()
  @Type(() => CartImageResponseDto)
  images: CartImageResponseDto;
  @Expose()
  @Type(() => CartOwnerResponseDto)
  owner: CartOwnerResponseDto;
  @Expose()
  createdAt!: string;
  @Expose()
  updatedAt!: string;
}
