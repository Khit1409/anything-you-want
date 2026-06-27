import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/products/products.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { CartModule } from './modules/carts/carts.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { CategoryModule } from './modules/categories/categories.module';
import { UserModule } from './modules/users/users.module';
import { SellerModule } from './modules/sellers/sellers.module';
import { UploadModule } from './modules/uploads/upload.module';
import { PayosModule } from './modules/payos/payos.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { OrdersModule } from './modules/orders/orders.module';
import { AUHT_GUARD_PROVIDER } from './common/providers/authenticated-guard.provider';
import { PERMISSION_PROVIDER } from './common/providers/permissions.provider';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ProductModule,
    DatabaseModule,
    AuthModule,
    CartModule,
    CategoryModule,
    UserModule,
    SellerModule,
    UploadModule,
    PayosModule,
    PaymentsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService, AUHT_GUARD_PROVIDER, PERMISSION_PROVIDER],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('carts');
    consumer.apply(AuthMiddleware).forRoutes('products');
    consumer.apply(AuthMiddleware).forRoutes('sellers');
    consumer.apply(AuthMiddleware).forRoutes('users');
    consumer.apply(AuthMiddleware).forRoutes('orders');
  }
}
