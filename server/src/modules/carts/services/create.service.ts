import { Injectable } from '@nestjs/common';
import { CartRepository } from '../repositories/carts.repository';
import { CreateCartDto } from '../dtos/create.dto';

import { UpdateCartService } from './update.service';
import { ProductSharedService } from '../../products/services/shared.service';
import { calculateCartTotalPrice } from '../helpers/cart.helper';

@Injectable()
export class CreateCartService {
  constructor(
    private readonly repository: CartRepository,
    private readonly updateCartService: UpdateCartService,
    private readonly sharedProductService: ProductSharedService,
  ) {}

  async create(dto: CreateCartDto, userId: string) {
    const { productId, quantity, variant } = dto;

    const existing = await this.repository.findOneByProductId(
      productId,
      userId,
    );

    if (existing) {
      return await this.updateCartService.update(existing, dto);
    }

    const varaint = await this.sharedProductService.getVariant(
      productId,
      variant,
    );

    const { _id, extraPrice, options, sku, stock } = varaint;
    const variantInsert = {
      id: _id.toString(),
      options,
      sku,
      stock,
      extraPrice,
    };

    const productInfo = await this.sharedProductService.getInfo(productId);
    const { price, sale } = productInfo;
    const infoInsert = {
      originPrice: price,
      sale,
      totalPrice: calculateCartTotalPrice({
        originPrice: price,
        quantity,
        sale,
        variantPrice: variantInsert.extraPrice,
      }),
      quantity,
      productId,
    };

    const productOwner = await this.sharedProductService.getOwner(productId);
    const ownerInsert = {
      userId,
      ...productOwner,
    };

    return await this.repository.create({
      info: infoInsert,
      owner: ownerInsert,
      variant: variantInsert,
    });
  }
}
