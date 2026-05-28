import { Expose, Type } from 'class-transformer';
export class CartCategoryResponseDto {
  @Expose()
  name: string;
  @Expose()
  id: string;
}

export class InfoResponseDto {
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
  @Expose()
  productId: string;
}
