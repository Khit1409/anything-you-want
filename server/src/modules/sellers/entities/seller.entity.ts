// src/sellers/entities/seller.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { SellerInfo } from './seller-info.entity';
import { SellerPhone } from './seller-phone.entity';
import { SellerAddress } from './seller-address.entity';
import { Store } from '../../stores/entities/store.entity';

/* ============================
   ENUM: SELLER STATUS
============================ */

export enum SellerStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BANNED = 'banned',
}

@Entity('sellers')
export class Seller {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'email_address',
    unique: true,
  })
  emailAddress: string;

  @Column({ name: 'hash_password' })
  hashPassword: string;

  @Column({
    type: 'enum',
    enum: SellerStatus,
    default: SellerStatus.INACTIVE,
  })
  status: SellerStatus;

  @Column({
    name: 'last_login_at',
    type: 'timestamptz',
    nullable: true,
  })
  lastLoginAt: Date;

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

  /* ============================
     RELATIONS
  ============================ */

  @OneToOne(() => SellerInfo, (info) => info.seller, {
    cascade: true,
  })
  info: SellerInfo;

  @OneToMany(() => SellerAddress, (address) => address.seller, {
    cascade: true,
  })
  addresses: SellerAddress[];

  @OneToMany(() => SellerPhone, (phone) => phone.seller, {
    cascade: true,
  })
  phones: SellerPhone[];

  @OneToOne(() => Store, (store) => store.seller, { cascade: true })
  store: Store;
}
