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
    const { productId, quantity, sku } = dto;

    const productOwner = await this.sharedProductService.getOwner(productId);

    const existing = await this.repository.findOneByProductId(
      productId,
      userId,
    );
    if (existing) {
      return await this.updateCartService.update(existing, quantity, sku);
    }
    const { sellerId, storeId } = productOwner;
    const owner = { sellerId, storeId, userId };
    const product = { quantity, sku, productId };
    await this.repository.create({
      product,
      owner,
    });
    return { message: 'Đã thêm mới giỏ hàng', success: true };
  }
}
