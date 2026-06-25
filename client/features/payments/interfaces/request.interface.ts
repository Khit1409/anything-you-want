import { PaymentLinkItem, TaxPercentage } from "./read.interface";

export type CancelPaymentLinkRequest = {
  cancellationReason?: string;
};
export type InvoiceRequest = {
  buyerNotGetInvoice?: boolean;
  taxPercentage?: TaxPercentage;
};
export type CreatePaymentLinkRequest = {
  orderCode: number;
  amount: number;
  description: string;
  cancelUrl: string;
  returnUrl: string;
  signature?: string;
  items?: PaymentLinkItem[];
  buyerName?: string;
  buyerCompanyName?: string;
  buyerTaxCode?: string;
  buyerEmail?: string;
  buyerPhone?: string;
  buyerAddress?: string;
  invoice?: InvoiceRequest;
  expiredAt?: number;
};
