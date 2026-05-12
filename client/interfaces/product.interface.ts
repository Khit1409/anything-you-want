export interface GetProductPreviewRequest {
  page: number;
}
import { ApiResponse } from "./common.interface";

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

export interface ProductPreviewDataResponse {
  products: Array<ProductPreviews>;
  request: GetProductPreviewRequest;
}

export interface ProductCategory {
  id: string;
  name: string;
}

export interface ProductShipping {
  flash: boolean;
  normal: boolean;
}

export interface ProductRating {
  avg: number;
  total: number;
}

export interface ProductPreviews {
  id: string;
  info: ProductInfo;
  tags: Array<string>;
  ratingSumary: ProductRating;
  shipping: ProductShipping;
  images: ProductImages;
  status: ProductStatus;
}

export interface ProductInfo {
  name: string;
  price: number;
  sale: number;
  category: ProductCategory;
  description: string;
  brand: string;
  origin: string;
}

export interface ProductClassificationValue {
  name: string;
  img?: string;
  stock: number;
  extraPrice: number;
}

export interface ProductClassification {
  name: string;
  values: Array<ProductClassificationValue>;
}

export interface ProductImages {
  thumbnail: string;
  details: Array<string>;
}

export interface ProductDetail extends ProductPreviews {
  classification: Array<ProductClassification>;
}

/**
 * hidden if user
 */
export interface ProductOwner {
  sellerId: string;
  storeId: string;
}
