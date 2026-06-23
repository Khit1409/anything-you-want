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

  async bestSeller(query: ProductQueryDto) {
    const select = 'info ratingSumary shipping images tags status';
    const { sort } = this.productHelper.formatQuery(query, select);
    const products = await this.repository.getBestSeller(sort);
    return products;
  }

  async detail(productId: string) {
    const product = await this.repository.getOneById(productId);
    return this.productHelper.checkExistingValue(
      product,
      'Sản phẩm không tồn tại!',
    );
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
    const search = this.productHelper.formatSearchDetail(productId, sellerId);
    const productDoc = await this.repository.getOneBySeller(search);
    const product = this.productHelper.checkExistingValue(
      productDoc,
      'Sản phẩm không tồn tại!',
    );
    return product;
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
