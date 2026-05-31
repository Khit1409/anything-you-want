import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductInfo } from './product-info.schema';
import { ProductOwner } from './product-owner.schema';
import { ProductImages } from './product-images.schema';
import { ProductClassification } from './product-classification.schema';
import { ProductShipping } from './product-shipping.schema';
import { ProductRatingSumary } from './product-rating-summary.schema';
import { ProductVariant } from './product-variant.schema';
import { ProductPhysical } from './product-physical.schema';
/**
 *
 */
export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ZERO = 'zero',
}
/**
 *
 */
@Schema({
  collection: 'products',
  timestamps: true,
  versionKey: false,
  strict: true,
})
export class Product {
  @Prop({ type: ProductInfo, required: true })
  info: ProductInfo;
  @Prop({ type: ProductPhysical, required: true })
  physical: ProductPhysical;
  @Prop({ type: ProductOwner, required: true })
  owner: ProductOwner;
  @Prop({ type: ProductImages, required: true })
  images: ProductImages;
  @Prop({ type: [String], required: true })
  tags: string[];
  @Prop({ type: [ProductClassification], required: true })
  classifications: ProductClassification[];
  @Prop({ type: [ProductVariant], required: true })
  variants: ProductVariant[];
  @Prop({ type: ProductShipping })
  shipping: ProductShipping;
  @Prop({ type: ProductRatingSumary, required: false })
  ratingSumary: ProductRatingSumary;
  @Prop({
    required: true,
    enum: ProductStatus,
    type: String,
    default: ProductStatus.ACTIVE,
  })
  status: ProductStatus;
}

export const productSchema = SchemaFactory.createForClass(Product);
export type ProductDocument = typeof Product;
