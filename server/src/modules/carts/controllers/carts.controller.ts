import {
  Body,
  Controller,
  Get,
  HttpCode,
  Delete,
  Post,
  Req,
  Param,
  Put,
} from '@nestjs/common';
import { UpdateCartDto } from '../dtos/request.dto';
import { CreateCartDto } from '../dtos/create.dto';
import type { Request } from 'express';
import { ReadCartService } from '../services/read.service';
import { UpdateCartService } from '../services/update.service';
import { DeleteCartService } from '../services/delete.service';
import { CreateCartService } from '../services/create.service';
import { HelperService } from '../../helpers/helper.service';

@Controller('carts')
export class CartController {
  constructor(
    private readonly readService: ReadCartService,
    private readonly updateService: UpdateCartService,
    private readonly deleteService: DeleteCartService,
    private readonly createService: CreateCartService,
    private readonly helperService: HelperService,
  ) {}

  @HttpCode(200)
  @Get()
  async getCart(@Req() req: Request) {
    const uid = req.userId;
    const carts = await this.readService.list(uid);
    return this.helperService.successResponse({
      message: 'Danh sách giỏ hàng!',
      data: carts,
    });
  }
  /**
   *
   * @param req
   * @param dto
   * @param res
   * @returns
   */
  @HttpCode(201)
  @Post()
  async addToCart(@Req() req: Request, @Body() dto: CreateCartDto) {
    const userId = req.userId;
    const result = await this.createService.create(dto, userId);
    if (typeof result === 'number') {
      return this.helperService.successResponse({
        message: 'Cập nhật thành công!',
        data: { result },
      });
    }
    return this.helperService.successResponse({
      message: 'Đã thêm mới giỏ hàng!',
    });
  }
  /**
   *
   * @param req
   * @param dto
   * @param res
   * @returns
   */
  @HttpCode(200)
  @Put(':id')
  async updateCartDetail(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() dto: UpdateCartDto,
  ) {
    const userId = req.userId;
    const result = await this.updateService.updateOne(id, userId, dto);
    return this.helperService.successResponse({
      message: 'Đã cập nhật giỏ hàng!',
      data: { result },
    });
  }
  /**
   *
   * @param id
   * @param req
   * @returns
   */
  @HttpCode(200)
  @Delete(':id')
  async deleteCart(@Param('id') id: string, @Req() req: Request) {
    const uid = req.userId;
    const result = await this.deleteService.delete(id, uid);
    return this.helperService.successResponse({
      message: 'Đã xóa thành công giỏ hàng!',
      data: { result },
    });
  }
}
