import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/products.repository';
import { HelperService } from '../../helpers/helper.service';
import { ProductQueryDto } from '../dtos';
import { HelperProductService } from './helper.service';

@Injectable()
export class ReadProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly productHelper: HelperProductService,
    private readonly helperService: HelperService,
  ) {}

  async previews(query: ProductQueryDto) {
    const select = 'info ratingSumary shipping images tags status';
    const filter = this.productHelper.formatQuery(query, select);
    const products = await this.repository.getMany(filter);
    return products;
  }

  async previewForSeller(query: ProductQueryDto, sellerId: string) {
    const select = 'info ratingSumary shipping images tags status';
    const filter = this.productHelper.formatQuery(query, select, sellerId);
    const products = await this.repository.getManyBySeller(filter);
    return products;
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

    return product;
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
    const variants = this.productHelper.recordVariantOption(
      product.classifications,
      product.variants,
    );

    console.log(variants);
    return { ...product, variants: variants };
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
    return variants;
  }
}
