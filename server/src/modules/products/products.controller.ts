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
  InternalServerErrorException,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
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

import { UploadService } from '../upload/upload.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly storeService: StoreService,
    private readonly uploadService: UploadService,
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
   *
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'details', maxCount: 10 },
    ]),
  )
  @Post('upload-image')
  async uploadImage(
    @UploadedFiles()
    files: {
      thumbnail: Express.Multer.File[];
      details: Express.Multer.File[];
    },
  ) {
    const { details, thumbnail } = files;
    const [thumbnailUploaded, detailsUploaded] = await Promise.all([
      this.uploadService.uploadImg(thumbnail[0]),
      this.uploadService.uploadManyImg(details),
    ]);
    const message =
      thumbnailUploaded.success && detailsUploaded.success
        ? 'Tải ảnh lên đám mây thành công'
        : !thumbnailUploaded.success
          ? thumbnailUploaded.message
          : detailsUploaded.success;

    const success = thumbnailUploaded.success && detailsUploaded.success;
    const timestamp = new Date().toLocaleDateString('vi-VN');

    if (!success) {
      throw new BadRequestException({ message, success, timestamp });
    }
    const data = {
      thumbnail: thumbnailUploaded.data as { url: string; public_id: string },
      details: detailsUploaded.data as Array<{
        url: string;
        public_id: string;
      }>,
    };
    return { success, message, timestamp, data };
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
    try {
      const sellerId = req.userId;
      const store = await this.storeService.getStoreBySellerId(sellerId);
      const owner = { sellerId, storeId: store.id };

      return await this.productService.createProduct(dto, owner);
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: JSON.stringify(error),
        timestamp: new Date().toLocaleDateString('vi-VN'),
      });
    }
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
