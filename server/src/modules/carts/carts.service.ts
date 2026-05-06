import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ResponseDto } from '../common/dto/response.common.dto';
import {
  CartRequestDto,
  CartUpdateRequestDto,
} from '@/src/modules/carts/dto/carts.request.dto';
import { CartResponseDto } from './dto/carts.response.dto';

import { CartRepository } from './carts.repository';
import { HttpResponse } from '@/src/helpers/httpResponse';
import { ProductRepository } from '../products/products.repository';
import { Cart } from './schemas/carts.schema';
import { HydratedDocument } from 'mongoose';
import { Product } from '../products/schemas/products.schema';
import { plainToInstance } from 'class-transformer';
import { CartClassification } from './schemas/cart-classification.schema';
import { CartInfo } from './schemas/cart-info.schema';

@Injectable()
export class CartService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly repository: CartRepository,
    private readonly httpHelper: HttpResponse,
  ) {}

  caculatorCartTotalPrice(
    originPrice: number,
    sale: number,
    quantity: number,
    classification: CartClassification[],
  ) {
    const totalExtraPrice = classification.reduce((sum, acc) => {
      acc.values.forEach((value) => {
        console.log({
          chosen: value.choosen,
          extraPrice: value.extraPrice,
          type: typeof value.extraPrice,
          sumBefore: sum,
        });

        if (value.choosen) {
          sum += Number(value.extraPrice);
        }

        console.log('after', sum);
      });

      return sum;
    }, 0);

    console.log({
      originPrice,
      sale,
      quantity,
      totalExtraPrice,
    });

    const finalPrice = originPrice - originPrice * (sale / 100);
    return finalPrice * quantity + totalExtraPrice;
  }
  /**
   *
   * @param dto
   * @param req
   * @returns
   */
  async addToCart(dto: CartRequestDto, userId: string) {
    /**
     * Check existing product and existing cart
     * if existing this cart with user
     */
    const product = await this.productRepository.getProductDetail(
      dto.productId,
    );

    if (!product) {
      throw new UnauthorizedException(
        this.httpHelper.error('Product in cart is not define or deleted!'),
      );
    }

    const existing = await this.repository.getByProductId(
      dto.productId,
      userId,
    );

    if (existing) {
      return await this.updateCart(dto, existing, product);
    }

    if (
      dto.classification.length == 0 ||
      dto.classification.length != product.classification.length
    ) {
      throw new BadRequestException(
        'Product has more classification than request sended, please check selected classification!',
      );
    }
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
    const cartClassification: CartClassification[] = [];

    dto.classification.forEach((classificationDto) => {
      const productClassifiNeed = product.classification.find(
        (classifi) => classifi.name === classificationDto.name,
      );
      if (!productClassifiNeed) {
        throw new UnauthorizedException(
          'Classification name form request is not found in product classfication!',
        );
      }
      cartClassification.push({
        name: productClassifiNeed.name,
        values: productClassifiNeed.values.map((clsvl) =>
          clsvl.name === classificationDto.values.name
            ? { ...clsvl, choosen: true }
            : { ...clsvl, choosen: false },
        ),
      });
    });

    if (
      cartClassification.length === 0 ||
      cartClassification.length != product.classification.length
    ) {
      throw new BadRequestException(
        'Proccess handle output data for cart classifications is error because length of output is zero or length not match with product classification length!',
      );
    }

    const { brand, category, description, name, origin, price, sale } =
      product.info;
    /**
     * caculator price for cart.
     */

    const totalPrice = this.caculatorCartTotalPrice(
      price,
      sale,
      dto.quantity,
      cartClassification,
    );
    /**
     * Format cart information.
     */
    const cartInfoData: CartInfo = {
      brand,
      category,
      description,
      name,
      origin,
      originPrice: price,
      productId: dto.productId,
      quantity: dto.quantity,
      sale,
      totalPrice,
    };

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
   * get all cart of user id
   * @param userId
   */
  async getCart(userId: string): Promise<
    ResponseDto & {
      data: { carts: Array<CartResponseDto> | Array<never> };
    }
  > {
    const carts = await this.repository.getByUser(userId);
    const data = { carts: plainToInstance(CartResponseDto, carts) };
    return this.httpHelper.success('Carts api are ready using', data);
  }

  /**
   *
   */
  async getDetail(id: string, userId: string) {
    return await this.repository.getOne(id, userId);
  }
  /**
   * cập nhật giỏ hàng khi người dùng thay đổi 1 số thuộc tính của giỏ hàng có sẵn của
   * giỏ hàng đã được thêm trước đó
   * @param dto
   * @param cartModel
   * @param product
   */
  async updateCart(
    dto: CartUpdateRequestDto,
    cartModel: HydratedDocument<Cart>,
    product: Product,
  ) {
    const { classification, quantity } = dto;
    if (classification) {
      let cartClassification = [...cartModel.classification];

      classification.forEach((classificationDto) => {
        cartClassification = cartClassification.map((cartClassification) =>
          cartClassification.name === classificationDto.name
            ? {
                ...cartClassification,
                values: cartClassification.values.map(
                  (cartClassificationValue) =>
                    cartClassificationValue.name ===
                    classificationDto.values.name
                      ? {
                          name: cartClassificationValue.name,
                          extraPrice: cartClassificationValue.extraPrice,
                          stock: cartClassificationValue.stock,
                          img: cartClassificationValue.img,
                          choosen: true,
                        }
                      : {
                          name: cartClassificationValue.name,
                          extraPrice: cartClassificationValue.extraPrice,
                          stock: cartClassificationValue.stock,
                          img: cartClassificationValue.img,
                          choosen: false,
                        },
                ),
              }
            : cartClassification,
        );
      });

      if (
        cartClassification.length !== product.classification.length ||
        cartClassification.length == 0
      ) {
        throw new BadRequestException(
          'Proccess handle output data for cart classifications is error because length of output is zero or length not match with product classification length!',
        );
      }
      if (!quantity) {
        const { originPrice, sale, quantity } = cartModel.info;
        cartModel.info.totalPrice = this.caculatorCartTotalPrice(
          originPrice,
          sale,
          quantity,
          cartClassification,
        );
      }
      cartModel.classification = cartClassification;
    }

    if (quantity) {
      const { price, sale } = product.info;
      cartModel.info.quantity = quantity;
      cartModel.info.totalPrice = this.caculatorCartTotalPrice(
        price,
        sale,
        quantity,
        cartModel.classification,
      );
    }

    const updated = await cartModel.save();

    if (!updated) {
      throw new BadRequestException('Updated cart failed');
    }
    return this.httpHelper.success('carts is updated!');
  }
  /**
   * Cập nhật giỏ hàng cụ thể qua id trong param request.
   * @param id
   * @param uid
   * @param dto
   */
  async updateCartDetail(id: string, uid: string, dto: CartUpdateRequestDto) {
    const cartModel = await this.getDetail(id, uid);

    if (!cartModel) {
      throw new UnauthorizedException('Cart is not define!');
    }

    const product = await this.productRepository.getProductDetail(
      cartModel.info.productId,
    );
    if (!product) {
      throw new BadRequestException('Product is not found!');
    }
    return await this.updateCart(dto, cartModel, product);
  }
  /**
   * xóa giỏ hàng bằng id và id người dùng.
   * @param id
   * @param uid
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
