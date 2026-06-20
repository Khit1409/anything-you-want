import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../schemas/categories.schema';
import { CategoryEntity } from '../interfaces/category.entity.interface';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async getAll() {
    return this.categoryModel.find().select('name').lean<CategoryEntity[]>();
  }

  async getByName(name: string) {
    return await this.categoryModel
      .findOne({ name })
      .select('name')
      .lean<CategoryEntity>();
  }
  async findByName(name: string) {
    return await this.categoryModel.findOne({ name }).select('name');
  }

  async getById(id: string) {
    return await this.categoryModel.findById(id).lean<CategoryEntity>();
  }
  async findById(id: string) {
    return await this.categoryModel.findById(id);
  }
}
