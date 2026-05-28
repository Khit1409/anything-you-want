import {
  Controller,
  Get,
  Query,
  Param,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';

import { Roles } from '@/src/common/decorators/roles.decorator';
import { Role } from '@/src/common/enums/roles.enum';
import { RolesGuard } from '@/src/guards/role.guard';
import { AuthGuard } from '@/src/guards/auth.guard';

import { UploadService } from '../../uploads/upload.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ProductQueryDto } from '../dtos';

import { UploadImageResponse } from '@/src/interfaces/upload.interface';
import { ReadProductService } from '../services/read.service';
import { HelperService } from '../../helpers/helper.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly readService: ReadProductService,
    private readonly uploadService: UploadService,
    private readonly helperService: HelperService,
  ) {}

  /**
   *
   * @param dto
   * @returns
   */
  @HttpCode(200)
  @Get()
  async getProductPreviews(@Query() dto: ProductQueryDto) {
    const api = await this.readService.previews(dto);
    return this.helperService.successResponse({
      message: 'Dữ liệu sản phẩm xem trước',
      data: api,
    });
  }
  /**
   *
   * @param id
   * @returns
   */
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
          : detailsUploaded.message;

    const success = thumbnailUploaded.success && detailsUploaded.success;
    const timestamp = new Date().toLocaleDateString('vi-VN');

    if (!success) {
      throw new BadRequestException(
        this.helperService.errorResponse({ message }),
      );
    }
    const data = {
      thumbnail: thumbnailUploaded.data as UploadImageResponse,
      details: detailsUploaded.data as Array<UploadImageResponse>,
    };

    return { success, message, timestamp, data };
  }
}
