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
    const userId = req.userId;
    const carts = await this.readService.all(userId);
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
  async create(@Req() req: Request, @Body() dto: CreateCartDto) {
    const userId = req.userId;
    const { message, success } = await this.createService.create(dto, userId);
    return this.helperService.responseConfig({
      message,
      success,
    });
  }

  @HttpCode(200)
  @Put(':id')
  async updateOne(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() dto: CreateCartDto,
  ) {
    const { userId } = req;
    const { message, success } = await this.updateService.updateOne(
      id,
      dto,
      userId,
    );
    return this.helperService.responseConfig({ message, success });
  }

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
