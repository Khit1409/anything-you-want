import { axiosClient } from "@/lib/configs/axios.config";
import { CreateOrderRequest } from "../interfaces/request.interface";

export async function create(params: CreateOrderRequest) {
  const res = await axiosClient.post("/orders", { ...params });
  const data = res.data;
}
