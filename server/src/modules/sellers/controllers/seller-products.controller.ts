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
  UpdateVariantDto,
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
  /**
   * Lấy danh sách sản phẩm của người bán (yêu cầu xác thực)
   * @param query - Query parameters (limit, page)
   * @param req - Request object chứa userId
   * @returns Response chứa danh sách sản phẩm của người bán
   */
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

  /**
   * Lấy chi tiết sản phẩm của người bán (yêu cầu xác thực)
   * @param id - ID của sản phẩm
   * @param req - Request object chứa userId
   * @returns Response chứa chi tiết sản phẩm
   */
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

  // ============================================================================
  // DELETE ENDPOINTS
  // ============================================================================

  /**
   * Xóa sản phẩm của người bán (yêu cầu xác thực)
   * @param id - ID của sản phẩm cần xóa
   * @param req - Request object chứa userId
   * @returns Response thông báo xóa thành công
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @Delete(':productId')
  async deleteProduct(
    @Param('productId') productId: string,
    @Req() req: Request,
  ) {
    const sellerId = req.userId;
    const result = await this.deleteProductService.deleteById(
      productId,
      sellerId,
    );

    return this.helperService.successResponse({
      message: 'Xóa sản phẩm thành công!',
      data: { result },
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
  @Put(':productId/variants')
  async updateVariants(
    @Param('productId') productId: string,
    @Body() dto: UpdateVariantDto,
  ) {
    const { variants } = dto;

    await this.updateProductService.updateVariants(productId, variants);

    return this.helperService.successResponse({
      message: 'Cập nhật biến thể thành công!',
    });
  }
  /**
   *
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @Get(':productId/variants')
  async getVariantUpdate(
    @Param('productId') productId: string,
    @Req() req: Request,
  ) {
    const sellerId = req.userId;
    const api = await this.readProductService.variantForEdit(
      productId,
      sellerId,
    );

    return this.helperService.successResponse({
      message: 'Dữ liệu danh sách biến thể!',
      data: api,
    });
  }
}
