import { ProductImages } from '@/src/modules/products/schemas/product-images.schema';
import { CartInfo } from '../../schemas/cart-info.schema';
export interface CartListFinishedHandle {
  info: CartInfo & {
    name: string;
    brand: string | undefined;
    origin: string | undefined;
    description: string;
  }
  images: ProductImages;
}
