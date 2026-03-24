import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { InternalErrorFilter } from './core/http-exception.filter';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:8080'],
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new InternalErrorFilter());
  app.setGlobalPrefix('/api');
  const port = configService.get<number>('PORT') || 8080;
  await app.listen(port);
}

bootstrap()
  .then(() =>
    console.log('Server is started: App running on http://localhost:8080'),
  )
  .catch((error) => console.log('Server is started but have error: ', error));
