import { ApiResponse } from "@/features/common/interfaces/common.interface";
import { GetProductPreviewRequest } from "./request.interface";
import { ProductDetail, ProductPreviews } from "./read.interface";

export interface ProductPreviewDataResponse {
  products: ProductPreviews;
  request: GetProductPreviewRequest;
}

export interface ProductDetailDataApiResponse {
  product: ProductDetail | null;
  relateds: ProductPreviews;
}

export interface ProductPreviewApiResponse extends ApiResponse {
  data: ProductPreviewDataResponse;
}

export interface ProductDetailApiResponse extends ApiResponse {
  data: ProductDetailDataApiResponse;
}

export interface CreateProductApiResponse extends ApiResponse {
  data: { id: string };
}
export interface DeleteProductResponse extends ApiResponse {
  data: { isDeleted: boolean };
}
