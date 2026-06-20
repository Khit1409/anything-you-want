import { ProductVariant } from '../schemas/product-variant.schema';

export type VariantBasic = Omit<ProductVariant, '_id'>;
