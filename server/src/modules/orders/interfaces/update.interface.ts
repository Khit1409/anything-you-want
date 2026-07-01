export interface UpdateCheckoutParams {
  paymentLinkId: string;
  description: string | null;
  checkoutUrl: string | null;
  qrCode: string | null;
  expiredAt: number | null;
  orderId: string;
}
