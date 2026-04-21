import { Prop, Schema } from '@nestjs/mongoose';
import { CartCategory } from './cart-category.schema';

@Schema({ _id: false })
export class CartInfo {
  @Prop({ type: String, required: false, default: '' })
  brand?: string;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: CartCategory, required: true })
  category: CartCategory;
  @Prop({ type: String, required: false, default: '' })
  origin?: string;
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
