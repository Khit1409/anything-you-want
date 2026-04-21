import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class ProductOwner {
  @Prop({ type: String, required: true })
  sellerId: string;
  @Prop({ type: String, required: true })
  storeId: string;
}
