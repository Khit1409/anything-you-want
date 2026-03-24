import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>;

export class CartCategory {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true, ref: 'categories' })
  id: string;
}

export class CartInfo {
  @Prop({ type: String, required: true })
  brand: string;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: CartCategory, required: true })
  category: CartCategory;
  @Prop({ type: String, required: true })
  origin: string;
  @Prop({ type: Number, required: true })
  originPrice: number;
  @Prop({ type: Number, required: true })
  totalPrice: number;
  @Prop({ type: String, required: true, ref: 'products' })
  productId: string;
  @Prop({ type: Number, required: true, min: 1 })
  quantity: number;
  @Prop({ type: Number, required: true, min: 0, max: 100 })
  sale: number;
  @Prop({ type: String, required: true })
  description: string;
}

export class CartShipping {
  @Prop({ type: Boolean, required: true })
  flash: boolean;
  @Prop({ type: Boolean, required: true })
  normal: boolean;
}

export class CartOwner {
  @Prop({ type: String, required: true })
  userId: string;
  @Prop({ type: String, required: true })
  sellerId: string;
  @Prop({ type: String, required: true })
  storeId: string;
}

export class CartClassificationValue {
  @Prop({ type: Boolean, required: true, default: false })
  choosen: boolean;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: Number, required: true })
  stock: number;
  @Prop({ type: Number, required: true })
  extraPrice: number;
  @Prop({ type: String, required: false, default: '' })
  img: string;
}

export class CartClassification {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: [CartClassificationValue], required: true })
  values: CartClassificationValue[];
}
export class CartImages {
  @Prop({ type: String, required: true })
  thumbnail: string;
  @Prop({ type: [String], required: true })
  details: string[];
}

@Schema({ timestamps: true, collection: 'carts' })
export class Cart {
  @Prop({ type: CartInfo, required: true })
  info: CartInfo;
  @Prop({ type: CartOwner, required: true })
  owner: CartOwner;
  @Prop({ type: CartShipping, required: true })
  shipping: CartShipping;
  @Prop({ type: [CartClassification], required: true })
  classification: Array<CartClassification>;
  @Prop({ type: CartImages, required: true })
  images: CartImages;
}

export const cartSchema = SchemaFactory.createForClass(Cart);
