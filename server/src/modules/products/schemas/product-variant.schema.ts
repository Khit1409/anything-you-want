import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ _id: true })
export class ProductVariant {
  declare _id: mongoose.Types.ObjectId;
  @Prop({ type: String, required: true })
  sku: string;
  @Prop({ type: String, required: true })
  optionName: string;
  @Prop({ type: Number, required: true, default: 0, min: 0 })
  extraPrice: number;
  @Prop({ type: Number, required: true, min: 0 })
  stock: number;
  @Prop({ type: [String], required: true })
  optionIds: string[];
}
