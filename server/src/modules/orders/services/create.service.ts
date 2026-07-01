import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SharedProductService } from '../../products/services/shared.service';
import { HelperService } from '../../common/services/helper.service';
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
import { UpdateProductService } from '../../products/services/update.service';
import { HelperOrderService } from './helper.service';
import { SharedOrderPartParams } from '@/modules/products/interfaces/shared.interface';
import { OrderPaymentRepository } from '../repositories/order-payment.repository';
import { SharedStoreService } from '@/modules/stores/services/shared.service';
import { PaymentService } from '@/modules/payments/services/payment.service';

@Injectable()
export class CreateOrderService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly sharedProductService: SharedProductService,
    private readonly helperService: HelperService,
    private readonly updateProductService: UpdateProductService,
    private readonly helperOrderService: HelperOrderService,
    private readonly orderPaymentRepsitory: OrderPaymentRepository,
    private readonly paymentService: PaymentService,
    private readonly sharedStoreService: SharedStoreService,
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

  private generateColumns(params: GenerateColumnParams): OrderRepositorySave {
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
      checkoutUrl: null,
      description: null,
      expiredAt: null,
      qrCode: null,
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

  private async generateProductParts(params: SharedOrderPartParams) {
    return await this.sharedProductService.getOrderParts(params);
  }

  async createOrder(dto: CreateOrderDto, userId: string) {
    const {
      paymentType,
      productId,
      quantity,
      shipMethod,
      address,
      variantId,
      contact,
    } = dto;
    const { provinceCode } = address;

    const updateStockParams = {
      productId,
      variantId,
      quantity,
    };
    await this.updateVariantStockBeforeCreateOrder(updateStockParams);
    const shippingType = shipMethod;
    const orderPartParams = {
      productId,
      variantId,
      shippingType,
      provinceCode,
    };
    const { name, price, sale, sku, thumbnail, storeId, sellerId, extraPrice } =
      await this.generateProductParts(orderPartParams);
    const checkPaymethodParams = {
      paymentType,
      storeId,
    };
    await this.helperOrderService.checkPaymethod(checkPaymethodParams);
    const info: GenerateOrderInfoColumnParam = {
      name,
      price,
      sale,
      sku,
      thumbnail,
    };
    const owner: GenerateOwnerColumnParam = { sellerId, storeId, userId };
    const payload = dto;
    const generateColumnParams = {
      payload,
      info,
      owner,
      variantExtraPrice: extraPrice,
    };
    const orderSave = this.generateColumns(generateColumnParams);
    const saved = await this.repository.create(orderSave);
    const orderId = saved.id;
    const orderCode = saved.orderCode;
    const totalPrice = Math.round(orderSave.totalPrice);
    if (paymentType === PaymentType.BANKING) {
      const buyerAddress = `${address.detail}-${address.ward}-${address.province}`;
      const buyerEmail = contact.email;
      const buyerPhone = contact.phone;
      const buyerName = contact.userName;
      const { checkoutUrl, description, qrCode, expiredAt, paymentLinkId } =
        await this.paymentService.create({
          buyerAddress,
          buyerEmail,
          buyerName,
          buyerPhone,
          orderCode,
          storeId,
          totalPrice,
          userId,
          orderId,
        });
      try {
        await this.orderPaymentRepsitory.updateCheckout({
          checkoutUrl,
          qrCode,
          orderId,
          expiredAt,
          description,
          paymentLinkId,
        });
      } catch {
        throw new NotFoundException(
          this.helperService.errorResponse({
            message: 'Cập nhật thanh toán đơn hàng thất bại!',
          }),
        );
      }
    }
    return { orderId, paymentType };
  }
}
