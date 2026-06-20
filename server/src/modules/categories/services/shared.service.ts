import { Injectable } from '@nestjs/common';
import { HelperCategoryService } from './helper.service';
import { CategoryRepository } from '../repositories/categories.repository';

@Injectable()
export class SharedCategoryService {
  constructor(
    private readonly repository: CategoryRepository,
    private readonly helperCategoryService: HelperCategoryService,
  ) {}

  async getById(id: string) {
    const category = await this.repository.getById(id);
    return this.helperCategoryService.checkValue(category);
  }

  async getAll() {
    return await this.repository.getAll();
  }
}
