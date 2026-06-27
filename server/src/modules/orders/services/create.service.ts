import { BadRequestException, Injectable } from '@nestjs/common';
import { SharedProductService } from '../../products/services/shared.service';
import { HelperService } from '../../helpers/helper.service';
import { CreateOrderDto } from '../dtos/create.dto';
import { OrderStatus } from '../entities/order.entity';
import { PaymentStatus, PaymentType } from '../entities/order-payment.entity';

import {
  GenerateColumnParams,
  GenerateOrderInfoColumnParam,
  GenerateOwnerColumnParam,
  OrderOwnerSave,
  OrderPaymentRepositorySave,
  OrderRepositorySave,
  OrderShippingRepositorySave,
  UpdateVariantStockBeforeCreateOrderParams,
} from '../interfaces/create.interface';
import { OrderRepository } from '../repositories/order.repository';
import { CreatePaymentService } from '../../payments/services/create.service';
import { UpdateProductService } from '../../products/services/update.service';
import { HelperOrderService } from './helper.service';

@Injectable()
export class CreateOrderService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly sharedProductService: SharedProductService,
    private readonly helperService: HelperService,
    private readonly createPaymentService: CreatePaymentService,
    private readonly updateProductService: UpdateProductService,
    private readonly helperOrderService: HelperOrderService,
  ) {}

  async updateVariantStockBeforeCreateOrder(
    params: UpdateVariantStockBeforeCreateOrderParams,
  ) {
    const { productId, variantId, quantity } = params;
    const { modifiedCount } = await this.updateProductService.updateStock({
      productId,
      quantity,
      variantId,
    });

    if (modifiedCount == 0) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message:
            'Số lượng yêu cầu vượt quá số lượng tồn kho hoặc bạn đã chậm hơn 1 khách hàng khác!',
        }),
      );
    }
  }

  /**
   * Tạo các trường thuộc cột của order
   */
  generateColums(params: GenerateColumnParams): OrderRepositorySave {
    const { info, owner, payload, variantExtraPrice } = params;
    const { contact, address, paymentType, productId, quantity, shipMethod } =
      payload;
    const { name, price, thumbnail, sku, sale } = info;
    const { sellerId, storeId, userId } = owner;
    const discounted = price - (price * sale) / 100;
    const totalPrice = discounted + variantExtraPrice;

    const paymentSave: OrderPaymentRepositorySave = {
      status: PaymentStatus.UNPAID,
      type: paymentType,
    };

    const shippingSave: OrderShippingRepositorySave = {
      type: shipMethod,
      finishedAt: null,
    };

    const status = OrderStatus.PENDING;

    const user: OrderOwnerSave = { id: userId };
    const seller: OrderOwnerSave = { id: sellerId };
    const store: OrderOwnerSave = { id: storeId };

    const columns: OrderRepositorySave = {
      address,
      contact,
      user,
      sale,
      seller,
      shipping: shippingSave,
      name,
      sku,
      store,
      payment: paymentSave,
      price,
      totalPrice,
      productId,
      quantity,
      thumbnail,
      status,
    };

    return columns;
  }

  async createOrder(dto: CreateOrderDto, userId: string) {
    const { paymentType, productId, quantity, shipMethod, address, variantId } =
      dto;
    const { provinceCode } = address;

    await this.updateVariantStockBeforeCreateOrder({
      productId,
      variantId,
      quantity,
    });

    const product = await this.sharedProductService.getOrderParts({
      productId,
      variantId,
      shippingType: shipMethod,
      provinceCode,
    });

    const { name, price, sale, thumbnail, sku, extraPrice, storeId, sellerId } =
      product;

    await this.helperOrderService.checkPaymethod({
      paymentType,
      storeId,
    });

    const info: GenerateOrderInfoColumnParam = {
      name,
      price,
      sale,
      sku,
      thumbnail,
    };

    const owner: GenerateOwnerColumnParam = { sellerId, storeId, userId };
    const orderSave = this.generateColums({
      payload: dto,
      info,
      owner,
      variantExtraPrice: extraPrice,
    });

    const saved = await this.repository.create(orderSave);

    if (paymentType === PaymentType.BANKING) {
      const paymentLink = await this.createPaymentService.create(saved);
      return { success: true, paymentLink };
    }
    return { success: true };
  }
}
