import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ResponseDto } from '../common/dto/response.common.dto';
import { CartRequestDto } from '@/src/modules/carts/dto/carts.request.dto';
import { CartResponseDto } from './dto/carts.response.dto';

import { CartRepository } from './carts.repository';
import { HttpResponse } from '@/src/helpers/httpResponse';
import { ProductRepository } from '../products/products.repository';
import { Cart, CartInfo } from './schemas/carts.schema';

@Injectable()
export class CartService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly repository: CartRepository,
    private readonly httpHelper: HttpResponse,
  ) {}
  /**
   *
   * @param dto
   * @param req
   * @returns
   */
  async addToCart(dto: CartRequestDto, userId: string) {
    const product = await this.productRepository.getProductDetail(
      dto.info.productId,
    );
    if (!product) {
      throw new UnauthorizedException(
        this.httpHelper.error('Product in cart is not define!'),
      );
    }
    const existing = await this.repository.getByProductId(dto.info.productId);

    if (existing) {
      await this.repository.updateExistingCart(existing._id, dto.info.quantity);
      return this.httpHelper.success('carts is updated!');
    }

    const { brand, category, description, name, origin } = product.info;
    const { originPrice, productId, quantity, sale, totalPrice } = dto.info;
    const cartInfoData: CartInfo = {
      brand,
      category,
      description,
      name,
      origin,
      originPrice,
      productId,
      quantity,
      sale,
      totalPrice,
    };

    const cartData: Cart = {
      info: cartInfoData,
      classification: dto.classification,
      images: product.images,
      owner: { ...product.owner, userId },
      shipping: product.shipping,
    };

    const newCart = await this.repository.create(cartData);
    if (!newCart) {
      throw new NotFoundException('Cart is can not created!');
    }
    return this.httpHelper.success('Cart is created!');
  }
  /**
   *
   * @param userId
   */
  async getCart(userId: string): Promise<
    ResponseDto & {
      data: { carts: Array<CartResponseDto> | Array<never> };
    }
  > {
    const carts = await this.repository.getByUser(userId);
    const data = { carts };
    return this.httpHelper.success('Carts api are ready using', data);
  }
  /**
   *
   * @param dto
   */
  // async updateCart(dto: CartUpdateDataRequestDto, uid: string) {
  //   const cart = await this.repository.getOne(dto.id, uid);
  //   if (!cart) {
  //     throw new UnauthorizedException(this.httpHelper.error('Cart not found!'));
  //   }
  //   const product = await this.productRepository.getById(cart.items.product_id);
  //   if (!product) {
  //     throw new UnauthorizedException(
  //       this.httpHelper.error('Product id in cart is not found!'),
  //     );
  //   }
  //   const { variants } = product;
  //   let updateCount = 0;
  //   if (dto.variantOptionChosen) {
  //     const updateOptions = {
  //       ...cart.variant_chosen.options,
  //       ...dto.variantOptionChosen,
  //     };
  //     const newVariantChosen = variants.find((variant) =>
  //       Object.keys(variant.options).every(
  //         (key) => variant.options[key] === updateOptions[key],
  //       ),
  //     );
  //     if (!newVariantChosen) {
  //       throw new NotFoundException(
  //         this.httpHelper.error('Cant find new variant for this cart!'),
  //       );
  //     }
  //     const newOtherVariants = variants.filter(
  //       (variant) => variant.sku !== newVariantChosen.sku,
  //     );
  //     const updatedProductAttribute = await this.repository.updateProductOption(
  //       {
  //         id: dto.id,
  //         newOtherVariants,
  //         newVariantChosen,
  //       },
  //     );
  //     updateCount += updatedProductAttribute.modifiedCount;
  //   }
  //   if (dto.quantity) {
  //     const updatedQuantity = await this.repository.updateQuantity(
  //       dto.id,
  //       dto.quantity,
  //     );
  //     updateCount += updatedQuantity.modifiedCount;
  //   }
  //   const data = { updateCount };
  //   return this.httpHelper.success('Update successfully!', data);
  // }
  /**
   *
   */
  async deleteCart(id: string, uid: string) {
    const result = await this.repository.delete(id, uid);
    if (!result) {
      throw new BadRequestException(
        this.httpHelper.error('Cant not delete this cart!'),
      );
    }
    return this.httpHelper.success('Delete this cart is successfully!');
  }
}
