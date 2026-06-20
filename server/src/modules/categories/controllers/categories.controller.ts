import { Controller, Get } from '@nestjs/common';
import { ReadCategoryService } from '../services/read.service';
import { HelperService } from '../../helpers/helper.service';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly readService: ReadCategoryService,
    private readonly helperService: HelperService,
  ) {}

  @Get()
  async getAll() {
    const categories = await this.readService.getAll();
    return this.helperService.successResponse({
      message: 'Danh sách danh mục sản phẩm',
      data: categories,
    });
  }
}
