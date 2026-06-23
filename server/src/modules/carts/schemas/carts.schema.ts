import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CartOwner } from './cart-owner.schema';
import { CartItem } from './cart-item.schema';

export type CartDocument = HydratedDocument<Cart>;

@Schema({ timestamps: true, collection: 'carts', strict: true })
export class Cart {
  declare _id: mongoose.Types.ObjectId;
  @Prop({ type: CartOwner, required: true })
  owner: CartOwner;
  @Prop({ type: CartItem, required: true })
  product: CartItem;
  declare createdAt: Date;
  declare updatedAt: Date;
}

export const cartSchema = SchemaFactory.createForClass(Cart);
