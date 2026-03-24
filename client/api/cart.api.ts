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
export async function addToCartService(data: CartRequest) {
  try {
    const res = await axiosClient.post("/carts", data);
    const api = res.data;
    return api;
  } catch (error) {
    console.log(error);
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
// /**
//  *
//  * @param data
//  * @returns
//  */
// export async function updateCartService(
//   data: CartUpdateDataRequest
// ): Promise<CartUpdateResponse> {
//   const res = await axiosClient.put("/carts", { ...data });
//   const api = res.data as CartUpdateResponse;
//   return api;
// }

// /**
//  *
//  */
// export async function deleteCartService(id: string) {
//   const res = await axiosClient.delete(`/carts/${id}`);
//   const api = res.data as ApiResponse;
//   return api;
// }
