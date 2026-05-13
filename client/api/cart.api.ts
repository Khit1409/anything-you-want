import {
  CartApiResponse,
  CartRequest,
  CartResponse,
  CartUpdateRequest,
} from "@/interfaces/cart.interface";
import { ApiResponse } from "@/interfaces/common.interface";
import { axiosClient } from "@/lib/configs/axios.config";

/**
 * Thêm sản phẩm vào giỏ hàng (POST /carts).
 * @param data: CartRequest
 * @returns ApiResponse từ server
 */
export async function addToCartService(
  data: CartRequest
): Promise<ApiResponse> {
  try {
    const res = await axiosClient.post("/carts", data);
    const api = res.data as ApiResponse;
    return api;
  } catch (error) {
    console.log(error);
    return {
      message: error as string,
      success: false,
      timestamp: new Date().toDateString(),
    };
  }
}

/**
 * Cập nhật item trong giỏ hàng (PUT /carts/:id) — thay đổi số lượng hoặc classification.
 * @param data: CartUpdateRequest (gồm id, classification, quantity)
 * @returns ApiResponse
 */
export async function updateCartService(
  data: CartUpdateRequest
): Promise<ApiResponse> {
  try {
    const { id, classification, quantity } = data;
    const res = await axiosClient.put(`carts/${id}`, {
      classification,
      quantity,
    });
    const result = res.data as ApiResponse;
    return result;
  } catch (error) {
    return {
      message: error as string,
      success: false,
      timestamp: new Date().toDateString(),
    };
  }
}
/**
 * Lấy danh sách giỏ hàng của người dùng hiện tại (GET /carts).
 * Trả về mảng `CartResponse`.
 */
export async function getUserCartService(): Promise<Array<CartResponse>> {
  const res = await axiosClient.get("/carts");
  const api = res.data as CartApiResponse;
  const carts = api.data.carts;
  return carts;
}

/**
 * Xóa một mục trong giỏ hàng theo `id` (DELETE /carts/:id).
 * Trả về `ApiResponse` từ server.
 */
export async function deleteCartService(id: string) {
  const res = await axiosClient.delete(`/carts/${id}`);
  const api = res.data as ApiResponse;
  return api;
}
