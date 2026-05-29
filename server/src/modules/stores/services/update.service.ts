import { Injectable } from '@nestjs/common';
import { StoreRepository } from '../stores.repository';

@Injectable()
export class UpdateStoreService {
  constructor(private readonly repository: StoreRepository) {}
}
