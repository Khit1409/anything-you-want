import { Injectable } from '@nestjs/common';
import { StoreRepository } from '../repositories/stores.repository';

@Injectable()
export class UpdateStoreService {
  constructor(private readonly repository: StoreRepository) {}
}
