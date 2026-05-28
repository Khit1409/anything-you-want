import { ApiResponse } from "./common.interface";

import {
  ProductClassificationValue,
  ProductImages,
  ProductVariant,
  ProductVariants,
} from "./product.interface";

/* -------------------------------------------------------------------------- */
/*                                   REQUEST                                  */
/* -------------------------------------------------------------------------- */

/**
 * Classification được chọn khi thêm vào cart.
 *
 * Ví dụ:
 * {
 *   name: "Color",
 *   values: {
 *     name: "Red"
 *   }
 * }
 */
export interface CartClassificationRequest {
  name: string;
  values: ProductClassificationValue;
}

/**
 * Request thêm sản phẩm vào giỏ hàng.
 */
export interface CartRequest {
  productId: string;
  variantId: string;
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

/* -------------------------------------------------------------------------- */
/*                                CART RESPONSE                               */
/* -------------------------------------------------------------------------- */

/**
 * Category hiển thị trong cart.
 */
export interface CartCategoryResponse {
  id: string;

  name: string;
}

/**
 * Thông tin sản phẩm hiển thị trong cart.
 */
export interface CartInfoResponse {
  productId: string;

  name: string;

  brand: string;

  origin: string;

  quantity: number;

  sale: number;

  /**
   * Giá gốc sản phẩm.
   */
  originPrice: number;

  /**
   * Tổng giá sau khi cộng quantity + extraPrice.
   */
  totalPrice: number;

  category: CartCategoryResponse;
}

/**
 * Thông tin shipping trong cart.
 */
export interface CartShippingResponse {
  flash: boolean;

  normal: boolean;
}

/* -------------------------------------------------------------------------- */
/*                             CART CLASSIFICATION                            */
/* -------------------------------------------------------------------------- */

/**
 * Value của classification trong cart.
 *
 * NOTE:
 * `choosen = true`
 * nghĩa là value đang được chọn.
 */
export interface CartClassificationValueResponse {
  name: string;

  stock: number;

  extraPrice: number;

  choosen: boolean;

  img?: string;
}

/**
 * Classification response của cart.
 */
export interface CartClassificationResponse {
  name: string;

  values: CartClassificationValueResponse[];
}

/* -------------------------------------------------------------------------- */
/*                                 CART ITEM                                  */
/* -------------------------------------------------------------------------- */

/**
 * Một item trong giỏ hàng.
 */
export interface CartResponse {
  id: string;

  info: CartInfoResponse;

  variant: ProductVariant;

  otherVariants: ProductVariants;

  shipping: CartShippingResponse;

  images: ProductImages;

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
