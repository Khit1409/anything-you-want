import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { DatabaseModule } from '@/database/database.module';
import { SellerModule } from '../sellers/sellers.module';
import { UserModule } from '../users/users.module';
import { LoginService } from './services/login.service';
@Module({
  imports: [DatabaseModule, SellerModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, LoginService],
  exports: [LoginService],
})
export class AuthModule {}
