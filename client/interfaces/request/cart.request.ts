import { ProductClassificationValue } from "../response/product.response";

export interface CartClassificationRequest {
  name: string;
  values: ProductClassificationValue;
}

export interface CartRequest {
  productId: string;
  classification: Array<CartClassificationRequest>;
  quantity: number;
}
