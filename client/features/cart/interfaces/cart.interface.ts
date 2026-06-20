import { ApiResponse } from "@/features/common/interfaces/common.interface";
import { ProductInfo } from "@/features/product/interfaces/product.interface";

/**
 * Request thêm sản phẩm vào giỏ hàng.
 */
export interface CartRequest {
  productId: string;
  optionIds: string[];
  quantity: number;
}

/**
 * Request cập nhật cart.
 *
 * NOTE:
 * - classification và quantity đều optional
 * - chỉ update field được gửi lên
 */
export interface CartUpdateRequest {
  id: string;
  variant?: string;
  quantity?: number;
}

export interface CartResponse {
  _id: string;
  thumbnail: string;
  productId: string;
  products: ProductInfo;
  quantity: number;
  totalPrice: number;
  sku: string;
  createdAt: string;
  updatedAt: string;
}

/* -------------------------------------------------------------------------- */
/*                                 API RESPONSE                               */
/* -------------------------------------------------------------------------- */

/**
 * Response trả về danh sách cart.
 */
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
