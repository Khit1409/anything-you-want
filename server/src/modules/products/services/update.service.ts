import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from '../repositories/products.repository';
import { HelperService } from '../../common/services/helper.service';
import {
  UpdateProductClassificationDto,
  UpdateProductClassificationValueDto,
  UpdateProductDto,
  UpdateProductImageDto,
  UpdateProductInfoDto,
  UpdateProductShippingDto,
  UpdateProductVariantDto,
} from '../dtos';

import { CreateProductService } from './create.service';
import mongoose from 'mongoose';
import { ProductClassification } from '../schemas/product-classification.schema';
import { ProductVariant } from '../schemas/product-variant.schema';
import { ReadCategoryService } from '../../categories/services/read.service';
import { ProductInfo } from '../schemas/product-info.schema';
import { HelperProductService } from './helper.service';
import {
  ResetStockWhenCancelOrderParams,
  UpdateStockPayload,
} from '../interfaces/update.interface';
import { ShippingMethod } from '../schemas/product-shipping.schema';
import { ProductStatus } from '../schemas/products.schema';
import { SearchProducts } from '../interfaces/query.interface';

@Injectable()
export class UpdateProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly createService: CreateProductService,
    private readonly readCategoryService: ReadCategoryService,
    private readonly helperService: HelperService,
    private readonly helperProductService: HelperProductService,
  ) {}

  updateClassificationValues(values: UpdateProductClassificationValueDto[]) {
    return values.map((value) => ({
      ...value,
      id: value.id || String(new mongoose.Types.ObjectId()),
    }));
  }

  updateClassifications(
    classifications: UpdateProductClassificationDto[],
  ): ProductClassification[] {
    return classifications.map((classification) => ({
      ...classification,
      id: classification.id || String(new mongoose.Types.ObjectId()),
      values: this.updateClassificationValues(classification.values),
    }));
  }

  updateVariants(
    productCode: string,
    classifications: ProductClassification[],
    oldVariants: UpdateProductVariantDto[],
  ): ProductVariant[] {
    const newVariants = this.createService.createVariants(
      productCode,
      classifications,
    );

    const oldVariantMap = new Map(
      oldVariants.map((vari) => [[...vari.optionIds].sort().join('-'), vari]),
    );

    return newVariants.map((newVari) => {
      const key = [...newVari.optionIds].sort().join('-');
      const old = oldVariantMap.get(key);
      if (!old) {
        console.log('variant key', key, 'compared', oldVariantMap.get(key));
        return { ...newVari, _id: new mongoose.Types.ObjectId() };
      }
      return {
        ...old,
        _id: new mongoose.Types.ObjectId(old._id),
        sku: newVari.sku,
        optionIds: newVari.optionIds,
      };
    });
  }

  async updateInfo(dto: UpdateProductInfoDto): Promise<ProductInfo> {
    const { brand, description, name, origin, price, sale } = dto;
    const newCategoryId = dto.category;

    const category = await this.readCategoryService.getById(newCategoryId);

    return { brand, description, name, origin, category, price, sale };
  }

  updateShipping(shippingDto: UpdateProductShippingDto) {
    const method = shippingDto.methods;
    const isInCorrect = method.find(
      (f) => f.type === ShippingMethod.STANDARD && !f.enabled,
    );
    if (isInCorrect)
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Cấu hình vận chuyển tiêu chuẩn mặc định phải có!',
        }),
      );
    return shippingDto;
  }

  updateImages(imageDto: UpdateProductImageDto) {
    const { thumbnail, details } = imageDto;
    if (thumbnail === '' || !thumbnail) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Ảnh bìa không được để trống!',
        }),
      );
    }

    const checkedImgDetails = details.filter(
      (ft) => ft !== '' && ft !== undefined && ft !== null,
    );

    if (checkedImgDetails.length == 0) {
      throw new BadRequestException(
        this.helperService.errorResponse({ message: 'Ảnh chi tiết bị trống!' }),
      );
    }

    return { thumbnail, details: checkedImgDetails };
  }

  async updateStatus(
    sellerId: string,
    productId: string,
    status: ProductStatus,
  ) {
    const search: SearchProducts = {
      _id: productId,
      'owner.sellerId': sellerId,
    };
    const productDoc = await this.repository.findOne(search);
    const product = this.helperService.checkValue(productDoc);
    const isZero = product.variants.every((vari) => vari.stock === 0);
    product.status = status;
    if (isZero) product.status = ProductStatus.ZERO;
    const updated = await product.save();
    const isNew = updated.status === status;
    console.log(isNew, updated.status, status);
    if (isNew) return true;
    return false;
  }

  async update(dto: UpdateProductDto, id: string, sellerId: string) {
    const search: SearchProducts = {
      _id: id,
      'owner.sellerId': sellerId,
    };
    const productDoc = await this.repository.findOne(search);
    const product = this.helperProductService.checkExistingValue(
      productDoc,
      'Sản phẩm không tồn tại!',
    );

    const { physical, classifications, images, info, shipping, variants } = dto;

    const newInfo = await this.updateInfo(info);
    const newClassifications = this.updateClassifications(classifications);
    const productCode = this.createService.createCode(info.name);
    const newShipping = this.updateShipping(shipping);
    const newImgs = this.updateImages(images);
    const newVariants = this.updateVariants(
      productCode,
      newClassifications,
      variants,
    );

    product.info = newInfo;
    product.classifications = newClassifications;
    product.physical = physical;
    product.images = newImgs;
    product.shipping = newShipping;
    product.variants = newVariants;
    await product.save();

    return { id };
  }

  async updateStock(payload: UpdateStockPayload) {
    return await this.repository.updateStock(payload);
  }

  async resetStockWhenCancelOrder(params: ResetStockWhenCancelOrderParams) {
    const { modifiedCount } = await this.repository.resetStock(params);
    if (modifiedCount == 0) {
      throw new NotFoundException(
        this.helperService.errorResponse({ message: 'Cập nhật thất bại!' }),
      );
    }
  }
}
