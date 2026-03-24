import {
  Controller,
  Get,
  Query,
  Param,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './products.service';
import {
  CreateProductDto,
  GetProductQueryDto,
} from './dto/products.request.dto';

import type { Request } from 'express';
import { StoreService } from '../stores/stores.service';
import { Roles } from '@/src/common/decorators/role.decorator';
import { Role } from '@/src/common/enums/role.enum';
import { RolesGuard } from '@/src/guards/role.guard';
import { AuthGuard } from '@/src/guards/auth.guard';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly storeService: StoreService,
  ) {}

  /**
   *
   * @param dto
   * @returns
   */
  @HttpCode(200)
  @Get()
  async getProductList(@Query() dto: GetProductQueryDto) {
    return await this.productService.getProductList(dto);
  }
  /**
   *
   * @param id
   * @returns
   */
  @HttpCode(200)
  @Get(':id')
  async getDetail(@Param('id') id: string) {
    return await this.productService.getDetail(id);
  }
  /**
   * Tạo sản phẩm mới, xác thực bằng role guard và trả về http status tương ứng
   * @param dto
   * @param req
   * @returns
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async create(@Body() dto: CreateProductDto, @Req() req: Request) {
    const sellerId = req.userId;
    if (!sellerId) throw new UnauthorizedException('Please login!');
    const store = await this.storeService.getStoreBySellerId(sellerId);
    const owner = { sellerId, storeId: store.id };
    return await this.productService.createProduct(dto, owner);
  }
}
