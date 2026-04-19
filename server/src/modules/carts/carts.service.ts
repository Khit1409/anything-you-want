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
import { Cart, CartClassification, CartInfo } from './schemas/carts.schema';

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
    /**
     * Check existing product and existing cart
     * if existing this cart with use
     */
    const product = await this.productRepository.getProductDetail(
      dto.productId,
    );
    if (!product) {
      throw new UnauthorizedException(
        this.httpHelper.error('Product in cart is not define!'),
      );
    }
    const existing = await this.repository.getByProductId(
      dto.productId,
      userId,
    );

    if (existing) {
      await this.repository.updateExistingCart(existing._id, dto.quantity);
      return this.httpHelper.success('carts is updated!');
    }

    if (
      dto.classification.length == 0 ||
      dto.classification.length != product.classification.length
    ) {
      throw new BadRequestException(
        'Product has more classification than request sended, please check selected classification!',
      );
    }

    const { brand, category, description, name, origin } = product.info;
    /**
     * caculator price for cart.
     */
    const originPrice = product.info.price;
    const sale = product.info.sale;
    const finalPrice = originPrice - originPrice * (sale / 100);
    const totalPrice = finalPrice * dto.quantity;
    /**
     * Format cart information.
     */
    const cartInfoData: CartInfo = {
      brand,
      category,
      description,
      name,
      origin,
      originPrice,
      productId: dto.productId,
      quantity: dto.quantity,
      sale,
      totalPrice,
    };
    /**
     * Thay vì tốn thời gian để đọc và tối ưu hàm này tôi nghĩ bạn nên dùng thời gian đó để viết 1 hàm mới dễ nhìn hơn, chân thành cảm ơn
     * Nội dung đoạn reduce là tạo 1 classification cho cart thông qua các request trong classification, chọn lựa các value đã được
     * user chọn để thêm property choosen:true vào
     */
    if (product.classification.length != dto.classification.length) {
      throw new BadRequestException(
        'Lenght of classification in request is not match with lenght of product classification in database!',
      );
    }
    /**
     * Chuyển các classification value của product có classification name bằng với classification name từ client
     * gửi lên, thêm thuộc tính choosen true hoặc false tương ứng với các value được chọn từ client.
     */
    const cartClassification = dto.classification.reduce(
      (result: CartClassification[], classifiDto) => {
        product.classification.forEach((productClassifi) => {
          if (productClassifi.name === classifiDto.name) {
            const classifiValues = productClassifi.values.map(
              (productClassifiValue) =>
                productClassifiValue.name === classifiDto.values.name
                  ? { ...productClassifiValue, choosen: true }
                  : { ...productClassifiValue, choosen: false },
            );
            result.push({ ...productClassifi, values: classifiValues });
          }
        });
        return result;
      },
      [],
    );

    if (cartClassification.length === 0) {
      throw new BadRequestException(
        'Proccess handle output data for cart classifications is error because lenght of output is zero!',
      );
    }

    /**
     * Finished handle output data for cart.
     */
    const cartData: Cart = {
      info: cartInfoData,
      classification: cartClassification,
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
