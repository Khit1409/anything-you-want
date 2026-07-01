import { SharedOrderService } from '@/modules/orders/services/shared.service';
import { PayosService } from '@/modules/payos/services/payos.service';
import { SharedStoreService } from '@/modules/stores/services/shared.service';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreatePaymentLinkRequest } from '@payos/node';
import {
  CheckExistingPaymentParams,
  CreatePaymentParams,
} from '../interfaces/payment.interface';
import { GetPayosConfigParams } from '@/modules/payos/interfaces/config.interface';
import { HelperService } from '@/modules/common/services/helper.service';
import { DeleteOrderService } from '@/modules/orders/services/delete.service';
import { UpdateProductService } from '@/modules/products/services/update.service';
import { CancelPaymentDto } from '../dtos/payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    private readonly payosService: PayosService,
    private readonly sharedStoreService: SharedStoreService,
    private readonly sharedOrderService: SharedOrderService,
    private readonly deleteOrderService: DeleteOrderService,
    private readonly helperService: HelperService,
    private readonly updateProductService: UpdateProductService,
  ) {}

  async checkExistingPaymentLink(params: CheckExistingPaymentParams) {
    const existing = await this.payosService.getInfo(params);
    if (existing) {
      const { payment } = await this.sharedOrderService.findOne(params.orderId);
      const { checkoutUrl, expiredAt, qrCode, description, paymentLinkId } =
        payment;
      const { accountName, accountNumber, bin } = params;
      const { amount, status, orderCode } = existing;
      return {
        accountName,
        accountNumber,
        bin,
        amount,
        checkoutUrl,
        qrCode,
        description,
        expiredAt,
        status,
        orderCode,
        paymentLinkId,
      };
    }
  }

  async create(params: CreatePaymentParams) {
    const {
      userId,
      orderCode,
      buyerAddress,
      buyerEmail,
      buyerPhone,
      storeId,
      buyerName,
      orderId,
      totalPrice,
    } = params;

    const { bankPayment, bankPaymentConfig } =
      await this.sharedStoreService.getOneStoreByOptions({
        search: { id: storeId },
        relations: {
          bankPayment: true,
          bankPaymentConfig: true,
        },
      });

    const { apiKey, checkSumKey, clientId } = bankPaymentConfig;
    const apiKeyEncrypt = apiKey;
    const checkSumKeyEncrypt = checkSumKey;
    const sercetKey = this.configService.get<string>('PRIVATE_KEY')!;
    const payosParams: GetPayosConfigParams = {
      apiKeyEncrypt,
      checkSumKeyEncrypt,
      clientId,
    };
    const { bin, accountName, accountNumber } = bankPayment;
    const checkParams: CheckExistingPaymentParams = {
      ...payosParams,
      accountName,
      accountNumber,
      bin,
      orderCode,
      orderId,
    };
    const existing = await this.checkExistingPaymentLink(checkParams);
    if (existing) return existing;

    const payos = this.payosService.getPayosConfig(payosParams);
    const signatureData = {
      storeId,
      userId,
      orderCode,
      buyerPhone,
      buyerEmail,
    };
    const signature = await payos.crypto.createSignature(
      sercetKey,
      signatureData,
    );
    const cancelUrl = `http://localhost:3000/orders`;
    const returnUrl = `http://localhost:3000/orders/buy-now/checkout/${orderId}`;
    const expiredAt = Math.floor(Date.now() / 1000) + 15 * 60;

    const payload: CreatePaymentLinkRequest = {
      amount: totalPrice,
      cancelUrl,
      description: `PAYMENT - ${orderCode}`,
      orderCode,
      returnUrl,
      buyerAddress,
      buyerEmail,
      buyerName,
      buyerPhone,
      expiredAt,
      signature,
    };
    const { amount, checkoutUrl, qrCode, description, status, paymentLinkId } =
      await payos.paymentRequests.create(payload);
    return {
      accountName,
      accountNumber,
      bin,
      amount,
      checkoutUrl,
      qrCode,
      description,
      expiredAt,
      status,
      orderCode,
      paymentLinkId,
    };
  }
  async getPaymentInfo(orderId: string, paymentLinkId: string) {
    const order = await this.sharedOrderService.findOne(orderId);
    const storeId = order.store.id;
    const store = await this.sharedStoreService.getBankingConfig(storeId);
    return await this.payosService.getInfo({
      apiKeyEncrypt: store.apiKey,
      checkSumKeyEncrypt: store.checkSumKey,
      clientId: store.clientId,
      paymentLinkId,
    });
  }

  async cancelPayment(dto: CancelPaymentDto) {
    const { orderId, paymentLinkId, cancellationReason } = dto;
    const order = await this.sharedOrderService.findOne(orderId);
    const { store, quantity, productId, sku } = order;
    const { id } = store;
    const { apiKey, checkSumKey, clientId } =
      await this.sharedStoreService.getBankingConfig(id);
    const existing = await this.getPaymentInfo(orderId, paymentLinkId);
    if (!existing) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Đơn thanh toán không tồn tại hoặc đã hết hạn thanh toán!',
        }),
      );
    }
    const payos = this.payosService.getPayosConfig({
      apiKeyEncrypt: apiKey,
      checkSumKeyEncrypt: checkSumKey,
      clientId,
    });
    const cancelReason = cancellationReason ?? `Huỷ đơn hàng ${orderId}`;
    await payos.paymentRequests.cancel(paymentLinkId, cancelReason);
    await this.updateProductService.resetStockWhenCancelOrder({
      productId,
      sku,
      stockDiscounted: quantity,
    });
    const successDelete = await this.deleteOrderService.deleteById(orderId);
    return successDelete;
  }
}
