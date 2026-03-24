import {
  ProductClassification,
  ProductClassificationValue,
} from "../response/product.response";

export interface CartClassificationValueRequest
  extends ProductClassificationValue {
  choosen: boolean;
}

export interface CartClassificationRequest extends ProductClassification {
  values: Array<CartClassificationValueRequest>;
}

export interface CartRequest {
  productId: string;
  classification: Array<CartClassificationRequest>;
  quantity: number;
}
