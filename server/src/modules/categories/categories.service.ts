import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './categories.repository';
import { HttpResponse } from '@/src/helpers/httpResponse';

@Injectable()
export class CategoryService {
  constructor(
    private readonly repo: CategoryRepository,
    private readonly httpHelper: HttpResponse,
  ) {}

  async getAll() {
    return await this.repo.getAll();
  }
  async getByName(name: string) {
    const category = await this.repo.getByName(name);
    if (!category) throw new NotFoundException('Category is not found!');
    return category;
  }
  async getById(id: string) {
    const category = await this.repo.getById(id);
    if (!category) throw new NotFoundException('Category is not found!');
    return category;
  }
}
