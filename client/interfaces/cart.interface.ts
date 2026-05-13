import { ApiResponse } from "./common.interface";
import { ProductImages } from "./product.interface";
import { ProductClassificationValue } from "./product.interface";

/**
 * Kiểu request cho 1 classification khi thêm vào cart.
 * `values` tham chiếu `ProductClassificationValue`.
 */
export interface CartClassificationRequest {
  name: string;
  values: ProductClassificationValue;
}

/**
 * Yêu cầu thêm vào giỏ hàng.
 */
export interface CartRequest {
  productId: string;
  classification: Array<CartClassificationRequest>;
  quantity: number;
}

/**
 * Yêu cầu cập nhật giỏ hàng.
 */
export interface CartUpdateRequest {
  id: string;
  classification?: Array<CartClassificationRequest>;
  quantity?: number;
}

/**
 * Thông tin category hiển thị trong cart.
 */
export interface CartCategoryResponse {
  name: string;
  id: string;
}

/**
 * Thông tin chi tiết sản phẩm lưu trong cart (giá, số lượng, tổng giá,...)
 */
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

/**
 * Thông tin hỗ trợ giao hàng trong cart.
 */
export interface CartShippingResponse {
  flash: boolean;
  normal: boolean;
}

/**
 * Giá trị classification trả về cho cart (kèm flag `choosen`).
 */
export interface CartClassificationValueResponse {
  name: string;
  extraPrice: number;
  stock: number;
  img?: string;
  choosen: boolean;
}

/**
 * Classification response chứa tên và các `values`.
 */
export interface CartClassificationResponse {
  name: string;
  values: Array<CartClassificationValueResponse>;
}

/**
 * API response cho cart, kèm `status` và `data` chứa danh sách carts.
 */
export interface CartApiResponse extends ApiResponse {
  status: number;
  data: CartApiDataResponse;
}

export interface CartApiDataResponse {
  carts: Array<CartResponse>;
}

/**
 * Mô tả một mục trong giỏ hàng (CartResponse).
 */
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
