import { CreatePaymentLinkResponse } from "@/features/payments/interfaces/response.interface";

export interface CheckoutInitialState {
  paymentValue?: CreatePaymentLinkResponse;
  errorMess?: string;
}

export const checkoutInitalState: CheckoutInitialState = {};
