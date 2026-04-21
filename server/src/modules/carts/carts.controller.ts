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
import { CartService } from './carts.service';
import { CartRequestDto, CartUpdateRequestDto } from './dto/carts.request.dto';
import type { Request } from 'express';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @HttpCode(200)
  @Get()
  async getCart(@Req() req: Request) {
    const uid = req.userId;
    return await this.cartService.getCart(uid);
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
  async addToCart(@Req() req: Request, @Body() dto: CartRequestDto) {
    const userId = req.userId;
    return await this.cartService.addToCart(dto, userId);
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
    @Body() dto: CartUpdateRequestDto,
  ) {
    const userId = req.userId;
    return await this.cartService.updateCartDetail(id, userId, dto);
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
    return await this.cartService.deleteCart(id, uid);
  }
}
