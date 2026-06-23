import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReadStoreService } from '../../stores/services/read.service';
import { RolesGuard } from '@/src/guards/role.guard';
import { Role } from '@/src/common/enums/roles.enum';
import { Roles } from '@/src/common/decorators/roles.decorator';
import {
  CreateProductDto,
  ProductQueryDto,
  UpdateProductDto,
} from '../../products/dtos';
import { AuthGuard } from '@/src/guards/auth.guard';
import type { Request } from 'express';
import { ReadProductService } from '../../products/services/read.service';
import { DeleteProductService } from '../../products/services/delete.service';
import { UpdateProductService } from '../../products/services/update.service';
import { CreateProductService } from '../../products/services/create.service';
import { HelperService } from '../../helpers/helper.service';
import { HelperSellerService } from '../services/helper.service';

@Controller('sellers/products')
export class SellerProductController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly updateProductService: UpdateProductService,
    private readonly deleteProductService: DeleteProductService,
    private readonly readProductService: ReadProductService,
    private readonly readStoreService: ReadStoreService,
    private readonly helperService: HelperService,
    private readonly helperSellerService: HelperSellerService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @Get('')
  async getProductList(@Query() query: ProductQueryDto, @Req() req: Request) {
    const sellerId = req.userId;
    await this.helperSellerService.checkExistingById(sellerId);
    const api = await this.readProductService.previewForSeller(query, sellerId);

    return this.helperService.successResponse({
      message: 'Danh sách sản phẩm của seller!',
      data: api,
    });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @Get(':productId')
  async getProductDetail(
    @Param('productId') productId: string,
    @Req() req: Request,
  ) {
    const sellerId = req.userId;
    const api = await this.readProductService.detailForSeller(
      productId,
      sellerId,
    );
    return this.helperService.successResponse({
      message: 'Chi tiết sản phẩm của seller!',
      data: api,
    });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @Delete(':productId')
  async deleteProduct(
    @Param('productId') productId: string,
    @Req() req: Request,
  ) {
    const sellerId = req.userId;
    const isDeleted = await this.deleteProductService.deleteById(
      productId,
      sellerId,
    );

    return this.helperService.successResponse({
      message: 'Xóa sản phẩm thành công!',
      data: { isDeleted },
    });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @Post('')
  async createProduct(@Body() dto: CreateProductDto, @Req() req: Request) {
    try {
      const sellerId = req.userId;
      const store = await this.readStoreService.getBySellerId(sellerId);
      const owner = { sellerId, storeId: store.id };
      const resultData = await this.createProductService.create(dto, owner);
      return this.helperService.successResponse({
        message: 'Tạo mới sản phẩm thành công vui lòng cập nhật tiếp tục!',
        data: resultData,
      });
    } catch (error) {
      console.log(error);
      throw new NotFoundException({
        success: false,
        message: JSON.stringify(error),
        timestamp: new Date().toLocaleDateString('vi-VN'),
      });
    }
  }
  /**
   *
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @Put(':productId')
  async updateProduct(
    @Param('productId') productId: string,
    @Body() dto: UpdateProductDto,
    @Req() req: Request,
  ) {
    const { userId } = req;
    await this.updateProductService.update(dto, productId, userId);
    return this.helperService.successResponse({
      message:
        'Cập nhật sản phẩm thành công, vui lòng kiểm tra lại dữ liệu mới!',
    });
  }
}
