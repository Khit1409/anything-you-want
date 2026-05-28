/* -------------------------------------------------------------------------- */
/*                                   REQUEST                                  */
/* -------------------------------------------------------------------------- */

import { ApiResponse } from "./common.interface";

/**
 * Query request dùng để lấy danh sách preview sản phẩm.
 */
export interface GetProductPreviewRequest {
  page: number;
}

/**
 * Request gửi lên server khi tạo sản phẩm mới.
 */
export interface CreateProductRequest {
  info: CreateProductInfo;
  classifications: CreateProductClassifications;
  shipping: CreateProductShipping;
  images: CreateProductImage;
}

/* -------------------------------------------------------------------------- */
/*                               RESPONSE TYPES                               */
/* -------------------------------------------------------------------------- */

/**
 * Response API trả về danh sách preview sản phẩm.
 */
export interface ProductPreviewApiResponse extends ApiResponse {
  data: ProductPreviewDataResponse;
}

/**
 * Response API trả về chi tiết sản phẩm.
 */
export interface ProductDetailApiResponse extends ApiResponse {
  data: ProductDetailDataApiResponse;
}

/**
 * Data response của API preview sản phẩm.
 */
export interface ProductPreviewDataResponse {
  products: ProductPreviews;
  request: GetProductPreviewRequest;
}

/**
 * Data response của API chi tiết sản phẩm.
 */
export interface ProductDetailDataApiResponse {
  product: ProductDetail | null;
  relateds: ProductPreviews;
}

/* -------------------------------------------------------------------------- */
/*                                   ENUMS                                    */
/* -------------------------------------------------------------------------- */

/**
 * Trạng thái sản phẩm.
 *
 * - ACTIVE: đang bán
 * - INACTIVE: tạm ngưng bán
 * - ZERO: hết hàng
 */
export enum ProductStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  ZERO = "zero",
}

/* -------------------------------------------------------------------------- */
/*                              PRODUCT PREVIEW                               */
/* -------------------------------------------------------------------------- */

/**
 * Thông tin category của sản phẩm.
 */
export interface ProductCategory {
  id: string;
  name: string;
}

/**
 * Thông tin hỗ trợ giao hàng.
 */
export interface ProductShipping {
  flash: boolean;
  normal: boolean;
}

/**
 * Thông tin đánh giá sản phẩm.
 */
export interface ProductRating {
  avg: number;
  total: number;
}

/**
 * Hình ảnh sản phẩm.
 */
export interface ProductImages {
  thumbnail: string;
  details: string[];
}

/**
 * Thông tin cơ bản của sản phẩm.
 */
export interface ProductInfo {
  name: string;
  price: number;
  sale: number;
  description: string;

  category: ProductCategory;

  brand?: string;
  origin?: string;
}

/**
 * Preview của sản phẩm dùng cho:
 * - danh sách sản phẩm
 * - sản phẩm liên quan
 * - search result
 */
export interface ProductPreview {
  id: string;

  info: ProductInfo;

  tags: string[];

  ratingSumary: ProductRating;

  shipping: ProductShipping;

  images: ProductImages;

  status: ProductStatus;
}

/**
 * Danh sách preview sản phẩm.
 */
export type ProductPreviews = ProductPreview[];

/* -------------------------------------------------------------------------- */
/*                              PRODUCT DETAIL                                */
/* -------------------------------------------------------------------------- */

/**
 * Giá trị của classification.
 *
 * Ví dụ:
 * - trắng, đỏ
 * - M, XL
 */
export interface ProductClassificationValue {
  name: string;
  img?: string;
}

/**
 * Danh sách value của classification.
 */
export type ProductClassificationValues = ProductClassificationValue[];

/**
 * Classification của sản phẩm.
 *
 * Ví dụ:
 * - Color
 * - Size
 */
export interface ProductClassification {
  name: string;
  values: ProductClassificationValues;
}

/**
 * Danh sách classification.
 */
export type ProductClassifications = ProductClassification[];

/**
 * Variant thực tế của sản phẩm.
 *
 * Ví dụ:
 * - Red / XL
 * - Black / M
 */
export interface ProductVariant {
  id: string;

  sku: string;

  stock: number;

  extraPrice: number;

  /**
   * Mapping classification name -> value.
   *
   * Ví dụ:
   * {
   *   color: "red",
   *   size: "xl"
   * }
   */
  options: Record<string, string>;
}

/**
 * Danh sách variants.
 */
export type ProductVariants = ProductVariant[];

/**
 * Chi tiết đầy đủ của sản phẩm.
 */
export interface ProductDetail extends ProductPreview {
  classifications: ProductClassifications;

  variants: ProductVariants;

  createdAt: string;

  updatedAt: string;
}

/* -------------------------------------------------------------------------- */
/*                              PRODUCT OWNER                                 */
/* -------------------------------------------------------------------------- */

/**
 * Thông tin người bán.
 *
 * NOTE:
 * Chỉ trả về cho seller/admin.
 * Không expose cho user thông thường.
 */
export interface ProductOwner {
  sellerId: string;
  storeId: string;
}

/* -------------------------------------------------------------------------- */
/*                              CREATE PRODUCT                                */
/* -------------------------------------------------------------------------- */

/**
 * Thông tin cơ bản khi tạo sản phẩm.
 */
export interface CreateProductInfo {
  name: string;

  category: string;

  price: number;

  sale: number;

  description: string;

  /**
   * Giảm giá (%).
   *
   * min: 0
   * max: 100
   */
  brand?: string;

  origin?: string;
}

/**
 * Value của classification khi tạo sản phẩm.
 */
export interface CreateProductClassificationValue {
  name: string;
  img?: string;
}

/**
 * Danh sách classification value khi tạo sản phẩm.
 */
export type CreateProductClassificationValues =
  CreateProductClassificationValue[];

/**
 * Classification khi tạo sản phẩm.
 */
export interface CreateProductClassification {
  name: string;
  values: CreateProductClassificationValues;
}

/**
 * Danh sách classification khi tạo sản phẩm.
 */
export type CreateProductClassifications = CreateProductClassification[];

/**
 * Shipping khi tạo sản phẩm.
 */
export interface CreateProductShipping {
  normal: boolean;
  flash: boolean;
}

/**
 * Images khi tạo sản phẩm.
 */
export interface CreateProductImage {
  thumbnail: string;
  details: string[];
}
/**
 *
 */

export interface UpdateProductVariant {
  id: string;
  stock?: number;
  extraPrice?: number;
}

export type UpdateProductVariants = Array<UpdateProductVariant>;
