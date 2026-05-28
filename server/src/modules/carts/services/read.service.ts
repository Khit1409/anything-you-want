import { BadRequestException, Injectable } from '@nestjs/common';
import { CartRepository } from '../repositories/carts.repository';
import { HelperService } from '../../helpers/helper.service';
import { ProductSharedService } from '../../products/services/shared.service';
import { CartMapper } from '../mappers/response.mapper';

@Injectable()
export class ReadCartService {
  constructor(
    private readonly repository: CartRepository,
    private readonly helperService: HelperService,
    private readonly mapper: CartMapper,
    private readonly sharedProductService: ProductSharedService,
  ) {}

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

  async list(userId: string) {
    const carts = await this.repository.getManyByUser(userId);
    const api = await Promise.all(
      carts.map(async (cart) => {
        const { info, variant } = cart;
        const productId = info.productId;
        const otherVariants = await this.sharedProductService.getVariants(
          cart.info.productId,
          cart.variant.id,
        );

        const productInfo = await this.sharedProductService.getInfo(productId);
        const productImages =
          await this.sharedProductService.getImages(productId);

        const { name, description, brand, origin, category } = productInfo;

        const data = {
          ...cart,
          info: { name, brand, origin, description, category, ...info },
          variant,
          otherVariants: otherVariants.map((other) => ({
            id: other._id.toString(),
            stock: other.stock,
            extraPrice: other.extraPrice,
            sku: other.sku,
            options: other.options,
          })),
          images: productImages,
        };

        return data;
      }),
    );

    return this.mapper.list(api);
  }
}
