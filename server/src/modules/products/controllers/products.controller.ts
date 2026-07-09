import { Controller, Get, Query, Param, HttpCode } from '@nestjs/common';
import { ProductQueryDto } from '../dtos';
import { ReadProductService } from '../services/read.service';
import { HelperService } from '../../common/services/helper.service';
import { Public } from '@/shared/decorators/public-api-url.decorator';

@Public()
@Controller('products')
export class ProductController {
  constructor(
    private readonly readService: ReadProductService,
    private readonly helperService: HelperService,
  ) {}

  @HttpCode(200)
  @Get()
  async getProductPreviews(@Query() query: ProductQueryDto) {
    const api = await this.readService.previews(query);
    return this.helperService.successResponse({
      message: 'Dữ liệu sản phẩm xem trước',
      data: api,
    });
  }
  @HttpCode(200)
  @Get('best-seller')
  async getProductBestSeller(@Query() query: ProductQueryDto) {
    const api = await this.readService.bestSeller(query);
    return this.helperService.successResponse({
      message: 'Dữ liệu sản phẩm xem trước',
      data: api,
    });
  }

  @HttpCode(200)
  @Get(':productId')
  async getProductDetail(@Param('productId') productId: string) {
    const data = await this.readService.detail(productId);
    return this.helperService.successResponse({
      message: 'Dữ liệu chi tiết sản phẩm!',
      data,
    });
  }

  @Get(':productId/related')
  async getProductRelated(@Param('productId') neId: string) {
    const data = await this.readService.relateds(neId);
    return this.helperService.successResponse({
      message: 'Các sản phẩm liên quan!',
      data,
    });
  }

  @Get('order/:id')
  async getProductDetailForOrder(@Param('id') productId: string) {
    const product = await this.readService.getForOrder(productId);
    return this.helperService.successResponse({
      message: 'Dữ liệu sản phẩm!',
      data: product,
    });
  }
}
