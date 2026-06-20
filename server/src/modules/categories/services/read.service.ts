import { Injectable } from '@nestjs/common';
import { HelperCategoryService } from './helper.service';
import { CategoryRepository } from '../repositories/categories.repository';
import { plainToInstance } from 'class-transformer';
import { CategoryResponseDto } from '../dto/category-response.dto';

@Injectable()
export class ReadCategoryService {
  constructor(
    private readonly repository: CategoryRepository,
    private readonly helperCategoryService: HelperCategoryService,
  ) {}

  async getById(id: string) {
    const category = await this.repository.getById(id);
    const checked = this.helperCategoryService.checkValue(category);
    return plainToInstance(CategoryResponseDto, checked);
  }

  async getAll() {
    const categories = await this.repository.getAll();
    return plainToInstance(CategoryResponseDto, categories);
  }
}
