import { OrderAddress, OrderContact } from "./read.interface";

export interface CreateOrderRequest {
  productId: string;
  variantId: string;
  quantity: number;
  contact: OrderContact;
  address: OrderAddress;
}
