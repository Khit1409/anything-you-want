import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class CartCategory {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true, ref: 'categories' })
  id: string;
}
