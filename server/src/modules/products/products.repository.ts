import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from './schemas/products.schema';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
  ) {}
  /**
   *
   * @param skip
   * @param limit
   * @param select
   * @returns
   */
  async getProductList(skip: number, limit: number, select: string) {
    const products = await this.productModel
      .find({ status: 'active' })
      .select(select)
      .skip(skip)
      .limit(limit)
      .lean();
    return products;
  }
  /**
   *
   * @param id
   * @returns
   */
  async getProductDetail(id: string) {
    const product = await this.productModel.findById(id).lean();
    return product;
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
}
