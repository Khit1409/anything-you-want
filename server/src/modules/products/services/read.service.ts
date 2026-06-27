import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/products.repository';
import { ProductQueryDto } from '../dtos';
import { HelperProductService } from './helper.service';
import {
  ProductFindOneOptions,
  RelatedsOptions,
} from '../repositories/interfaces/products.repository.interface';
import { SharedStoreService } from '../../stores/services/shared.service';

@Injectable()
export class ReadProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly productHelper: HelperProductService,
    private readonly sharedStoreService: SharedStoreService,
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

  async relateds(options: RelatedsOptions) {
    const relateds = await this.repository.getRelateds(options);
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
    const variantDocs = await this.repository.getVariants(productId, sellerId);
    const variants = this.productHelper.checkExistingValue(
      variantDocs,
      'Danh sách biến thể không tồn tại!',
    );
    return variants;
  }

  async getForOrder(productId: string) {
    const select = 'info variants classifications shipping owner';
    const search: ProductFindOneOptions = { _id: productId };
    const productDoc = await this.repository.getOne(search, select);
    const product = this.productHelper.checkExistingValue(
      productDoc,
      'Sản phẩm không tồn tại!',
    );
    const { storeId } = product.owner;
    const paymentSupports =
      await this.sharedStoreService.getPaymentList(storeId);
    const { _id, classifications, variants, info } = product;
    const shipping = {
      ...product.shipping,
      methods: product.shipping.methods.filter((ft) => ft.enabled),
    };
    return {
      _id,
      info,
      classifications,
      variants,
      shipping,
      paymentSupports,
    };
  }
}
