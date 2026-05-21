import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Product } from './schemas/products.schema';
import { GetProductFilter } from '@/src/interfaces/get-product.interface';
import { ProductVariant } from './schemas/product-variant.schema';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
  ) {}
  /**
   * Get product list by query
   * @param skip
   * @param limit
   * @param select
   * @returns
   */
  async getProductList(filter: GetProductFilter) {
    const { select, skip, limit } = filter;
    const products = await this.productModel
      .find({ status: 'active' })
      .select(select)
      .skip(skip)
      .limit(limit)
      .lean();
    return products;
  }
  /**
   * Get product detail by id
   * @param id
   * @returns
   */
  async getProductDetail(id: string) {
    const product = await this.productModel.findById(id).lean();
    return product;
  }
  /**
   * get detail by seller for update
   */
  async getProductDetailBySeller(id: string, sellerId: string) {
    return await this.productModel.findOne({
      id: new mongoose.Types.ObjectId(id),
      'owner.sellerId': sellerId,
    });
  }
  /**
   *
   * @param category
   * @param neId
   * @param select
   * @returns
   */
  async getRelated(categoryId: string, neId: Types.ObjectId, select: string) {
    const relateds = await this.productModel
      .find({
        'info.category.id': categoryId,
        _id: { $ne: neId },
      })
      .select(select)
      .lean();
    return relateds;
  }
  /**
   *
   * @param data
   * @returns
   */
  async create(data: Product) {
    const newProduct = await this.productModel.create(data);
    if (!newProduct) return false;
    return true;
  }
  /**
   * @param cateId
   * @returns
   */
  async getProductListByCategory(cateId: string) {
    const products = await this.productModel
      .find({
        'info.category.id': cateId,
      })
      .lean();
    return products;
  }
  /**
   * Get list for seller
   * @param sellerId
   * @param limit
   * @param skip
   * @param select
   * @returns
   */
  async getProductListBySeller(sellerId: string, filter: GetProductFilter) {
    const { limit, select, skip } = filter;
    return await this.productModel
      .find({
        'owner.sellerId': sellerId,
      })
      .select(select)
      .skip(skip)
      .limit(limit)
      .lean();
  }
  /**
   * Get product detail for seller to edit
   * @param sellerId
   * @param productId
   */
  async getDetailBySeller(
    sellerId: string,
    productId: mongoose.Types.ObjectId,
  ) {
    console.log(sellerId);
    console.log(productId);
    return await this.productModel
      .findOne({
        'owner.sellerId': sellerId,
        _id: productId,
      })
      .lean();
  }

  /**
   *
   * @param sellerId
   * @param id
   * @returns
   */
  async delete(sellerId: string, id: string) {
    return await this.productModel.deleteOne({
      'owner.sellerId': sellerId,
      id,
    });
  }
  /**
   *
   * @param id
   * @param sku
   * @returns
   */
  async getVariant(id: string, sku: string) {
    const productVariant = await this.productModel
      .findById(id)
      .select('variants id')
      .lean<ProductVariant[]>();
    if (!productVariant) return [];
    return productVariant.find((f) => f.sku === sku);
  }
}
