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
