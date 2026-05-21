import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './categories.repository';
import { HttpResponse } from '@/src/helpers/httpResponse';
import { plainToInstance } from 'class-transformer';
import { CategoryResponseDto } from './dto/category-response.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly repo: CategoryRepository,
    private readonly httpHelper: HttpResponse,
  ) {}

  // ============================================================================
  // READ OPERATIONS
  // ============================================================================

  /**
   * Lấy tất cả danh mục
   * @returns Response chứa danh sách tất cả danh mục
   */
  async getAll() {
    const categories = await this.repo.getAll();
    return {
      ...this.httpHelper.success(
        'Danh sách danh mục đã sẵn sàng sử dụng',
        plainToInstance(CategoryResponseDto, categories),
      ),
    };
  }

  /**
   * Lấy danh mục theo ID
   * @param id - ID của danh mục
   * @returns Thông tin chi tiết danh mục
   * @throws NotFoundException nếu danh mục không tồn tại
   */
  async getById(id: string) {
    const category = await this.repo.getById(id);
    if (!category) {
      throw new NotFoundException('Danh mục không tồn tại!');
    }
    return category;
  }

  /**
   * Lấy danh mục theo tên
   * @param name - Tên của danh mục
   * @returns Thông tin chi tiết danh mục
   * @throws NotFoundException nếu danh mục không tồn tại
   */
  async getByName(name: string) {
    const category = await this.repo.getByName(name);
    if (!category) {
      throw new NotFoundException('Danh mục không tồn tại!');
    }
    return category;
  }
}
