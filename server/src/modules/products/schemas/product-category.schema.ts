import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class ProductCategory {
  @Prop({ type: String, required: true, ref: 'categories' })
  id: string;
  @Prop({ type: String, required: true })
  name: string;
}
