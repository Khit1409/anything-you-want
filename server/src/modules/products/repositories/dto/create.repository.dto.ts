import { ProductClassification } from '../../schemas/product-classification.schema';
import { ProductImages } from '../../schemas/product-images.schema';
import { ProductInfo } from '../../schemas/product-info.schema';
import { ProductOwner } from '../../schemas/product-owner.schema';
import { ProductRatingSumary } from '../../schemas/product-rating-summary.schema';
import { ProductShipping } from '../../schemas/product-shipping.schema';
import { ProductVariant } from '../../schemas/product-variant.schema';
import { ProductStatus } from '../../schemas/products.schema';

/**
 * param data for repository use create product
 */
export class CreateProductDataDto {
  info: ProductInfo;
  classifications: ProductClassification[];
  variants: Omit<ProductVariant, '_id'>[];
  images: ProductImages;
  tags: string[];
  shipping: ProductShipping;
  ratingSumary: ProductRatingSumary;
  owner: ProductOwner;
  status: ProductStatus;
}
