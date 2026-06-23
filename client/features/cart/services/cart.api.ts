import {
  CartApiResponse,
  CartRequest,
  CartUpdateRequest,
} from "@/features/cart/interfaces/cart.interface";
import { ApiResponse } from "@/features/common/interfaces/common.interface";

import { axiosClient } from "@/lib/configs/axios.config";

export async function addToCartService(data: CartRequest) {
  const res = await axiosClient.post("/carts", {
    ...data,
  });
  const api = res.data as ApiResponse;
  return api;
}

export async function updateCartService(data: CartUpdateRequest) {
  const { id, sku, quantity, productId } = data;
  const res = await axiosClient.put(`carts/${id}`, {
    sku,
    quantity,
    productId,
  });
  const result = res.data as ApiResponse;
  return result;
}

export async function getUserCartService() {
  const res = await axiosClient.get("/carts");
  const api = res.data as CartApiResponse;
  const carts = api.data;
  return carts;
}

export async function deleteCartService(id: string) {
  const res = await axiosClient.delete(`/carts/${id}`);
  const api = res.data as ApiResponse;
  return api;
}
