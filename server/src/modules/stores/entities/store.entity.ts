// src/stores/entities/store.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Seller } from '../../sellers/entities/seller.entity';
import { StoreInfo } from './store-info.entity';
import { Order } from '../../orders/entities/order.entity';
import { StoreBankingPayment } from './store-banking.entity';
import { StoreMomoPayment } from './store-momo.entity';
import { StoreBankingPaymentConfig } from './store-banking-config.entity';

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'store_code',
    unique: true,
  })
  storeCode: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt: Date;

  @OneToOne(() => Seller, (seller) => seller.store, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'seller_id' })
  seller: Seller;
  @OneToOne(() => StoreInfo, (info) => info.store, {
    onDelete: 'CASCADE',
    cascade: ['insert'],
  })
  info: StoreInfo;
  @OneToMany(() => Order, (order) => order.store, {
    onDelete: 'CASCADE',
  })
  orders: Order[];
  @OneToOne(() => StoreBankingPayment, (bank) => bank.store, {
    onDelete: 'CASCADE',
    cascade: ['insert'],
  })
  bankPayment: StoreBankingPayment;
  @OneToOne(() => StoreMomoPayment, (momo) => momo.store, {
    onDelete: 'CASCADE',
    cascade: ['insert'],
  })
  momoPayment: StoreMomoPayment;
  @OneToOne(() => StoreBankingPaymentConfig, (config) => config.store, {
    onDelete: 'CASCADE',
    cascade: ['insert'],
  })
  bankPaymentConfig: StoreBankingPaymentConfig;
}
