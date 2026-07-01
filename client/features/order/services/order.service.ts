import { axiosClient } from "@/lib/configs/axios.config";
import { CreateOrderRequest } from "../interfaces/request.interface";
import {
  CreateOrderResponse,
  GetOrderPaymentResponse,
} from "../interfaces/response.interface";

export async function createOrderService(params: CreateOrderRequest) {
  const res = await axiosClient.post<CreateOrderResponse>("/orders", {
    ...params,
  });
  const data = res.data;
  return data;
}

export async function getOrderPaymentService(orderId: string) {
  const res = await axiosClient.get<GetOrderPaymentResponse>(
    `/orders/payment/${orderId}`,
  );

  const {data} = res.data;
  return data;

}
