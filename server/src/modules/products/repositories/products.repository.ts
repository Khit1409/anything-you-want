import { Injectable } from '@nestjs/common';
import { HydratedDocument, Model } from 'mongoose';
import { Product, ProductStatus } from '../schemas/products.schema';
import { ProductShipping } from '../schemas/product-shipping.schema';
import { ProductClassification } from '../schemas/product-classification.schema';
import { ProductCategory } from '../schemas/product-category.schema';
import { ProductOwner } from '../schemas/product-owner.schema';
import { ProductImages } from '../schemas/product-images.schema';
import { ProductInfo } from '../schemas/product-info.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ProductVariant } from '../schemas/product-variant.schema';
import {
  FilterProducts,
  ProductFindOneOptions,
  RelatedsOptions,
  SortProducts,
} from './interfaces/query.interface';
import {
  ResetStockWhenCancelOrderParams,
  UpdateStockPayload,
} from '../interfaces/update.interface';

@Injectable()
export class ProductRepository {
  constructor(@InjectModel('Product') private readonly model: Model<Product>) {}

  async findManyByCategory(
    categoryId: string,
  ): Promise<HydratedDocument<Product>[]> {
    return await this.model.find({ 'info.category.id': categoryId });
  }

  async getManyByCategory(categoryId: string): Promise<Product[]> {
    return await this.model.find({ 'info.category.id': categoryId }).lean();
  }

  async findOne(
    search: ProductFindOneOptions,
  ): Promise<HydratedDocument<Product> | null> {
    return await this.model.findOne(search);
  }

  async findMany(filter: FilterProducts): Promise<HydratedDocument<Product>[]> {
    const { limit, skip, select } = filter.sort;
    return await this.model
      .find(filter.search)
      .limit(limit)
      .skip(skip)
      .select(select);
  }

  async getMany(filter: FilterProducts): Promise<Product[]> {
    const { skip, limit, select } = filter.sort;
    return await this.model
      .find(filter.search)
      .limit(limit)
      .skip(skip)
      .select(select)
      .lean<Product[]>();
  }

  async getBestSeller(sort: SortProducts) {
    const { skip, limit, select } = sort;
    return await this.model
      .find({ 'info.sale': { $gt: 0 } })
      .limit(limit)
      .skip(skip)
      .select(select)
      .lean();
  }

  async getOne(search: ProductFindOneOptions, select: string) {
    return await this.model
      .findOne({ ...search })
      .select(select ?? {})
      .lean();
  }

  async getOneById(id: string): Promise<Product | null> {
    return await this.model.findById(id).lean();
  }

  async getManyBySeller(filter: FilterProducts): Promise<Product[]> {
    const { limit, select, skip } = filter.sort;
    return await this.model
      .find(filter.search)
      .select(select)
      .limit(limit)
      .skip(skip)
      .lean();
  }

  async getOneBySeller(search: ProductFindOneOptions) {
    return await this.model.findOne(search).lean();
  }

  async getOneVariantById(id: string, variantId: string, sellerId?: string) {
    const doc = await this.model
      .findOne({
        _id: id,
        'variants._id': variantId,
        ...(sellerId ? { 'owner.sellerId': sellerId } : {}),
      })
      .lean();
    return doc?.variants[0];
  }

  async getVariants(
    id: string,
    sellerId?: string,
  ): Promise<ProductVariant[] | undefined> {
    const doc = await this.model
      .findOne({ _id: id, ...(sellerId ? { 'owner.sellerId': sellerId } : {}) })
      .select('variants')
      .lean();
    return doc?.variants;
  }

  async getOneVariantByOptionIds(productId: string, optionIds: string[]) {
    const doc = await this.model.findById(productId);
    return doc?.variants.find((v) =>
      optionIds.every((id) => v.optionIds.includes(id)),
    );
  }
  async getOneVariantBySku(productId: string, sku: string) {
    const doc = await this.model.findById(productId);
    return doc?.variants.find((v) => v.sku === sku);
  }

  async getOwnerById(id: string): Promise<ProductOwner | null> {
    const doc = await this.model.findById(id).select({ owner: 1 }).lean();
    return doc?.owner ?? null;
  }

  async getCategory(id: string): Promise<ProductCategory | null> {
    const doc = await this.model
      .findById(id)
      .select({ 'info.category': 1 })
      .lean();
    return doc?.info?.category ?? null;
  }

  async getClassifications(
    id: string,
  ): Promise<ProductClassification[] | null> {
    const doc = await this.model
      .findById(id)
      .select({ classifications: 1 })
      .lean();
    return doc?.classifications ?? null;
  }

  async getShipping(id: string): Promise<ProductShipping | null> {
    const doc = await this.model.findById(id).select({ shipping: 1 }).lean();
    return doc?.shipping ?? null;
  }

  async getImage(id: string): Promise<ProductImages | null> {
    const doc = await this.model.findById(id).select({ images: 1 }).lean();
    return doc?.images ?? null;
  }

  async getStatus(id: string): Promise<ProductStatus | null> {
    const doc = await this.model.findById(id).select({ status: 1 }).lean();
    return doc?.status ?? null;
  }

  async getInfo(id: string): Promise<ProductInfo | null> {
    const doc = await this.model.findOne({ _id: id }, { info: 1 }).lean();
    return doc?.info ?? null;
  }

  async getRelateds(options: RelatedsOptions): Promise<Product[]> {
    const { categoryId, neId, select } = options;
    return await this.model
      .find({ 'info.category.id': categoryId, _id: { $ne: neId } })
      .select(select)
      .lean();
  }

  async delete(id: string, sellerId: string) {
    return await this.model.deleteOne({ _id: id, 'owner.sellerId': sellerId });
  }

  async updateStock(payload: UpdateStockPayload) {
    const { quantity, productId, variantId } = payload;
    return await this.model.updateOne(
      {
        _id: productId,
        variants: {
          $elemMatch: {
            _id: variantId,
            stock: { $gte: quantity },
          },
        },
      },
      {
        $inc: {
          'variants.$.stock': -quantity,
        },
      },
    );
  }

  async resetStock(params: ResetStockWhenCancelOrderParams) {
    const { productId, stockDiscounted, sku } = params;
    return await this.model.updateOne(
      {
        _id: productId,
        variants: { $elemMatch: { sku } },
      },
      {
        $inc: { 'variants.$.stock': stockDiscounted },
      },
    );
  }

  getModel(): Model<Product> {
    return this.model;
  }
}
