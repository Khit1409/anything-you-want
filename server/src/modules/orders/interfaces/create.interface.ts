import { ShippingMethod } from '../../products/schemas/product-shipping.schema';
import { PaymentStatus, PaymentType } from '../entities/order-payment.entity';
import { OrderStatus } from '../entities/order.entity';

export interface OrderContactRepositorySave {
  phone: string;
  email: string;
  userName: string;
}

export interface OrderPaymentRepositorySave {
  status: PaymentStatus;
  type: PaymentType;
}

export interface OrderShippingRepositorySave {
  type: ShippingMethod;
  finishedAt: Date | null;
}

export interface OrderAddressRepositorySave {
  province: string;
  ward: string;
  detail: string;
}

export type OrderOwnerSave = {
  id: string;
};

export interface OrderRepositorySave {
  seller: OrderOwnerSave;
  store: OrderOwnerSave;
  user: OrderOwnerSave;
  name: string;
  price: number;
  totalPrice: number;
  quantity: number;
  thumbnail: string;
  sale: number;
  sku: string;
  productId: string;
  status: OrderStatus;
  address: OrderAddressRepositorySave;
  contact: OrderContactRepositorySave;
  payment: OrderPaymentRepositorySave;
  shipping: OrderShippingRepositorySave;
}
