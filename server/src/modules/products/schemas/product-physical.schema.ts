import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class ProductPhysicalDimensions {
  @Prop({ type: Number, required: true, default: 0 })
  length: number;
  @Prop({ type: Number, required: true, default: 0 })
  width: number;
  @Prop({ type: Number, required: true, default: 0 })
  height: number;
}

@Schema({ _id: false })
export class ProductPhysical {
  @Prop({ type: Number, required: true, default: 0 })
  weight: number;
  @Prop({ type: ProductPhysicalDimensions, required: true })
  dimensions: ProductPhysicalDimensions;
}
