import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CartResponseDto } from '../dtos';
import { CartListFinishedHandle } from './interfaces/finish-handle.interface';

@Injectable()
export class CartMapper {
  constructor() {}

  list(doc: CartListFinishedHandle[]) {
    return plainToInstance(CartResponseDto, doc);
  }
}
