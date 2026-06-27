import { ApiResponse } from "@/features/common/interfaces/common.interface";
import { CreatePaymentLinkResponse } from "@/features/payments/interfaces/response.interface";

export interface CreateOrderResponse extends ApiResponse {
  data?: {
    paymentLink: CreatePaymentLinkResponse;
  };
}
