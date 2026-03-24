import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SellerService } from './sellers.service';
import { CreateSellerDto } from './dto/create-seller.dto';

@Controller('sellers')
export class SellerController {
  constructor(private readonly service: SellerService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() dto: CreateSellerDto) {
    return await this.service.createSeller(dto);
  }
}
