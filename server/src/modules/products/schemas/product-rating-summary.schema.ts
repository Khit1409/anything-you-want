import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class ProductRatingSumary {
  @Prop({ type: Number, required: true, max: 5, min: 1 })
  avg: number;
  @Prop({ type: Number, required: true })
  total: number;
}
