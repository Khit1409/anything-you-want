import { ApiResponse } from "../common/response";

export interface CartCategoryResponse {
  name: string;
  slug: string;
}

export interface CartItemResponse {
  brand: string;
  name: string;
  origin: string;
  originPrice: number;
  productId: string;
  totalPrice: number;
  quantity: number;
  sale: number;
  thumbnail: string;
  category: CartCategoryResponse;
}

export interface CartShippingResponse {
  flash: boolean;
  normal: boolean;
}

export interface CartRatingResponse {
  avg: number;
  total: number;
}

export interface CartVariantResponse {
  sku: string;
  stock: number;
  priceExtra: number;
  options: {
    [key: string]: string;
  };
}

export interface CartOptionValueResponse {
  value: string;
  display: string;
  image?: string;
}

export interface CartOptionResponse {
  key: string;
  label: string;
  values: Array<CartOptionValueResponse>;
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
  items: CartItemResponse;
  options: Array<CartOptionResponse>;
  otherVaritants: Array<CartVariantResponse>;
  variantChosen: CartVariantResponse;
  ratingSumary: CartRatingResponse;
  shipping: CartShippingResponse;
  createdAt: string;
  updatedAt: string;
}

export interface CartUpdateResponse extends ApiResponse {
  data: { updateCount: number };
}
