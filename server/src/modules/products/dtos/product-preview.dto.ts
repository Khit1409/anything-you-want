import { Expose, Type } from 'class-transformer';
import {
  ImageDto,
  InfoDto,
  OwnerDto,
  RatingDto,
  ShippingDto,
  Status,
} from './product-detail.dto';

// ============================================================================
// ENUMS
// ============================================================================

// ============================================================================
// MAIN PRODUCT RESPONSE DTOs
// ============================================================================

/**
 * DTO cho phản hồi danh sách sản phẩm (thông tin đơn giản)
 */
export class ProductPreviewDto {
  @Expose({ name: '_id' })
  id!: string;

  @Expose()
  @Type(() => InfoDto)
  info!: InfoDto;

  @Expose()
  @Type(() => String)
  tags!: Array<string>;

  @Expose()
  @Type(() => RatingDto)
  ratingSumary!: RatingDto;

  @Expose()
  shipping!: ShippingDto;

  @Expose()
  @Type(() => ImageDto)
  images!: ImageDto;

  @Expose()
  status!: Status;
}
export class SellerProductPreviewDto extends ProductPreviewDto {
  @Expose()
  owner: OwnerDto;
}
/**
 * DTO cho phản hồi sản phẩm liên quan
 */
export class ProductRelatedDto {
  @Expose({ name: '_id' })
  id: string;
  @Expose()
  images: ImageDto;
  @Expose()
  info: InfoDto;
  @Expose()
  ratingSumary: RatingDto;
  @Expose()
  shipping: ShippingDto;
  @Expose()
  status: Status;
  @Expose()
  tags: string[];
}

// ============================================================================
// API RESPONSE DTO
// ============================================================================
