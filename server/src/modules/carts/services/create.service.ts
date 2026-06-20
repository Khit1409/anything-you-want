import { Injectable } from '@nestjs/common';
import { CartRepository } from '../repositories/carts.repository';
import { CreateCartDto } from '../dtos/create.dto';

import { UpdateCartService } from './update.service';
import { SharedProductService } from '../../products/services/shared.service';

@Injectable()
export class CreateCartService {
  constructor(
    private readonly repository: CartRepository,
    private readonly updateCartService: UpdateCartService,
    private readonly sharedProductService: SharedProductService,
  ) {}

  async create(dto: CreateCartDto, userId: string) {
    const { productId, quantity, optionIds } = dto;

    const [productInfo, productOwner, variant] = await Promise.all([
      this.sharedProductService.getInfo(productId),
      this.sharedProductService.getOwner(productId),
      this.sharedProductService.getVariantByOptionIds(productId, optionIds),
    ]);
    const { extraPrice, sku } = variant;
    const { price, sale } = productInfo;
    const discountPrice = price - (price * sale) / 100;
    const totalPrice = discountPrice * quantity + extraPrice;
    const existing = await this.repository.findOneByProductId(
      productId,
      userId,
    );
    if (existing) {
      return await this.updateCartService.update(
        existing,
        totalPrice,
        quantity,
        sku,
      );
    }

    const owner = { ...productOwner, userId };
    await this.repository.create({
      productId,
      owner,
      quantity,
      totalPrice,
      sku,
    });
    return { message: 'Đã thêm mới giỏ hàng', success: true };
  }
}
