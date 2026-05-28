import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class CartVariant {
  @Prop({ type: String, required: true })
  id: string;
  @Prop({ type: String, required: true })
  sku: string;
  @Prop({ type: Number, required: true })
  stock: number;
  @Prop({ type: Number, required: true, default: 0 })
  extraPrice: number;
  @Prop({ type: Map, required: true })
  options: Record<string, string>;
}
