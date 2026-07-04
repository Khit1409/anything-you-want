import { ProductQueryDto } from '../../dtos';
import { ProductStatus } from '../../schemas/products.schema';

export interface FormatQueryParams {
  query: ProductQueryDto;
  select: string;
  sellerId?: string;
  status?: ProductStatus;
}
