import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ _id: true })
export class ProductVariant {
  declare _id: mongoose.Types.ObjectId;
  @Prop({ type: String, required: true })
  sku: string;
  @Prop({ type: Number, required: true, default: 0 })
  extraPrice: number;
  @Prop({ type: Number, required: true })
  stock: number;
  @Prop({ type: [String], required: true })
  optionIds: string[];
}
