import { Expose, Transform, Type } from 'class-transformer';
import { ResponseDto } from '../../common/dto/response.common.dto';
import mongoose from 'mongoose';

export class CartCategoryResponseDto {
  @Expose()
  name: string;
  @Expose()
  slug: string;
}

export class CartItemResponseDto {
  @Expose()
  brand: string;
  @Expose()
  name: string;
  @Expose()
  origin: string;
  @Expose({ name: 'origin_price' })
  originPrice: string;
  @Expose({ name: 'product_id' })
  productId: string;
  @Expose({ name: 'total_price' })
  totalPrice: number;
  @Expose()
  quantity: number;
  @Expose()
  sale: number;
  @Expose()
  thumbnail: string;
  @Expose()
  @Type(() => CartCategoryResponseDto)
  category: CartCategoryResponseDto;
}

export class CartShippingResponseDto {
  @Expose()
  flash: boolean;
  @Expose()
  normal: boolean;
}

export class CartRatingResponseDto {
  @Expose()
  avg: number;
  @Expose()
  total: number;
}

export class CartVariantResponseDto {
  @Expose()
  sku: string;
  @Expose()
  stock: number;
  @Expose({ name: 'price_extra' })
  priceExtra: number;
  @Expose()
  options: Record<string, string>;
}

export class CartOptionValueResponseDto {
  @Expose()
  value: string;
  @Expose()
  display: string;
  @Expose()
  image: string | null;
}

export class CartOptionResponseDto {
  @Expose()
  key: string;
  @Expose()
  label: string;
  @Expose()
  @Type(() => CartOptionValueResponseDto)
  values: Array<CartOptionValueResponseDto>;
}

export class CartApiResponseDto extends ResponseDto {
  status: number;
  data: CartApiDataResponseDto;
}

export class CartApiDataResponseDto {
  carts: Array<CartResponseDto>;
}

export class CartResponseDto {
  @Expose({ name: '_id' })
  @Transform(({ obj }: { obj: { _id: mongoose.Types.ObjectId } }) =>
    obj._id.toString(),
  )
  id: string;
  @Expose()
  @Type(() => CartItemResponseDto)
  items: CartItemResponseDto;
  @Expose()
  @Type(() => CartOptionResponseDto)
  options: Array<CartOptionResponseDto>;
  @Expose({ name: 'other_variants' })
  @Type(() => CartVariantResponseDto)
  otherVaritants: Array<CartVariantResponseDto>;
  @Expose({ name: 'variant_chosen' })
  @Type(() => CartVariantResponseDto)
  variantChosen: CartVariantResponseDto;
  @Expose({ name: 'rating_sumary' })
  @Type(() => CartRatingResponseDto)
  ratingSumary: CartRatingResponseDto;
  @Expose()
  @Type(() => CartShippingResponseDto)
  shipping: CartShippingResponseDto;
  @Expose()
  createdAt: string;
  @Expose()
  updatedAt: string;
}
