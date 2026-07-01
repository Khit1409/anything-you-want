import { Injectable } from '@nestjs/common';
import { CartRepository } from '../repositories/carts.repository';
import { HelperService } from '../../common/services/helper.service';

@Injectable()
export class SharedCartService {
  constructor(
    private readonly repository: CartRepository,
    private readonly helperService: HelperService,
  ) {}

  async getInfo(id: string) {
    return;
  }

  async getVariant(id: string) {
    return;
  }
}
