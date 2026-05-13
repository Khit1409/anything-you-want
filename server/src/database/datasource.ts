import { DataSource } from 'typeorm';
import 'dotenv/config';

/**
 * Cấu hình TypeORM DataSource cho ứng dụng dùng PostgreSQL.
 * Thông số kết nối đọc từ biến môi trường (DB_HOST, DB_PORT, ...).
 */
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../modules/**/entities/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  synchronize: false,
});
