import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from '../dtos/create-store.dto';
import { HelperService } from '../../helpers/helper.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateStoreService {
  constructor(private readonly helperService: HelperService) {}

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
}
