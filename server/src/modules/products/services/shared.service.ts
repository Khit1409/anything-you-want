import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/products.repository';
import { ProductVariant } from '../schemas/product-variant.schema';
import { HelperProductService } from './helper.service';
import { SharedOrderPartParams } from '../interfaces/shared.interface';
import { HelperService } from '../../helpers/helper.service';

@Injectable()
export class SharedProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly helperProductService: HelperProductService,
    private readonly helperService: HelperService,
  ) {}

  async getImages(productId: string) {
    const images = await this.repository.getImage(productId);
    return this.helperProductService.checkExistingValue(
      images,
      'Hình ảnh sản phẩm không tìm thấy',
    );
  }

  async getVariants(
    productId: string,
    filterId?: string,
  ): Promise<ProductVariant[]> {
    const variantDocs = await this.repository.getVariants(productId);
    const variants = this.helperProductService.checkExistingValue(
      variantDocs,
      'Biến thể không tồn tại!',
    );
    if (filterId) {
      return variants.filter((ft) => !ft._id.equals(filterId));
    }
    return this.helperProductService.checkExistingValue(
      variants,
      'Biến thể sản phẩm không tìm thấy',
    );
  }

  async getVariant(productId: string, variantId: string) {
    const variant = await this.repository.getOneVariantById(
      productId,
      variantId,
    );
    return this.helperProductService.checkExistingValue(
      variant,
      'Biến thể sản phẩm không tìm thấy',
    );
  }

  async getVariantByOptionIds(productId: string, optionIds: string[]) {
    const variant = await this.repository.getOneVariantByOptionIds(
      productId,
      optionIds,
    );
    return this.helperProductService.checkExistingValue(
      variant,
      'Không tìm thấy biến thể phù hợp với lựa chọn!',
    );
  }

  async getVariantBySku(productId: string, sku: string) {
    const variant = await this.repository.getOneVariantBySku(productId, sku);
    return this.helperProductService.checkExistingValue(
      variant,
      'Không tìm thấy biến thể trên!',
    );
  }

  async getStatus(productId: string) {
    const status = await this.repository.getStatus(productId);
    return this.helperProductService.checkExistingValue(
      status,
      'Trạng thái sản phẩm không tìm thấy',
    );
  }

  async getShipping(productId: string) {
    const shipping = await this.repository.getShipping(productId);
    return this.helperProductService.checkExistingValue(
      shipping,
      'Thông tin vận chuyển không tìm thấy',
    );
  }

  async getClassifications(productId: string) {
    const classifications = await this.repository.getClassifications(productId);
    return this.helperProductService.checkExistingValue(
      classifications,
      'Phân loại sản phẩm không tìm thấy',
    );
  }

  async getInfo(productId: string) {
    const info = await this.repository.getInfo(productId);
    return this.helperProductService.checkExistingValue(
      info,
      'Thông tin sản phẩm không tìm thấy',
    );
  }

  async getCategory(productId: string) {
    const category = await this.repository.getCategory(productId);
    return this.helperProductService.checkExistingValue(
      category,
      'Danh mục sản phẩm không tìm thấy',
    );
  }

  async getOwner(productId: string) {
    const owner = await this.repository.getOwnerById(productId);
    return this.helperProductService.checkExistingValue(
      owner,
      'Chủ sản phẩm không tìm thấy',
    );
  }

  async getProductCart(productId: string) {
    const productDoc = await this.repository.getOneById(productId);
    const product = this.helperProductService.checkExistingValue(productDoc);
    const { info, images } = product;
    const { name, price, sale } = info;
    const { thumbnail } = images;
    return { name, price, sale, thumbnail };
  }

  /**
   * Trả về các trường cần thiết cho order kèm theo kiểm tra khu vực hộ trợ vận chuyển, phương phức vận chuyển
   * hợp lệ!
   * @param param0
   * @returns
   */
  async getOrderParts({
    productId,
    shippingType,
    variantId,
    provinceCode,
  }: SharedOrderPartParams) {
    const productDoc = await this.repository.getOneById(productId);
    const product = this.helperProductService.checkExistingValue(productDoc);
    const { info, images, variants, shipping, owner } = product;
    const existShipping = shipping.methods.find((f) => f.type === shippingType);
    const { supportedProvinces } = this.helperProductService.checkExistingValue(
      existShipping,
      'Phương thức vận chuyển không tồn tại trong sản phẩm này!',
    );
    const isSupportProvince = supportedProvinces.includes(provinceCode);

    if (!isSupportProvince) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: `Sản phẩm này không hộ trợ phương thức vận chuyển ${shippingType} ở vùng này!`,
        }),
      );
    }
    const { sellerId, storeId } = owner;
    const { name, price, sale } = info;
    const { thumbnail } = images;
    const variant = variants.find((f) => f._id.equals(variantId));
    const { extraPrice, sku, optionName } =
      this.helperProductService.checkExistingValue(
        variant,
        'Không tìm thấy biến thể!',
      );
    return {
      name,
      price,
      sale,
      thumbnail,
      extraPrice,
      optionName,
      sku,
      supportedProvinces,
      sellerId,
      storeId,
    };
  }
}
