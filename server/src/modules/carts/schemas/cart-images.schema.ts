import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class CartImages {
  @Prop({ type: String, required: true })
  thumbnail: string;
  @Prop({ type: [String], required: true })
  details: string[];
}
