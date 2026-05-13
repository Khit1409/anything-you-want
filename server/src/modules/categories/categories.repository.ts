import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schemas/categories.schema';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}
  /**
   *
   * @returns
   */
  async getAll() {
    return this.categoryModel
      .find()
      .select('-createdAt  -updatedAt -__v')
      .lean();
  }
  /**
   *
   * @param name
   * @returns
   */
  async getByName(name: string) {
    const category = await this.categoryModel
      .findOne({ name })
      .lean<{ name: string; id: string }>();
    return category;
  }
  /**
   *
   */
  async getById(id: string) {
    return await this.categoryModel.findById(id).lean();
  }
}
