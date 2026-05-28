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

type FindOneOptions = {
  id: string;
  sellerId?: string;
};

type FindManyOptions = {
  skip: number;
  limit: number;
  select: string;
};

type RelatedsOptions = {
  neId: string;
  categoryId: string;
  select: string;
};

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

  async findOne({
    id,
    sellerId,
  }: FindOneOptions): Promise<HydratedDocument<Product> | null> {
    const query: Record<string, any> = { _id: id };
    if (sellerId) {
      query['owner.sellerId'] = sellerId;
    }
    return await this.model.findOne(query);
  }

  async findMany({
    skip,
    limit,
    select,
  }: FindManyOptions): Promise<HydratedDocument<Product>[]> {
    return await this.model.find().limit(limit).skip(skip).select(select);
  }

  async getMany({ skip, limit, select }: FindManyOptions): Promise<Product[]> {
    return await this.model
      .find()
      .limit(limit)
      .skip(skip)
      .select(select)
      .lean<Product[]>();
  }

  async getOneById({
    id,
    sellerId,
  }: {
    id: string;
    sellerId?: string;
  }): Promise<Product | null> {
    if (sellerId)
      return await this.model
        .findOne({
          _id: id,
          ...(sellerId ? { 'owner.sellerId': sellerId } : {}),
        })
        .lean();
    return await this.model.findById(id).lean();
  }

  async getManyBySeller(
    filter: FindManyOptions,
    sellerId: string,
  ): Promise<Product[]> {
    const { limit, select, skip } = filter;
    return await this.model
      .find({ 'owner.sellerId': sellerId })
      .select(select ?? {})
      .limit(limit)
      .skip(skip)
      .lean();
  }

  async getOneBySeller(id: string, sellerId: string): Promise<Product | null> {
    return await this.model
      .findOne({ _id: id, 'owner.sellerId': sellerId })
      .lean();
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

  async getRelateds({
    neId,
    categoryId,
    select,
  }: RelatedsOptions): Promise<Product[]> {
    return await this.model
      .find({ 'info.category.id': categoryId, _id: { $ne: neId } })
      .select(select)
      .lean();
  }

  async delete(id: string, sellerId: string) {
    return await this.model.deleteOne({ _id: id, 'owner.sellerId': sellerId });
  }

  getModel(): Model<Product> {
    return this.model;
  }
}
