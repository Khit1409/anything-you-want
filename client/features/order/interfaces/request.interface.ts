import { ShippingMethod } from "@/features/product/interfaces/read.interface";
import { OrderAddress, OrderContact } from "./read.interface";
import { PaymentType } from "@/features/payments/interfaces/read.interface";

export interface CreateOrderRequest {
  productId: string;
  variantId: string;
  shipMethod: ShippingMethod;
  paymentType: PaymentType;
  quantity: number;
  contact: OrderContact;
  address: OrderAddress;
}
