import { BadRequestException, Injectable } from '@nestjs/common';
import { SharedProductService } from '../../products/services/shared.service';
import { HelperService } from '../../helpers/helper.service';
import { CreateOrderDto } from '../dtos/create.dto';
import { OrderStatus } from '../entities/order.entity';
import { PaymentStatus, PaymentType } from '../entities/order-payment.entity';

import {
  OrderAddressRepositorySave,
  OrderContactRepositorySave,
  OrderOwnerSave,
  OrderPaymentRepositorySave,
  OrderRepositorySave,
  OrderShippingRepositorySave,
} from '../interfaces/create.interface';
import { OrderRepository } from '../repositories/order.repository';
import { CreatePaymentService } from '../../payments/services/create.service';

@Injectable()
export class CreateOrderService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly sharedProductService: SharedProductService,
    private readonly helperService: HelperService,
    private readonly createPaymentService: CreatePaymentService,
  ) {}

  async createOrder(dto: CreateOrderDto, userId: string) {
    const {
      paymentType,
      productId,
      quantity,
      shipMethod,
      contact,
      address,
      variantId,
    } = dto;
    const { province, provinceCode, detail, ward } = address;
    const { email, phone, userName } = contact;

    const product = await this.sharedProductService.getOrderPart({
      productId,
      variantId,
      paymentType,
      shippingType: shipMethod,
    });

    const {
      name,
      price,
      sale,
      thumbnail,
      sku,
      stock,
      extraPrice,
      supportedProvinces,
      storeId,
      sellerId,
    } = product;

    if (stock < quantity) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Số lượng tồn kho của sản phẩm không đủ!',
        }),
      );
    }

    const isSupportProvince = supportedProvinces.includes(provinceCode);
    if (!isSupportProvince) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Phương thức vận chuyển không hộ trợ vùng này!',
        }),
      );
    }

    const discounted = price - (price * sale) / 100;
    const totalPrice = discounted + extraPrice;

    const paymentSave: OrderPaymentRepositorySave = {
      status: PaymentStatus.UNPAID,
      type: paymentType,
    };

    const shippingSave: OrderShippingRepositorySave = {
      type: shipMethod,
      finishedAt: null,
    };

    const addressSave: OrderAddressRepositorySave = {
      province,
      detail,
      ward,
    };

    const contactSave: OrderContactRepositorySave = { email, phone, userName };

    const user: OrderOwnerSave = { id: userId };
    const seller: OrderOwnerSave = { id: sellerId };
    const store: OrderOwnerSave = { id: storeId };

    const orderSave: OrderRepositorySave = {
      address: addressSave,
      contact: contactSave,
      shipping: shippingSave,
      payment: paymentSave,
      price,
      sale,
      sku,
      productId,
      quantity,
      status: OrderStatus.PENDING,
      thumbnail,
      totalPrice,
      name,
      seller,
      store,
      user,
    };

    const saved = await this.repository.create(orderSave);

    if (paymentType === PaymentType.BANKING) {
      const paymentLink =
        await this.createPaymentService.createPaymentLink(saved);
      return { success: true, paymentLink };
    }
    return { success: true };
  }
}
