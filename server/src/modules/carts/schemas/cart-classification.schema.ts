import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class CartClassificationValue {
  @Prop({ type: Boolean, required: true, default: false })
  choosen: boolean;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: Number, required: true })
  stock: number;
  @Prop({ type: Number, required: true })
  extraPrice: number;
  @Prop({ type: String, required: false, default: '' })
  img?: string;
}

@Schema({ _id: false })
export class CartClassification {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: [CartClassificationValue], required: true })
  values: CartClassificationValue[];
}
