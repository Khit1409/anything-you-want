import { ShippingMethod } from "@/features/product/interfaces/read.interface";
import { CreateOrderRequest } from "./request.interface";

export type OrderAddress = {
  province: string;
  ward: string;
  detail: string;
  provinceCode: string;
};

export type OrderContact = {
  phone: string;
  userName: string;
  email: string;
};

export type SelectOptionIdType = { name: string; id: string };
export type OnChangeSelectOptionParams = { clsName: string; valueId: string };
export type OrderUseForm = {
  data: CreateOrderRequest;
};

export enum OrderStatus {
  PENDING = "pending",
  SHIPPING = "shipping",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  SHIPPING_FAILED = "shipping_failed",
}

export type Orders = Order[];

export interface Order {
  id: string;
  name: string;
  productId: string;
  thumbnail: string;
  sku: string;
  totalPrice: string;
  quantity: number;
  price: string;
  sale: number;
  orderCode: number;
  contact: OrderContact;
  payment: OrderPayment;
  shipping: OrderShipping;
  address: OrderAddress;
  status: OrderStatus;
  store: OrderStore;
  createdAt: string;
  updatedAt: string;
}

export interface OrderPayment {
  type: string;
  status: string;
}

export interface OrderShipping {
  type: ShippingMethod;
  startedAt: string;
  finishedAt: string | null;
}

export interface OrderStore {
  id: string;
  info: OrderInfo;
}

export interface OrderInfo {
  name: string;
}
