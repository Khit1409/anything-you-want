import { PaymentType } from '../entities/order-payment.entity';

export interface CheckPaymethodParams {
  paymentType: PaymentType;
  storeId: string;
}
