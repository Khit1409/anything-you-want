import { BadRequestException, Injectable } from '@nestjs/common';
import { CartRepository } from '../repositories/carts.repository';
import { HelperService } from '../../helpers/helper.service';
import { SharedProductService } from '../../products/services/shared.service';
import { CartMapper } from '../mappers/response.mapper';
import { HelperProductService } from '../../products/services/helper.service';

@Injectable()
export class ReadCartService {
  constructor(
    private readonly repository: CartRepository,
    private readonly helperService: HelperService,
    private readonly mapper: CartMapper,
    private readonly sharedProductService: SharedProductService,
    private readonly helperProductService: HelperProductService,
  ) {}

  async all(userId: string) {
    const carts = await this.repository.getManyByUser(userId);
    return await Promise.all(
      carts.map(async (cart) => {
        const { productId } = cart;
        const { thumbnail } =
          await this.sharedProductService.getImages(productId);
        return {
          ...cart,
          products: await this.sharedProductService.getInfo(productId),
          thumbnail,
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
