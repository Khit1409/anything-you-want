import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/products.repository';
import { HelperService } from '../../helpers/helper.service';
import { ProductVariant } from '../schemas/product-variant.schema';

@Injectable()
export class SharedProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly helperService: HelperService,
  ) {}

  private checkValue<T>(value: T | null | undefined, message: string): T {
    if (!value) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message,
        }),
      );
    }

    return value;
  }

  async getImages(productId: string) {
    const images = await this.repository.getImage(productId);

    return this.checkValue(images, 'Hình ảnh sản phẩm không tìm thấy');
  }

  async getVariants(
    productId: string,
    filterId?: string,
  ): Promise<ProductVariant[]> {
    const variants = await this.repository.getVariants(productId);
    if (filterId) {
      if (!variants)
        throw new BadRequestException(
          this.helperService.errorResponse({
            message: 'Biến thể không tìm thấy không thể lọc!',
          }),
        );
      return variants.filter((ft) => !ft._id.equals(filterId));
    }

    return this.checkValue(variants, 'Biến thể sản phẩm không tìm thấy');
  }

  async getVariant(productId: string, variantId: string) {
    const variant = await this.repository.getOneVariantById(
      productId,
      variantId,
    );
    return this.checkValue(variant, 'Biến thể sản phẩm không tìm thấy');
  }

  async getVariantByOptionIds(productId: string, optionIds: string[]) {
    const variant = await this.repository.getOnVariantByOptionIds(
      productId,
      optionIds,
    );
    return this.checkValue(
      variant,
      'Không tìm thấy biến thể phù hợp với lựa chọn!',
    );
  }

  async getStatus(productId: string) {
    const status = await this.repository.getStatus(productId);
    return this.checkValue(status, 'Trạng thái sản phẩm không tìm thấy');
  }

  async getShipping(productId: string) {
    const shipping = await this.repository.getShipping(productId);
    return this.checkValue(shipping, 'Thông tin vận chuyển không tìm thấy');
  }

  async getClassifications(productId: string) {
    const classifications = await this.repository.getClassifications(productId);
    return this.checkValue(
      classifications,
      'Phân loại sản phẩm không tìm thấy',
    );
  }

  async getInfo(productId: string) {
    const info = await this.repository.getInfo(productId);
    return this.checkValue(info, 'Thông tin sản phẩm không tìm thấy');
  }

  async getCategory(productId: string) {
    const category = await this.repository.getCategory(productId);
    return this.checkValue(category, 'Danh mục sản phẩm không tìm thấy');
  }

  async getOwner(productId: string) {
    const owner = await this.repository.getOwnerById(productId);
    return this.checkValue(owner, 'Chủ sản phẩm không tìm thấy');
  }
}
