import { Expose, Type } from 'class-transformer';
import { ResponseDto } from '../../common/dto/response.common.dto';

// ============================================================================
// ENUMS
// ============================================================================

/**
 * Enum trạng thái sản phẩm
 */
export enum ProductStatus {
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
export class ProductCategoryResponseDto {
  @Expose()
  id!: string;

  @Expose()
  name!: string;
}

/**
 * DTO cho chủ sở hữu sản phẩm (seller/store)
 */
export class ProductOwnerReponseDto {
  @Expose()
  sellerId!: string;

  @Expose()
  storeId!: string;
}

/**
 * DTO cho đánh giá sản phẩm
 */
export class ProductRatingResponseDto {
  @Expose()
  avg!: number;

  @Expose()
  total!: number;
}

/**
 * DTO cho vận chuyển sản phẩm
 */
export class ProductShippingResponseDto {
  @Expose()
  flash!: boolean;

  @Expose()
  normal!: boolean;
}

/**
 * DTO cho hình ảnh sản phẩm
 */
export class ProductImageResponseDto {
  @Expose()
  thumbnail!: string;

  @Expose()
  @Type(() => String)
  details!: Array<string>;
}

// ============================================================================
// CLASSIFICATION RESPONSE DTOs
// ============================================================================

/**
 * DTO cho giá trị phân loại sản phẩm
 */
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

/**
 * DTO cho phân loại sản phẩm
 */
export class ProductClassificationResponseDto {
  @Expose()
  name!: string;

  @Expose()
  @Type(() => ProductClassificationValueResponseDto)
  values!: Array<ProductClassificationValueResponseDto>;
}

// ============================================================================
// VARIANT RESPONSE DTO
// ============================================================================

/**
 * DTO cho biến thể sản phẩm
 */
export class ProductVariantResponseDto {
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

// ============================================================================
// PRODUCT INFO RESPONSE DTO
// ============================================================================

/**
 * DTO cho thông tin cơ bản sản phẩm
 */
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

// ============================================================================
// MAIN PRODUCT RESPONSE DTOs
// ============================================================================

/**
 * DTO cho phản hồi danh sách sản phẩm (thông tin đơn giản)
 */
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

/**
 * DTO cho phản hồi sản phẩm liên quan
 */
export class ProductRelatedReponseDto extends ProductResponseDto {
  readonly;
}

/**
 * DTO cho chi tiết sản phẩm (đầy đủ thông tin)
 */
export class ProductDetailResponseDto extends ProductResponseDto {
  @Expose()
  @Type(() => ProductClassificationResponseDto)
  classifications!: Array<ProductClassificationResponseDto>;

  @Expose()
  @Type(() => ProductVariantResponseDto)
  variants: Array<ProductVariantResponseDto>;

  @Expose()
  brand!: string;

  @Expose()
  createdAt!: Date | string;

  @Expose()
  updatedAt!: Date | string;
}

// ============================================================================
// API RESPONSE DTO
// ============================================================================

/**
 * DTO cho phản hồi API sản phẩm
 */
export class ProductApi extends ResponseDto {
  data: { products: Array<ProductResponseDto> };
}
