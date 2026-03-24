import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    //mongoose
    MongooseModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    //typeorm
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: Number(config.get('DB_PORT')),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        synchronize: false,

        entities: [__dirname + '/../modules/**/entities/*.entity.{ts,js}'],
      }),
    }),
  ],
  exports: [MongooseModule, TypeOrmModule],
})
export class DatabaseModule {}
