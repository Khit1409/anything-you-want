import { ApiResponse } from "@/interfaces/common/response";
import {
  CartRequest,
  CartUpdateRequest,
} from "@/interfaces/request/cart.request";
import {
  CartApiResponse,
  CartResponse,
} from "@/interfaces/response/cart.response";
import { axiosClient } from "@/lib/configs/axios.config";
/**
 *
 * @param data
 * @returns
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
 * @param data
 * @returns
 */
export async function updateCart(
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
 * @param 0
 * @returns
 */
export async function getUserCartService(): Promise<Array<CartResponse>> {
  const res = await axiosClient.get("/carts");
  const api = res.data as CartApiResponse;
  const carts = api.data.carts;
  return carts;
}
/**
 *
 */
export async function deleteCart(id: string) {
  const res = await axiosClient.delete(`/carts/${id}`);
  const api = res.data as ApiResponse;
  return api;
}
