import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from '../repositories/products.repository';
import { HelperService } from '../../helpers/helper.service';

@Injectable()
export class DeleteProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly helperService: HelperService,
  ) {}

  async deleteById(productId: string, sellerId: string) {
    const existing = await this.repository.findOne({ id: productId, sellerId });
    if (!existing) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Sản phẩm không tồn tại!',
        }),
      );
    }
    const deleted = await this.repository.delete(productId, sellerId);

    const { deletedCount } = deleted;
    if (deletedCount == 0) {
      throw new NotFoundException(
        this.helperService.errorResponse({
          message: 'Xóa sản phẩm không thành công!',
        }),
      );
    }

    return true;
  }
}
