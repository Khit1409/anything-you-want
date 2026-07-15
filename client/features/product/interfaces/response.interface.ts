import { ApiResponse } from "@/features/common/interfaces/common.interface";
import {
  ProductDetail,
  ProductDetailForOrder,
  ProductPreviews,
  ProductVariants,
} from "./read.interface";

export interface ProductDetailResponse extends ApiResponse {
  data: ProductDetail | null;
}

export interface ProductRelatedResponse extends ApiResponse {
  data: ProductPreviews;
}

export interface CreateProductResponse extends ApiResponse {
  data: { id: string };
}

export interface DeleteProductResponse extends ApiResponse {
  data: { isDeleted: boolean };
}

export interface GetDetailForOrderResponse extends ApiResponse {
  data: ProductDetailForOrder | null;
}

export interface GetProductPreviewResponse extends ApiResponse {
  data: ProductPreviews;
}

export interface GetVariantResponse extends ApiResponse {
  data: ProductVariants;
}
