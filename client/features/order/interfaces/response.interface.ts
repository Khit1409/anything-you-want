import { ApiResponse } from "@/features/common/interfaces/common.interface";
import { PaymentType } from "@/features/payments/interfaces/read.interface";
import { CreatePaymentLinkResponse } from "@/features/payments/interfaces/response.interface";
import { Orders } from "./read.interface";

export interface CreateOrderResponse extends ApiResponse {
  data: { paymentType: PaymentType; orderId: string };
}
export interface GetOrderPaymentResponse extends ApiResponse {
  data: { paymentData?: CreatePaymentLinkResponse; orderId: string };
}
export interface GetUserOrderResponse extends ApiResponse {
  data: Orders;
}
