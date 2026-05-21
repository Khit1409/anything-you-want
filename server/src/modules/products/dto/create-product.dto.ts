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
 * DTO cho thông tin cơ bản của sản phẩm
 */
export class CreateProductInfoDto {
  /**
   * Tên sản phẩm
   */
  @IsString()
  name: string;

  /**
   * ID danh mục sản phẩm
   */
  @IsString()
  category: string;

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
 * DTO cho giá trị phân loại sản phẩm
 * Ví dụ: Màu Đỏ, Size L, v.v.
 */
export class CreateProductClassificationValueDto {
  /**
   * Tên giá trị (ví dụ: "Đỏ", "XL")
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
   * Giá thêm của biến thể này
   */
  @IsNumber()
  extraPrice: number;

  /**
   * Hình ảnh của giá trị này (tùy chọn)
   */
  @IsOptional()
  @IsString()
  img?: string;
}

/**
 * DTO cho phân loại sản phẩm
 * Ví dụ: Màu sắc, Kích cỡ, v.v.
 */
export class CreateProductClassificationDto {
  /**
   * Tên phân loại (ví dụ: "Màu sắc", "Kích cỡ")
   */
  @IsString()
  name: string;

  /**
   * Danh sách giá trị cho phân loại này
   */
  @ValidateNested()
  @Type(() => CreateProductClassificationValueDto)
  values: Array<CreateProductClassificationValueDto>;
}

// ============================================================================
// PRODUCT SHIPPING DTO
// ============================================================================

/**
 * DTO cho thông tin vận chuyển sản phẩm
 */
export class CreateProductShippingDto {
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
 * DTO cho hình ảnh sản phẩm
 */
export class CreateProductImageDto {
  /**
   * URL ảnh đại diện (thumbnail)
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
// CREATE PRODUCT DTO
// ============================================================================

/**
 * DTO cho tạo sản phẩm mới
 * Bao gồm thông tin cơ bản, phân loại, ảnh, vận chuyển
 */
export class CreateProductDto {
  /**
   * Thông tin cơ bản sản phẩm
   */
  @ValidateNested()
  @Type(() => CreateProductInfoDto)
  info: CreateProductInfoDto;

  /**
   * Danh sách phân loại sản phẩm
   */
  @ValidateNested()
  @Type(() => CreateProductClassificationDto)
  classifications: Array<CreateProductClassificationDto>;

  /**
   * Thông tin vận chuyển
   */
  @ValidateNested()
  @Type(() => CreateProductShippingDto)
  shipping: CreateProductShippingDto;

  /**
   * Hình ảnh sản phẩm
   */
  @ValidateNested()
  @Type(() => CreateProductImageDto)
  images: CreateProductImageDto;
}
