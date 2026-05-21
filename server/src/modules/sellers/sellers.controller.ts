import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SellerService } from './sellers.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import type { Request } from 'express';
import { Role } from '@/src/common/enums/roles.enum';
import { Roles } from '@/src/common/decorators/roles.decorator';
import { RolesGuard } from '@/src/guards/role.guard';
import { AuthGuard } from '@/src/guards/auth.guard';
import { ProductService } from '../products/products.service';
import { GetProductQueryDto } from '../products/dto/products.request.dto';

@Controller('sellers')
export class SellerController {
  constructor(
    private readonly service: SellerService,
    private readonly productService: ProductService,
  ) {}

  // ============================================================================
  // CREATE ENDPOINTS
  // ============================================================================

  /**
   * Đăng ký người bán mới
   * @param dto - Dữ liệu đăng ký (thông tin cá nhân, cửa hàng, mật khẩu)
   * @returns Response thông báo đăng ký thành công
   */
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() dto: CreateSellerDto) {
    return await this.service.createSeller(dto);
  }

  // ============================================================================
  // READ ENDPOINTS
  // ============================================================================

  /**
   * Lấy hồ sơ người bán hiện tại (yêu cầu xác thực)
   * @param req - Request object chứa userId
   * @returns Response chứa thông tin hồ sơ người bán
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    const id = req.userId;
    return await this.service.getSellerProfile(id);
  }

  /**
   * Lấy danh sách sản phẩm của người bán (yêu cầu xác thực)
   * @param query - Query parameters (limit, page)
   * @param req - Request object chứa userId
   * @returns Response chứa danh sách sản phẩm của người bán
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @Get('products')
  async getProductList(
    @Query() query: GetProductQueryDto,
    @Req() req: Request,
  ) {
    const sellerId = req.userId;
    await this.service.checkExistingSeller(sellerId);
    return await this.productService.getProductListBySeller(sellerId, query);
  }

  /**
   * Lấy chi tiết sản phẩm của người bán (yêu cầu xác thực)
   * @param id - ID của sản phẩm
   * @param req - Request object chứa userId
   * @returns Response chứa chi tiết sản phẩm
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @Get('products/:id')
  async getProductDetail(@Param('id') id: string, @Req() req: Request) {
    const sellerId = req.userId;
    return await this.productService.getProductDetailBySeller(sellerId, id);
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
  @Delete('products/:id')
  async deleteProduct(@Param('id') id: string, @Req() req: Request) {
    const sellerId = req.userId;
    return await this.productService.deleteProduct(sellerId, id);
  }
}
