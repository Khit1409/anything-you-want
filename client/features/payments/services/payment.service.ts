import { axiosClient } from "@/lib/configs/axios.config";
import { CancelPaymentParams } from "../interfaces/request.interface";
import { ApiResponse } from "@/features/common/interfaces/common.interface";

export async function cancelPaymentService(params: CancelPaymentParams) {
  const res = await axiosClient.put<ApiResponse>("/payments/cancel", {
    ...params,
  });
  return res.data;
}
