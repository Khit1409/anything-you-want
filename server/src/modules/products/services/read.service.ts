import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/products.repository';
import { HelperService } from '../../helpers/helper.service';
import { ProductQueryDto } from '../dtos';
import { ProductMapper } from '../mappers/response.mapper';

@Injectable()
export class ReadProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly helperService: HelperService,
    private readonly mapper: ProductMapper,
  ) {}

  async previews(query: ProductQueryDto) {
    const limit = query.limit ?? 30;
    const skip = limit * (query.page ?? 1) - limit;
    const select = 'info ratingSumary shipping images tags status';
    const filter = { select, limit, skip };
    const products = await this.repository.getMany(filter);
    return this.mapper.preview(products);
  }

  async previewForSeller(query: ProductQueryDto, sellerId: string) {
    const limit = query.limit ?? 30;
    const skip = limit * (query.page ?? 1) - limit;
    const select = 'info ratingSumary shipping images tags status';
    const filter = { select, limit, skip };
    const products = await this.repository.getManyBySeller(filter, sellerId);
    return this.mapper.preview(products);
  }

  async detail(productId: string, sellerId?: string) {
    const product = await this.repository.getOneById({
      id: productId,
      sellerId,
    });
    if (!product) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Sản phẩm không tồn tại!',
        }),
      );
    }
    return this.mapper.detail(product);
  }

  async relateds({
    neId,
    categoryId,
    select,
  }: {
    neId: string;
    categoryId: string;
    select: string;
  }) {
    const relateds = await this.repository.getRelateds({
      neId,
      categoryId,
      select,
    });
    return relateds;
  }

  async detailForSeller(productId: string, sellerId: string) {
    const product = await this.repository.getOneBySeller(productId, sellerId);
    if (!product) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Sản phẩm không tồn tại!',
        }),
      );
    }
    return this.mapper.detail(product);
  }

  async variantForEdit(productId: string, sellerId: string) {
    const variants = await this.repository.getVariants(productId, sellerId);
    if (!variants) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Biến thể sản phẩm rỗng!',
        }),
      );
    }
    return this.mapper.variants(variants);
  }
}
