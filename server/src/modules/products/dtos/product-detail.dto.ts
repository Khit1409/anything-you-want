import { Expose, Type } from 'class-transformer';

/**
 * Enum trạng thái sản phẩm
 */
export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ZERO = 'zero',
}

// ============================================================================
// SIMPLE RESPONSE DTOs
// ============================================================================

/**
 * DTO cho danh mục sản phẩm trong response
 */
export class CategoryDto {
  @Expose()
  id!: string;

  @Expose()
  name!: string;
}

/**
 * DTO cho đánh giá sản phẩm
 */
export class RatingDto {
  @Expose()
  avg!: number;

  @Expose()
  total!: number;
}

/**
 * DTO cho vận chuyển sản phẩm
 */
export class ShippingDto {
  @Expose()
  flash!: boolean;

  @Expose()
  normal!: boolean;
}

/**
 * DTO cho hình ảnh sản phẩm
 */
export class ImageDto {
  @Expose()
  thumbnail!: string;

  @Expose()
  @Type(() => String)
  details!: Array<string>;
}

// ============================================================================
// PRODUCT INFO RESPONSE DTO
// ============================================================================

/**
 * DTO cho thông tin cơ bản sản phẩm
 */
export class InfoDto {
  @Expose()
  name!: string;

  @Expose()
  price!: number;

  @Expose()
  sale!: number;

  @Expose()
  @Type(() => CategoryDto)
  category!: CategoryDto;

  @Expose()
  description!: string;

  @Expose()
  brand!: string;

  @Expose()
  origin!: string;
}
/**
 *
 */
export class OwnerDto {
  @Expose()
  sellerId!: string;
  @Expose()
  storeId!: string;
}
/**
 * DTO cho giá trị phân loại sản phẩm
 */
export class ClassificationValueDto {
  @Expose()
  name!: string;

  @Expose()
  img?: string;
}

/**
 * DTO cho phân loại sản phẩm
 */
export class ClassificationDto {
  @Expose()
  name!: string;

  @Expose()
  @Type(() => ClassificationValueDto)
  values!: Array<ClassificationValueDto>;
}

// ============================================================================
// VARIANT RESPONSE DTO
// ============================================================================

/**
 * DTO cho biến thể sản phẩm
 */
export class VariantDto {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  sku: string;

  @Expose()
  stock: number;

  @Expose()
  extraPrice: number;

  @Expose()
  options: Record<string, string>;
}

/**
 * DTO cho chi tiết sản phẩm (đầy đủ thông tin)
 */
export class ProductDetailDto {
  @Expose({ name: '_id' })
  id!: string;
  @Expose()
  @Type(() => InfoDto)
  info!: InfoDto;
  @Expose()
  @Type(() => ClassificationDto)
  classifications!: Array<ClassificationDto>;
  @Expose()
  @Type(() => VariantDto)
  variants: Array<VariantDto>;
  @Expose()
  @Type(() => ShippingDto)
  shipping!: ShippingDto;
  @Expose()
  @Type(() => RatingDto)
  ratingSumary!: RatingDto;
  @Expose()
  @Type(() => ImageDto)
  images!: ImageDto;
  @Expose()
  createdAt!: Date | string;
  @Expose()
  updatedAt!: Date | string;
}

export class SellerProductDetailDto extends ProductDetailDto {
  @Expose()
  @Type(() => OwnerDto)
  owner: OwnerDto;
}
