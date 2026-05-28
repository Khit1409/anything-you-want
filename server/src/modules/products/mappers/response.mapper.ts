import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { Product } from '../schemas/products.schema';
import { ProductDetailDto, ProductPreviewDto, VariantDto } from '../dtos';
import { ProductVariant } from '../schemas/product-variant.schema';

@Injectable()
export class ProductMapper {
  constructor() {}

  preview(data: Product[]) {
    return plainToInstance(ProductPreviewDto, data);
  }

  detail(data: Product) {
    return plainToInstance(ProductDetailDto, data);
  }

  relateds(data: Product[]) {
    return plainToInstance(ProductPreviewDto, data);
  }

  variants(data: ProductVariant[]) {
    return plainToInstance(VariantDto, data);
  }
}
