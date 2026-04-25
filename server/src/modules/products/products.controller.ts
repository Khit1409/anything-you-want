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
  UseGuards,
  Put,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { GetProductQueryDto } from './dto/products.request.dto';

import type { Request } from 'express';
import { StoreService } from '../stores/stores.service';
import { Roles } from '@/src/common/decorators/roles.decorator';
import { Role } from '@/src/common/enums/roles.enum';
import { RolesGuard } from '@/src/guards/role.guard';
import { AuthGuard } from '@/src/guards/auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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
    const store = await this.storeService.getStoreBySellerId(sellerId);
    const owner = { sellerId, storeId: store.id };
    return await this.productService.createProduct(dto, owner);
  }
  /**
   * Cập nhật sản phẩm
   * @param id
   * @param dto
   * @param req
   * @returns
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @HttpCode(HttpStatus.CREATED)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
    @Req() req: Request,
  ) {
    const sellerId = req.userId;
    return await this.productService.updateProduct(id, dto, sellerId);
  }
}
