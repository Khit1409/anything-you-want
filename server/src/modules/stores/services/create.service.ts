import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from '../dtos/create-store.dto';
import { HelperService } from '../../common/services/helper.service';
import * as bcrypt from 'bcrypt';
import { CreateConfigBankingDto } from '../dtos/create-banking-config.dto';
import { StoreBankingPaymentConfigRepository } from '../repositories/store-banking-config.repository';
import { SharedStoreService } from './shared.service';
import { PayosService } from '../../payos/services/payos.service';

@Injectable()
export class CreateStoreService {
  constructor(
    private readonly helperService: HelperService,
    private readonly storeBankingRepository: StoreBankingPaymentConfigRepository,
    private readonly sharedStoreService: SharedStoreService,
    private readonly payosService: PayosService,
  ) {}

  async createStoreInsertData(
    currentData: CreateStoreDto,
    sellerEmail: string,
  ) {
    const { info, storeCode } = currentData;
    return {
      ...currentData,
      info: {
        ...info,
        slug: this.helperService.strToSlug(info.name),
        emailAddress: info.emailAddress ?? sellerEmail,
      },
      storeCode: await bcrypt.hash(storeCode, 10),
    };
  }

  async createConfigBanking(dto: CreateConfigBankingDto, sellerId: string) {
    const store = await this.sharedStoreService.getOneStoreBySeller(sellerId);
    const { id } = store;
    const insertData = this.payosService.configSellerPayos({
      ...dto,
      storeId: id,
    });
    console.log(insertData);
    const newConfig = await this.storeBankingRepository.create(insertData);
    if (!newConfig.id) {
      throw new NotFoundException(
        this.helperService.errorResponse({
          message: 'Tạo thanh toán ngân hàng thất bại!',
        }),
      );
    }
    return true;
  }
}
