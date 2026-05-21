import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: true })
export class ProductVariant {
  @Prop({ type: String, required: true })
  sku: string;
  @Prop({ type: Number, required: true })
  extraPrice: number;
  @Prop({ type: Number, required: true })
  stock: number;
  @Prop({ type: Map, required: true })
  options: Record<string, string>;
}
