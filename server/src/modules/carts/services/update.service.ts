import { BadRequestException, Injectable } from '@nestjs/common';
import { CartRepository } from '../repositories/carts.repository';
import { HelperService } from '../../helpers/helper.service';
import { HydratedDocument } from 'mongoose';
import { Cart } from '../schemas/carts.schema';
import { UpdateCartDto } from '../dtos/request.dto';
import { ProductSharedService } from '../../products/services/shared.service';
import { calculateCartTotalPrice } from '../helpers/cart.helper';

@Injectable()
export class UpdateCartService {
  constructor(
    private readonly repository: CartRepository,
    private readonly helperService: HelperService,
    private readonly sharedProductService: ProductSharedService,
  ) {}

  async updateVariant(
    model: HydratedDocument<Cart>,
    variantId: string,
    newQuantity?: number,
  ) {
    const newVariant = await this.sharedProductService.getVariant(
      model.info.productId,
      variantId,
    );
    const { _id, sku, stock, options, extraPrice } = newVariant;
    const { originPrice, quantity, sale } = model.info;
    const newQuantityValue = newQuantity ? newQuantity : quantity;
    const newTotalPrice = calculateCartTotalPrice({
      originPrice,
      quantity: newQuantityValue,
      sale,
      variantPrice: extraPrice,
    });

    model.info = {
      ...model.info,
      quantity: newQuantityValue,
      totalPrice: newTotalPrice,
    };

    model.variant = { id: _id.toString(), sku, stock, options, extraPrice };
    await model.save();
    const updateCount = newQuantity ? 3 : 2; // quantity & totalPrice & variant || varaint & totalPrice
    return updateCount;
  }

  async update(model: HydratedDocument<Cart>, data: UpdateCartDto) {
    const { quantity, variant } = data;

    if (variant) {
      return await this.updateVariant(model, variant, quantity);
    }
    if (quantity) {
      const { extraPrice } = model.variant;
      const { originPrice, sale } = model.info;
      const newTotalPrice = calculateCartTotalPrice({
        originPrice,
        sale,
        variantPrice: extraPrice,
        quantity,
      });

      model.info = { ...model.info, quantity, totalPrice: newTotalPrice };
      const updateCount = 2; // quantity & totalPrice
      await model.save();
      return updateCount;
    }

    return 0; // không update gì!;
  }

  async updateOne(id: string, userId: string, dto: UpdateCartDto) {
    const model = await this.repository.findOneById(id, userId);
    if (!model) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Giỏ hàng không tồn tại!',
        }),
      );
    }

    return await this.update(model, dto);
  }
}
