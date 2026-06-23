import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CartRepository } from '../repositories/carts.repository';
import { HelperService } from '../../helpers/helper.service';
import { CartDocument } from '../schemas/carts.schema';
import { CreateCartDto } from '../dtos/create.dto';

@Injectable()
export class UpdateCartService {
  constructor(
    private readonly repository: CartRepository,
    private readonly helperService: HelperService,
  ) {}

  async update(existing: CartDocument, quantity: number, sku: string) {
    try {
      existing.product.quantity = quantity;
      existing.product.sku = sku;
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

    const { sku, quantity } = dto;

    return await this.update(cartDoc, quantity, sku);
  }
}
