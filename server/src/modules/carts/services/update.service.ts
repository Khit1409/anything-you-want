import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CartRepository } from '../repositories/carts.repository';
import { HelperService } from '../../helpers/helper.service';

import { CartDocument } from '../schemas/carts.schema';
import { SharedProductService } from '../../products/services/shared.service';
import { CreateCartDto } from '../dtos/create.dto';

@Injectable()
export class UpdateCartService {
  constructor(
    private readonly repository: CartRepository,
    private readonly helperService: HelperService,
    private readonly sharedProductSerivce: SharedProductService,
  ) {}

  async update(
    existing: CartDocument,
    totalPrice: number,
    quantity: number,
    sku: string,
  ) {
    try {
      existing.totalPrice = totalPrice;
      existing.quantity = quantity;
      existing.sku = sku;
      await existing.save();
      return { message: 'Cập nhật giỏ hàng thành công!', success: true };
    } catch {
      throw new NotFoundException(
        this.helperService.errorResponse({
          message: 'Không cập nhật được giỏ hàng!',
        }),
      );
    }
  }

  async updateOne(id: string, dto: CreateCartDto, userId: string) {
    const cartDoc = await this.repository.findOneById(id, userId);
    if (!cartDoc)
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Không tìm thấy giỏ hàng!',
        }),
      );

    const { optionIds, productId, quantity } = dto;
    const [productInfo, variant] = await Promise.all([
      this.sharedProductSerivce.getInfo(productId),
      this.sharedProductSerivce.getVariantByOptionIds(productId, optionIds),
    ]);

    const { extraPrice, sku } = variant;

    const { price, sale } = productInfo;

    const discountPrice = price - (price * sale) / 100;
    const totalPrice = discountPrice * quantity + extraPrice;

    return await this.update(cartDoc, totalPrice, quantity, sku);
  }
}
