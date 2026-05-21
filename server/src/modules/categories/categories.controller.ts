import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './categories.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // ============================================================================
  // READ ENDPOINTS
  // ============================================================================

  /**
   * Lấy tất cả danh mục
   * @returns Response chứa danh sách tất cả danh mục
   */
  @Get()
  async getAll() {
    return await this.categoryService.getAll();
  }
}
