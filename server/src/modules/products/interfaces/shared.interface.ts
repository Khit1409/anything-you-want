import { ShippingMethod } from '../schemas/product-shipping.schema';

export interface SharedOrderPartParams {
  productId: string;
  variantId: string;
  shippingType: ShippingMethod;
  provinceCode: string;
}
