import { GetPaymentLinkInfo } from '@/modules/payos/interfaces/config.interface';

export interface CreatePaymentParams {
  storeId: string;
  orderCode: number;
  orderId: string;
  userId: string;
  totalPrice: number;
  buyerAddress: string;
  buyerPhone: string;
  buyerEmail: string;
  buyerName: string;
}

export interface CheckExistingPaymentParams extends GetPaymentLinkInfo {
  orderCode: number;
  orderId: string;
  accountName: string;
  accountNumber: string;
  bin: string;
}
