import { Controller } from '@nestjs/common';
import { ReadStoreService } from '../services/read.service';

@Controller('stores')
export class StoreController {
  constructor(private readonly readService: ReadStoreService) {}
}
