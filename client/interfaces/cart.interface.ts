import { ApiResponse } from "./common.interface";
import { ProductImages } from "./product.interface";
import { ProductClassificationValue } from "./product.interface";

export interface CartClassificationRequest {
  name: string;
  values: ProductClassificationValue;
}

export interface CartRequest {
  productId: string;
  classification: Array<CartClassificationRequest>;
  quantity: number;
}

export interface CartUpdateRequest {
  id: string;
  classification?: Array<CartClassificationRequest>;
  quantity?: number;
}

export interface CartCategoryResponse {
  name: string;
  id: string;
}

export interface CartInfoResponse {
  brand: string;
  name: string;
  origin: string;
  originPrice: number;
  productId: string;
  totalPrice: number;
  quantity: number;
  sale: number;
  category: CartCategoryResponse;
}

export interface CartShippingResponse {
  flash: boolean;
  normal: boolean;
}

export interface CartClassificationValueResponse {
  name: string;
  extraPrice: number;
  stock: number;
  img?: string;
  choosen: boolean;
}

export interface CartClassificationResponse {
  name: string;
  values: Array<CartClassificationValueResponse>;
}

export interface CartApiResponse extends ApiResponse {
  status: number;
  data: CartApiDataResponse;
}

export interface CartApiDataResponse {
  carts: Array<CartResponse>;
}

export interface CartResponse {
  id: string;
  info: CartInfoResponse;
  classification: Array<CartClassificationResponse>;
  shipping: CartShippingResponse;
  images: ProductImages;
  createdAt: string;
  updatedAt: string;
}

export interface CartUpdateResponse extends ApiResponse {
  data: { updateCount: number };
}
