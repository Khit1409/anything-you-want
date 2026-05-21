import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

// ============================================================================
// PRODUCT INFO DTO
// ============================================================================

/**
 * DTO cho cập nhật thông tin cơ bản sản phẩm
 */
export class UpdateProductInfoDto {
  /**
   * Tên sản phẩm
   */
  @IsString()
  name: string;

  /**
   * ID danh mục sản phẩm (tùy chọn)
   */
  @IsOptional()
  @IsString()
  category?: string;

  /**
   * Giá gốc sản phẩm
   */
  @IsNumber()
  price: number;

  /**
   * Mô tả sản phẩm
   */
  @IsString()
  description: string;

  /**
   * Phần trăm giảm giá (0-100)
   */
  @IsNumber()
  @Min(0)
  @Max(100)
  sale: number;

  /**
   * Xuất xứ sản phẩm (tùy chọn)
   */
  @IsOptional()
  @IsString()
  origin?: string;

  /**
   * Thương hiệu sản phẩm (tùy chọn)
   */
  @IsOptional()
  @IsString()
  brand?: string;
}

// ============================================================================
// PRODUCT CLASSIFICATION DTO
// ============================================================================

/**
 * DTO cho cập nhật giá trị phân loại sản phẩm
 */
export class UpdateProductClassificationValueDto {
  /**
   * Tên giá trị
   */
  @IsString()
  name: string;

  /**
   * Số lượng tồn kho
   */
  @IsNumber()
  @Min(1)
  stock: number;

  /**
   * Giá thêm của biến thể
   */
  @IsNumber()
  extraPrice: number;

  /**
   * Hình ảnh của giá trị (tùy chọn)
   */
  @IsOptional()
  @IsString()
  img?: string;
}

/**
 * DTO cho cập nhật phân loại sản phẩm
 */
export class UpdateProductClassificationDto {
  /**
   * Tên phân loại
   */
  @IsString()
  name: string;

  /**
   * Danh sách giá trị phân loại
   */
  @ValidateNested()
  @Type(() => UpdateProductClassificationValueDto)
  values: Array<UpdateProductClassificationValueDto>;
}

// ============================================================================
// PRODUCT SHIPPING DTO
// ============================================================================

/**
 * DTO cho cập nhật thông tin vận chuyển
 */
export class UpdateProductShippingDto {
  /**
   * Hỗ trợ vận chuyển nhanh
   */
  @IsBoolean()
  flash: boolean;

  /**
   * Hỗ trợ vận chuyển thường
   */
  @IsBoolean()
  normal: boolean;
}

// ============================================================================
// PRODUCT IMAGE DTO
// ============================================================================

/**
 * DTO cho cập nhật hình ảnh sản phẩm
 */
export class UpdateProductImageDto {
  /**
   * URL ảnh đại diện
   */
  @IsString()
  thumbnail: string;

  /**
   * Danh sách URL ảnh chi tiết
   */
  @IsArray()
  @IsString({ each: true })
  details: string[];
}

// ============================================================================
// UPDATE PRODUCT DTO
// ============================================================================

/**
 * DTO cho cập nhật sản phẩm
 * Tất cả các trường đều tùy chọn (chỉ cập nhật những gì cần thiết)
 */
export class UpdateProductDto {
  /**
   * Cập nhật thông tin cơ bản (tùy chọn)
   */
  @IsOptional()
  @Type(() => UpdateProductInfoDto)
  info?: UpdateProductInfoDto;

  /**
   * Cập nhật phân loại (tùy chọn)
   */
  @IsOptional()
  @Type(() => UpdateProductClassificationDto)
  classifications?: Array<UpdateProductClassificationDto>;

  /**
   * Cập nhật vận chuyển (tùy chọn)
   */
  @IsOptional()
  @Type(() => UpdateProductShippingDto)
  shipping?: UpdateProductShippingDto;

  /**
   * Cập nhật hình ảnh (tùy chọn)
   */
  @IsOptional()
  @Type(() => UpdateProductImageDto)
  images?: UpdateProductImageDto;
}
