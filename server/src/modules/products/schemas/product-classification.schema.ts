import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class ProductClassificationValue {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: Number, required: true })
  stock: number;
  @Prop({ type: Number, required: true })
  extraPrice: number;
  @Prop({ type: String, required: false })
  img?: string;
}

@Schema({ _id: false })
export class ProductClassification {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: [ProductClassificationValue], required: true })
  values: ProductClassificationValue[];
}
