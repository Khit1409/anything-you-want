import { Prop, Schema } from '@nestjs/mongoose';
import { ProductCategory } from './product-category.schema';

@Schema({ _id: false })
export class ProductInfo {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true })
  description: string;
  @Prop({ type: String, required: true })
  price: number;
  @Prop({ type: String, required: true, max: 100, min: 0 })
  sale: number;
  @Prop({ type: ProductCategory, required: true })
  category: ProductCategory;
  @Prop({ type: String, required: false })
  brand?: string;
  @Prop({ type: String, required: false })
  origin?: string;
}
