import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class CartOwner {
  @Prop({ type: String, required: true })
  userId: string;
  @Prop({ type: String, required: true })
  sellerId: string;
  @Prop({ type: String, required: true })
  storeId: string;
}
