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
import { CartInfo } from './schemas/cart-info.schema';

@Injectable()
export class CartService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly repository: CartRepository,
    private readonly httpHelper: HttpResponse,
  ) {}

  // ============================================================================
  // HELPER / UTILITY METHODS
  // ============================================================================

  /**
   * Tính toán tổng giá của sản phẩm trong giỏ hàng
   * Công thức: (giá gốc - giảm giá) * số lượng + giá thêm biến thể
   * @param originPrice - Giá gốc của sản phẩm
   * @param sale - Phần trăm giảm giá (0-100)
   * @param quantity - Số lượng sản phẩm
   * @param variantPrice - Giá thêm của biến thể
   * @returns Tổng giá sau khi tính toán
   */
  calculateCartTotalPrice(
    originPrice: number,
    sale: number,
    quantity: number,
    variantPrice: number,
  ): number {
    const finalPrice = originPrice - originPrice * (sale / 100);
    return finalPrice * quantity + variantPrice;
  }

  // ============================================================================
  // CREATE OPERATIONS
  // ============================================================================

  /**
   * Thêm sản phẩm vào giỏ hàng
   * Nếu sản phẩm đã có trong giỏ, sẽ cập nhật thay vì thêm mới
   * @param dto - Dữ liệu yêu cầu chứa productId, variant, quantity
   * @param userId - ID của người dùng
   * @returns Response thông báo thành công
   * @throws UnauthorizedException nếu sản phẩm không tồn tại hoặc bị xóa
   * @throws BadRequestException nếu biến thể không tồn tại hoặc không thể tạo giỏ
   */
  async addToCart(dto: CartRequestDto, userId: string) {
    // Kiểm tra sản phẩm có tồn tại không
    const product = await this.productRepository.getProductDetail(
      dto.productId,
    );

    if (!product) {
      throw new UnauthorizedException(
        this.httpHelper.error('Product in cart is not define or deleted!'),
      );
    }

    // Kiểm tra giỏ hàng hiện tại đã có sản phẩm này chưa
    const existing = await this.repository.getByProductId(
      dto.productId,
      userId,
    );

    // Nếu có rồi, cập nhật thay vì thêm mới
    if (existing) {
      return await this.updateCart(dto, existing, product);
    }

    // Kiểm tra biến thể của sản phẩm có tồn tại không
    const variant = product.variants.find((f) => f.sku === dto.variant);
    if (!variant) {
      throw new BadRequestException(
        this.httpHelper.error('Không tìm thấy biến thể của sản phẩm!'),
      );
    }

    const { brand, category, description, name, origin, price, sale } =
      product.info;

    // Tính toán giá giỏ hàng
    const totalPrice = this.calculateCartTotalPrice(
      price,
      sale,
      dto.quantity,
      variant.extraPrice,
    );

    // Định dạng thông tin giỏ hàng
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

    // Chuẩn bị dữ liệu giỏ hàng
    const cartData: Cart = {
      info: cartInfoData,
      variant,
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

  // ============================================================================
  // READ OPERATIONS
  // ============================================================================

  /**
   * Lấy tất cả sản phẩm trong giỏ hàng của người dùng
   * @param userId - ID của người dùng
   * @returns Response chứa danh sách giỏ hàng (mảng rỗng nếu chưa có sản phẩm)
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
   * Lấy chi tiết một sản phẩm trong giỏ hàng
   * @param id - ID của giỏ hàng
   * @param userId - ID của người dùng (để đảm bảo quyền sở hữu)
   * @returns Thông tin chi tiết giỏ hàng
   */
  async getDetail(
    id: string,
    userId: string,
  ): Promise<HydratedDocument<Cart> | null> {
    return await this.repository.getOne(id, userId);
  }

  // ============================================================================
  // UPDATE OPERATIONS
  // ============================================================================

  /**
   * Cập nhật thông tin giỏ hàng (số lượng, biến thể)
   * Tính toán lại tổng giá dựa trên thông tin mới
   * @param dto - Dữ liệu cập nhật (variant, quantity)
   * @param cartModel - Document giỏ hàng cần cập nhật
   * @param product - Thông tin sản phẩm để lấy chi tiết biến thể
   * @returns Response thông báo cập nhật thành công
   * @throws BadRequestException nếu biến thể không tồn tại hoặc cập nhật thất bại
   */
  async updateCart(
    dto: CartUpdateRequestDto,
    cartModel: HydratedDocument<Cart>,
    product: Product,
  ) {
    const { variant, quantity } = dto;

    // Sử dụng số lượng mới hoặc giữ nguyên nếu không cập nhật
    const newQuantity = quantity ?? cartModel.info.quantity;

    // Xác định biến thể mới
    const newVariant = () => {
      if (variant) {
        const productVariant = product.variants.find((f) => f.sku === variant);
        if (!productVariant) {
          throw new BadRequestException(
            this.httpHelper.error('Biến thể sản phẩm không tồn tại!'),
          );
        }
        return productVariant;
      }
      return cartModel.variant;
    };

    const newCartVariant = newVariant();
    const { originPrice, sale } = cartModel.info;

    // Cập nhật tổng giá
    cartModel.info.totalPrice = this.calculateCartTotalPrice(
      originPrice,
      sale,
      newQuantity,
      newCartVariant.extraPrice,
    );

    cartModel.variant = newCartVariant;
    cartModel.info.quantity = newQuantity;

    const updated = await cartModel.save();

    if (!updated) {
      throw new BadRequestException('Updated cart failed');
    }

    return this.httpHelper.success('carts is updated!');
  }

  /**
   * Cập nhật giỏ hàng cụ thể qua ID
   * Lấy thông tin giỏ hàng, xác thực quyền sở hữu, sau đó cập nhật
   * @param id - ID của giỏ hàng cần cập nhật
   * @param userId - ID của người dùng (xác thực quyền sở hữu)
   * @param dto - Dữ liệu cập nhật (variant, quantity)
   * @returns Response thông báo cập nhật thành công
   * @throws UnauthorizedException nếu người dùng không sở hữu giỏ hàng
   * @throws BadRequestException nếu sản phẩm không tồn tại
   */
  async updateCartDetail(
    id: string,
    userId: string,
    dto: CartUpdateRequestDto,
  ) {
    const cartModel = await this.getDetail(id, userId);

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

  // ============================================================================
  // DELETE OPERATIONS
  // ============================================================================

  /**
   * Xóa một sản phẩm khỏi giỏ hàng
   * @param id - ID của giỏ hàng cần xóa
   * @param userId - ID của người dùng (xác thực quyền sở hữu)
   * @returns Response thông báo xóa thành công
   * @throws BadRequestException nếu xóa thất bại
   */
  async deleteCart(id: string, userId: string) {
    const result = await this.repository.delete(id, userId);

    if (!result) {
      throw new BadRequestException(
        this.httpHelper.error('Cant not delete this cart!'),
      );
    }

    return this.httpHelper.success('Delete this cart is successfully!');
  }
}
