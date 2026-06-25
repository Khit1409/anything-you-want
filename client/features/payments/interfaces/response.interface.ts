import { PaymentLinkStatus } from "./read.interface";

export type CreatePaymentLinkResponse = {
  bin: string;
  accountNumber: string;
  accountName: string;
  amount: number;
  description: string;
  orderCode: number;
  currency: string;
  paymentLinkId: string;
  status: PaymentLinkStatus;
  expiredAt?: number;
  checkoutUrl: string;
  qrCode: string;
};
