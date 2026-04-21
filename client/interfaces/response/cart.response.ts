import { ApiResponse } from "../common/response";
import { ProductImages } from "./product.response";

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
