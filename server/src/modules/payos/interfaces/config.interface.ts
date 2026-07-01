export interface ConfigSellerPayosParams {
  clientId: string;
  checkSumKey: string;
  apiKey: string;
  storeId: string;
}

export interface GetPayosConfigParams {
  apiKeyEncrypt: string;
  checkSumKeyEncrypt: string;
  clientId: string;
}

export interface GetPaymentLinkInfo extends GetPayosConfigParams {
  paymentLinkId?: string;
  orderCode?: number;
}
