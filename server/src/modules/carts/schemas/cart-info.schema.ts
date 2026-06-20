import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class CartInfo {
  @Prop({ type: Number, required: true })
  originPrice: number;
  @Prop({ type: Number, required: true })
  totalPrice: number;
  @Prop({ type: String, required: true, ref: 'products' })
  productId: string;
  @Prop({ type: String, required: true })
  sku: string;
  @Prop({ type: Number, required: true, min: 1 })
  quantity: number;
  @Prop({ type: Number, required: true, min: 0, max: 100 })
  sale: number;
}
