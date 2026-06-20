import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class ProductClassificationValue {
  @Prop({ type: String, required: true })
  id: string;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: false, default: '' })
  img?: string;
}

@Schema({ _id: false })
export class ProductClassification {
  @Prop({ type: String, required: true })
  id: string;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: [ProductClassificationValue], required: true })
  values: ProductClassificationValue[];
}
