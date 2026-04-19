import { ApiResponse } from "@/interfaces/common/response";
import { CartRequest } from "@/interfaces/request/cart.request";
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
 *
 * @returns
 */
export async function getUserCartService(): Promise<Array<CartResponse>> {
  const res = await axiosClient.get("/carts");
  const api = res.data as CartApiResponse;
  const carts = api.data.carts;
  return carts;
}
