import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/products.repository';
import { VariantUpdateDto } from '../dtos';
import { HelperService } from '../../helpers/helper.service';
import { ProductStatus } from '../schemas/products.schema';

@Injectable()
export class UpdateProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly helperService: HelperService,
  ) {}

  async updateVariants(productId: string, variantUpdates: VariantUpdateDto[]) {
    console.log(variantUpdates);
    const product = await this.repository.findOne({ id: productId });
    if (!product) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Sản phẩm không tồn tại!',
        }),
      );
    }
    const oldVariants = product.variants;
    const checkCorrects = variantUpdates.filter(
      (variant) =>
        !oldVariants.some((vari) => vari._id.toString() === variant.id),
    );
    if (checkCorrects.length > 0) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: `Không tìm thấy các variant: ${checkCorrects.map((v) => v.id).join(', ')}`,
        }),
      );
    }

    product.variants = product.variants.map((variant) => {
      const updated = { ...variant };
      variantUpdates.forEach((update) => {
        if (variant._id.equals(update.id)) {
          updated.extraPrice = update.extraPrice ?? 0;
          updated.stock = update.stock ?? updated.stock;
        }
      });
      return updated;
    });

    product.status = ProductStatus.ACTIVE;

    await product.save();

    return true;
  }
}
