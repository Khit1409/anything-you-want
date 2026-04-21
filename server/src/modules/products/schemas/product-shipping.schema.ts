import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class ProductShipping {
  @Prop({ type: Boolean, required: true })
  flash: boolean;
  @Prop({ type: Boolean, required: true })
  normal: boolean;
}
