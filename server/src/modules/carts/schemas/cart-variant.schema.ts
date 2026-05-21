import { Schema } from '@nestjs/mongoose';
import { ProductVariant } from '../../products/schemas/product-variant.schema';

@Schema({ _id: false })
export class CartVariant extends ProductVariant {}
