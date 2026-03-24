import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'categories', _id: true, timestamps: true })
export class Category {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true })
  slug: string;
}

export const categorySchema = SchemaFactory.createForClass(Category);
