import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CartOwner } from './cart-owner.schema';

export type CartDocument = HydratedDocument<Cart>;

@Schema({ timestamps: true, collection: 'carts', strict: true })
export class Cart {
  @Prop({ type: String, required: true })
  productId: string;
  @Prop({ type: CartOwner, required: true })
  owner: CartOwner;
  @Prop({ type: Number, required: true })
  quantity: number;
  @Prop({ type: Number, required: true })
  totalPrice: number;
  @Prop({ type: String, required: true })
  sku: string;
}

export const cartSchema = SchemaFactory.createForClass(Cart);
