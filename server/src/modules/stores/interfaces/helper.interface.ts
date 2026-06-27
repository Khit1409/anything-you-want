import { PaymentType } from '../../orders/entities/order-payment.entity';

export interface AcceptedPaymentMethodParams {
  storeId: string;
  paymentMethod: PaymentType.BANKING | PaymentType.MOMO;
}
