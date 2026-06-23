import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class CartItem {
  @Prop({ type: String, required: true, ref: 'products' })
  productId: string;
  @Prop({ type: String, required: true })
  sku: string;
  @Prop({ type: Number, required: true, min: 1 })
  quantity: number;
}
