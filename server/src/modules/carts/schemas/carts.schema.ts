import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CartInfo } from './cart-info.schema';
import { CartShipping } from './cart-shipping.schema';
import { CartOwner } from './cart-owner.schema';
import { CartImages } from './cart-images.schema';
import { CartVariant } from './cart-variant.schema';

export type CartDocument = HydratedDocument<Cart>;

@Schema({ timestamps: true, collection: 'carts' })
export class Cart {
  @Prop({ type: CartInfo, required: true })
  info: CartInfo;
  @Prop({ type: CartOwner, required: true })
  owner: CartOwner;
  @Prop({ type: CartShipping, required: true })
  shipping: CartShipping;
  @Prop({ type: CartVariant, required: true })
  variant: CartVariant;
  @Prop({ type: CartImages, required: true })
  images: CartImages;
}

export const cartSchema = SchemaFactory.createForClass(Cart);
