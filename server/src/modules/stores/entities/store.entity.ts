// src/stores/entities/store.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Seller } from '../../sellers/entities/seller.entity';
import { StoreInfo } from './store-info.entity';

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
}
