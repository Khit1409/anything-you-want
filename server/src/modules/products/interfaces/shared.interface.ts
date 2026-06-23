import { PaymentType } from '../../orders/entities/order-payment.entity';
import { ShippingMethod } from '../schemas/product-shipping.schema';

export interface SharedOrderPartParams {
  productId: string;
  variantId: string;
  paymentType: PaymentType;
  shippingType: ShippingMethod;
}
