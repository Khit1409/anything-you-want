import { Injectable, NotFoundException } from '@nestjs/common';
import { CartRepository } from '../repositories/carts.repository';
import { HelperService } from '../../common/services/helper.service';

@Injectable()
export class DeleteCartService {
  constructor(
    private readonly repository: CartRepository,
    private readonly helperService: HelperService,
  ) {}

  async delete(id: string, userId: string) {
    const result = await this.repository.delete(id, userId);
    if (!result) {
      throw new NotFoundException(
        this.helperService.errorResponse({ message: 'Lỗi khi xóa giỏ hàng!' }),
      );
    }

    return result;
  }

  async deleteByProductId(productId: string, userId: string) {
    const { deletedCount } = await this.repository.deleteByProductId(
      productId,
      userId,
    );

    if (deletedCount == 0) {
      throw new NotFoundException(
        this.helperService.errorResponse({ message: 'Lỗi khi xóa giỏ hàng!' }),
      );
    }

    return deletedCount;
  }
}
