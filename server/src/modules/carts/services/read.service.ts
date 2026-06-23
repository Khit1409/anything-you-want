import { BadRequestException, Injectable } from '@nestjs/common';
import { CartRepository } from '../repositories/carts.repository';
import { HelperService } from '../../helpers/helper.service';
import { SharedProductService } from '../../products/services/shared.service';

@Injectable()
export class ReadCartService {
  constructor(
    private readonly repository: CartRepository,
    private readonly helperService: HelperService,
    private readonly sharedProductService: SharedProductService,
  ) {}

  async all(userId: string) {
    const carts = await this.repository.getManyByUser(userId);
    return await Promise.all(
      carts.map(async (cart) => {
        const { product, _id, createdAt, updatedAt } = cart;
        const { productId, quantity, sku } = product;
        const item = await this.sharedProductService.getProductCart(productId);
        const { thumbnail, price, name, sale } = item;
        const { extraPrice } = await this.sharedProductService.getVariantBySku(
          productId,
          sku,
        );
        const discounted = price - (price * sale) / 100;
        const totalPrice = discounted * quantity + extraPrice;
        return {
          _id,
          product: {
            ...product,
            thumbnail,
            price,
            totalPrice,
            sale,
            discounted,
            name,
            quantity,
            sku,
          },
          createdAt,
          updatedAt,
        };
      }),
    );
  }

  async detail(id: string, userId: string) {
    const cart = await this.repository.getOneById(id, userId);
    if (!cart) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Giỏ hàng không tồn tại!',
        }),
      );
    }
    return cart;
  }
}
