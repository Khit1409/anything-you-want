import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class CartShipping {
  @Prop({ type: Boolean, required: true })
  flash: boolean;
  @Prop({ type: Boolean, required: true })
  normal: boolean;
}
