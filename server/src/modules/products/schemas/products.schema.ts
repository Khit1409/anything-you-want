import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class ProductCategory {
  @Prop({ type: String, required: true, ref: 'categories' })
  id: string;
  @Prop({ type: String, required: true })
  name: string;
}

export class ProductInfo {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true })
  description: string;
  @Prop({ type: String, required: true })
  price: number;
  @Prop({ type: String, required: true, max: 100, min: 0 })
  sale: number;
  @Prop({ type: ProductCategory, required: true })
  category: ProductCategory;
  @Prop({ type: String, required: false })
  brand: string;
  @Prop({ type: String, required: false })
  origin: string;
}
export class ProductOwner {
  @Prop({ type: String, required: true })
  sellerId: string;
  @Prop({ type: String, required: true })
  storeId: string;
}

export class ProductImages {
  @Prop({ type: String, required: true })
  thumbnail: string;
  @Prop({ type: [String], required: true })
  details: string[];
}

export class ProductClassificationValue {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true })
  stock: number;
  @Prop({ type: String, required: true })
  extraPrice: number;
  @Prop({ type: String, required: false, default: '' })
  img: string;
}

export class ProductClassification {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: [ProductClassificationValue], required: true })
  values: ProductClassificationValue[];
}

export class ProductShipping {
  @Prop({ type: Boolean, required: true })
  flash: boolean;
  @Prop({ type: Boolean, required: true })
  normal: boolean;
}

export class ProductRatingSumary {
  @Prop({ type: Number, required: true, max: 5, min: 1 })
  avg: number;
  @Prop({ type: Number, required: true })
  total: number;
}
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
@Schema({ collection: 'products', timestamps: true })
export class Product {
  @Prop({ type: ProductInfo, required: true })
  info: ProductInfo;
  @Prop({ type: ProductOwner, required: true })
  owner: ProductOwner;
  @Prop({ type: ProductImages, required: true })
  images: ProductImages;
  @Prop({ type: [String], required: true })
  tags: string[];
  @Prop({ type: [ProductClassification], required: true })
  classification: ProductClassification[];
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
