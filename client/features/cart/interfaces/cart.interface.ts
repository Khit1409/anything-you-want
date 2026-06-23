import { ApiResponse } from "@/features/common/interfaces/common.interface";

/**
 * Request thêm sản phẩm vào giỏ hàng.
 */
export interface CartRequest {
  productId: string;
  sku: string;
  quantity: number;
}

export interface CartUpdateRequest {
  id: string;
  productId: string;
  sku: string;
  quantity: number;
}

/* -------------------------------------------------------------------------- */
/*                                 API RESPONSE                               */
/* -------------------------------------------------------------------------- */
export interface CartItem {
  productId: string;
  quantity: number;
  totalPrice: number;
  discounted: number;
  name: string;
  sale: number;
  price: number;
  thumbnail: string;
  sku: string;
}

export interface CartResponse {
  _id: string;
  product: CartItem;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartApiResponse extends ApiResponse {
  status: number;
  data: Array<CartResponse>;
}

/**
 * Response cập nhật cart.
 */
export interface CartUpdateResponse extends ApiResponse {
  data: {
    updateCount: number;
  };
}

export type Carts = CartResponse[];
