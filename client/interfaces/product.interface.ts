/**
 * Các kiểu dữ liệu liên quan đến sản phẩm (preview, detail, phân loại, hình ảnh, v.v.).
 * Được sử dụng bởi các API trả về danh sách/chi tiết sản phẩm.
 */
export interface GetProductPreviewRequest {
  page: number;
}
import { ApiResponse } from "./common.interface";

/**
 * Trạng thái của sản phẩm.
 * - `ACTIVE`: sản phẩm đang bán
 * - `INACTIVE`: tạm dừng bán
 * - `ZERO`: hết hàng
 */
export enum ProductStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  ZERO = "zero",
}

export interface ProductPreviewApiResponse extends ApiResponse {
  data: ProductPreviewDataResponse;
}

export interface ProductDetailApiResponse extends ApiResponse {
  data: ProductDetailDataApiResponse;
}

export interface ProductDetailDataApiResponse {
  product: ProductDetail | null;
  related: Array<ProductPreviews>;
}

/**
 * Dữ liệu trả về cho API preview sản phẩm: danh sách `products` và thông tin `request`.
 */
export interface ProductPreviewDataResponse {
  products: Array<ProductPreviews>;
  request: GetProductPreviewRequest;
}

/**
 * Thông tin category của sản phẩm.
 */
export interface ProductCategory {
  id: string;
  name: string;
}

/**
 * Thông tin hỗ trợ giao hàng cho sản phẩm.
 */
export interface ProductShipping {
  flash: boolean;
  normal: boolean;
}

/**
 * Thông tin rating trung bình và tổng số đánh giá.
 */
export interface ProductRating {
  avg: number;
  total: number;
}

/**
 * Dữ liệu preview của một sản phẩm (dùng trong danh sách/sản phẩm liên quan).
 */
export interface ProductPreview {
  id: string;
  info: ProductInfo;
  tags: Array<string>;
  ratingSumary: ProductRating;
  shipping: ProductShipping;
  images: ProductImages;
  status: ProductStatus;
}

export type ProductPreviews = Array<ProductPreview>;
/**
 * Thông tin cơ bản của sản phẩm.
 */
export interface ProductInfo {
  name: string;
  price: number;
  sale: number;
  category: ProductCategory;
  description: string;
  brand?: string;
  origin?: string;
}

/**
 * Giá trị trong một classification (ví dụ: màu sắc, kích thước).
 */
export interface ProductClassificationValue {
  name: string;
  img?: string;
  stock: number;
  extraPrice: number;
}

export type ProductClassificationValues = Array<ProductClassificationValue>;

/**
 * Classification của sản phẩm (ví dụ: Color, Size) gồm nhiều `values`.
 */
export interface ProductClassification {
  name: string;
  values: Array<ProductClassificationValue>;
}
export type ProductClassifications = Array<ProductClassification>;
/**
 * Hình ảnh của sản phẩm: `thumbnail` và danh sách `details`.
 */
export interface ProductImages {
  thumbnail: string;
  details: Array<string>;
}

/**
 * Chi tiết sản phẩm mở rộng từ preview, bổ sung `classification`.
 */
export interface ProductDetail extends ProductPreview {
  classification: Array<ProductClassification>;
  createdAt: string;
  updatedAt: string;
}

/**
 * hidden if user
 */
/**
 * Thông tin người bán (ẩn khi trả về cho user thông thường).
 */
export interface ProductOwner {
  sellerId: string;
  storeId: string;
}

/**
 * Kiểu request khi gửi lên server của ProductInfo
 */
export interface CreateProductInfo {
  name: string;
  category: string;
  price: number;
  description: string;
  sale: number; //min 0 max 100
  origin?: string;
  brand?: string;
}
/**
 * kiểu request value của classification value khi gửi lên server để tạo product mới
 */
export interface CreateProductClassificationValue {
  name: string;
  stock: number;
  extraPrice: number;
  img?: string;
}
export type CreateProductClassificationValues =
  Array<CreateProductClassificationValue>;
/**
 * kiểu request của classification khi gửi lên server để tạo mới sản phẩm
 */
export interface CreateProductClassification {
  name: string;
  values: CreateProductClassificationValues;
}
export type CreateProductClassifications = Array<CreateProductClassification>;
/**
 * Kiểu của product shipping khi gửi lên server để tạo sản phẩm
 */
export interface CreateProductShipping {
  normal: boolean;
  flash: boolean;
}
/**
 * Kiểu của product images khi gửi lên server để tạo sản phẩm
 */
export interface CreateProductImage {
  thumbnail: string;
  details: Array<string>;
}
/**
 * Kiểu request gửi lên server khi tạo sản phẩm mới
 */
export interface CreateProductRequest {
  info: CreateProductInfo;
  classification: CreateProductClassifications;
  shipping: CreateProductShipping;
  images: CreateProductImage;
}
