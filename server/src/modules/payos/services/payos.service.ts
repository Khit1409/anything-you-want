import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ConfigSellerPayosParams,
  GetPaymentLinkInfo,
  GetPayosConfigParams,
} from '../interfaces/config.interface';
import { EncryptionService } from '../../common/services/encrypt.service';
import { HelperService } from '../../common/services/helper.service';
import { CreateStoreBankingConfigParams } from '../../stores/repositories/interfaces/store-banking-config-repository.interface';
import { PayOS } from '@payos/node';

@Injectable()
export class PayosService {
  constructor(
    private readonly encryptService: EncryptionService,
    private readonly helperService: HelperService,
  ) {}

  configSellerPayos(params: ConfigSellerPayosParams) {
    try {
      const { apiKey, checkSumKey, clientId, storeId } = params;
      const apiKeyEncrypt = this.encryptService.encrypt(apiKey);
      const checkSumKeyEncrypt = this.encryptService.encrypt(checkSumKey);
      const insertData: CreateStoreBankingConfigParams = {
        store: { id: storeId },
        apiKey: apiKeyEncrypt,
        checkSumKey: checkSumKeyEncrypt,
        clientId,
      };
      return insertData;
    } catch {
      throw new NotFoundException(
        this.helperService.errorResponse({
          message: 'Lỗi khi cấu hình thanh toán!',
        }),
      );
    }
  }

  getPayosConfig(params: GetPayosConfigParams) {
    try {
      const { apiKeyEncrypt, checkSumKeyEncrypt, clientId } = params;
      const [apiKeyDecrypted, checkSumKeyDecrypted] = [
        this.encryptService.decrypt(apiKeyEncrypt),
        this.encryptService.decrypt(checkSumKeyEncrypt),
      ];
      return new PayOS({
        clientId,
        apiKey: apiKeyDecrypted,
        checksumKey: checkSumKeyDecrypted,
      });
    } catch {
      throw new NotFoundException(
        this.helperService.errorResponse({
          message: 'Lỗi khi tạo thanh toán!',
        }),
      );
    }
  }

  async getInfo(params: GetPaymentLinkInfo) {
    try {
      const payos = this.getPayosConfig(params);
      const { paymentLinkId, orderCode } = params;
      if (!orderCode && !paymentLinkId)
        throw new BadRequestException(
          this.helperService.errorResponse({
            message: 'Payment id and orderCode not found!',
          }),
        );
      if (paymentLinkId) {
        return await payos.paymentRequests.get(paymentLinkId);
      }
      if (orderCode) {
        return await payos.paymentRequests.get(orderCode);
      }
    } catch {
      return;
    }
  }
}
