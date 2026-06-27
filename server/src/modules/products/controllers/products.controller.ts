import { Controller, Get, Query, Param, HttpCode } from '@nestjs/common';
import { ProductQueryDto } from '../dtos';
import { ReadProductService } from '../services/read.service';
import { HelperService } from '../../helpers/helper.service';
import { Public } from '@/src/common/decorators/public-api-url.decorator';

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
    const select = 'info ratingSumary shipping images tags';
    const product = await this.readService.detail(productId);
    const categoryId = product.info.category.id;
    const filterRelateds = {
      neId: productId,
      categoryId,
      select,
    };
    const relateds = await this.readService.relateds(filterRelateds);
    const api = { product, relateds };
    return this.helperService.successResponse({
      message: 'Dữ liệu chi tiết sản phẩm!',
      data: api,
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
