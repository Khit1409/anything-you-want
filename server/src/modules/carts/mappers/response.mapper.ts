import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { CartListFinishedHandle } from './interfaces/finish-handle.interface';
import { CartResponseDto } from '../dtos/response.dto';

@Injectable()
export class CartMapper {
  constructor() {}

  list(doc: CartListFinishedHandle[]) {
    return plainToInstance(CartResponseDto, doc);
  }
}
