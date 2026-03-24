import { Controller } from '@nestjs/common';
import { StoreService } from './stores.service';

@Controller('stores')
export class StoreController {
  constructor(private readonly service: StoreService) {}
}
