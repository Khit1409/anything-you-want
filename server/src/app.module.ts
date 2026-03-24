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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('carts');
  }
}
