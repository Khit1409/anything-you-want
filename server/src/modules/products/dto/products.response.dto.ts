import { Expose, Type } from 'class-transformer';
import { ResponseDto } from '../../common/dto/response.common.dto';

export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ZERO = 'zero',
}

export class ProductCategoryResponseDto {
  @Expose()
  id!: string;
  @Expose()
  name!: string;
}

export class ProductInfoResponseDto {
  @Expose()
  name!: string;
  @Expose()
  price!: number;
  @Expose()
  sale!: number;
  @Expose()
  @Type(() => ProductCategoryResponseDto)
  category!: ProductCategoryResponseDto;
  @Expose()
  description!: string;
  @Expose()
  brand!: string;
  @Expose()
  origin!: string;
}

export class ProductImageResponseDto {
  @Expose()
  thumbnail!: string;
  @Expose()
  @Type(() => String)
  details!: Array<string>;
}

export class ProductApi extends ResponseDto {
  data: { products: Array<ProductResponseDto> };
}

export class ProductOwnerReponseDto {
  @Expose()
  sellerId!: string;
  @Expose()
  storeId!: string;
}

export class ProductClassificationValueResponseDto {
  @Expose()
  name!: string;
  @Expose()
  extraPrice!: number;
  @Expose()
  img?: string;
  @Expose()
  stock!: number;
}

export class ProductClassificationResponseDto {
  @Expose()
  name!: string;
  @Expose()
  @Type(() => ProductClassificationValueResponseDto)
  values!: Array<ProductClassificationValueResponseDto>;
}

export class ProductRatingResponseDto {
  @Expose()
  avg!: number;
  @Expose()
  total!: number;
}

export class ProductShippingResponseDto {
  @Expose()
  flash!: boolean;
  @Expose()
  normal!: boolean;
}
export class ProductResponseDto {
  @Expose({ name: '_id' })
  id!: string;
  @Expose()
  @Type(() => ProductInfoResponseDto)
  info!: ProductInfoResponseDto;
  @Expose()
  @Type(() => String)
  tags!: Array<string>;
  @Expose()
  @Type(() => ProductRatingResponseDto)
  ratingSumary!: ProductRatingResponseDto;
  @Expose()
  shipping!: ProductShippingResponseDto;
  @Expose()
  @Type(() => ProductImageResponseDto)
  images!: ProductImageResponseDto;
  @Expose()
  status!: ProductStatus;
}

export class ProductRelatedReponseDto extends ProductResponseDto {
  readonly;
}

export class ProductDetailResponseDto extends ProductResponseDto {
  @Expose()
  @Type(() => ProductClassificationResponseDto)
  classification!: Array<ProductClassificationResponseDto>;
  @Expose()
  brand!: string;
  @Expose()
  createdAt!: Date | string;
  @Expose()
  updatedAt!: Date | string;
}
