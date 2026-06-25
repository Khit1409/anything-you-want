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
    cascade: true,
  })
  info: StoreInfo;

  @OneToMany(() => Order, (orderOrder) => orderOrder.store, {
    onDelete: 'CASCADE',
  })
  orders: Order[];
  @OneToMany(() => StoreBankingPayment, (bank) => bank.store, {
    onDelete: 'CASCADE',
  })
  bankPayments: StoreBankingPayment[];
  @OneToMany(() => StoreMomoPayment, (momo) => momo.store, {
    onDelete: 'CASCADE',
  })
  momoPayment: StoreMomoPayment;
}
