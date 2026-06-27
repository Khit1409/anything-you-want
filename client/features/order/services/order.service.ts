import { axiosClient } from "@/lib/configs/axios.config";
import { CreateOrderRequest } from "../interfaces/request.interface";
import { CreateOrderResponse } from "../interfaces/response.interface";

export async function createOrderService(params: CreateOrderRequest) {
  const res = await axiosClient.post<CreateOrderResponse>("/orders", {
    ...params,
  });
  const data = res.data;
  return data;
}
