import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CartInfo } from './cart-info.schema';
import { CartOwner } from './cart-owner.schema';
import { CartVariant } from './cart-variant.schema';

export type CartDocument = HydratedDocument<Cart>;

@Schema({ timestamps: true, collection: 'carts', strict: true })
export class Cart {
  @Prop({ type: CartInfo, required: true })
  info: CartInfo;
  @Prop({ type: CartOwner, required: true })
  owner: CartOwner;
  @Prop({ type: CartVariant, required: true })
  variant: CartVariant;
}

export const cartSchema = SchemaFactory.createForClass(Cart);
