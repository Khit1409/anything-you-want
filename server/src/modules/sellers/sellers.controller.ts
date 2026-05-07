import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SellerService } from './sellers.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import type { Request } from 'express';
import { Role } from '@/src/common/enums/roles.enum';
import { Roles } from '@/src/common/decorators/roles.decorator';
import { RolesGuard } from '@/src/guards/role.guard';
import { AuthGuard } from '@/src/guards/auth.guard';

@Controller('sellers')
export class SellerController {
  constructor(private readonly service: SellerService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() dto: CreateSellerDto) {
    return await this.service.createSeller(dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    const id = req.userId;
    return await this.service.getSellerProfile(id);
  }
}
