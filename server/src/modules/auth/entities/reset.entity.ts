import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Seller } from '../../sellers/entities/seller.entity';
import { User } from '../../users/entities/user.entity';

@Entity('reset_seller_accounts')
export class ResetSellerAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'email_address',
    unique: true,
    length: 255,
  })
  emailAddress: string;

  @Column({
    name: 'reset_token',
    type: 'text',
  })
  resetToken: string;

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
     RELATION: Email FK -> Seller.emailAddress
  ============================ */

  @ManyToOne(() => Seller, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'email_address',
    referencedColumnName: 'emailAddress',
  })
  seller: Seller;
}

/* =========================================
   RESET USER ACCOUNT TABLE
========================================= */

@Entity('reset_user_accounts')
export class ResetUserAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'email_address',
    unique: true,
    length: 255,
  })
  emailAddress: string;

  @Column({
    name: 'reset_token',
    type: 'text',
  })
  resetToken: string;

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
     RELATION: Email FK -> User.emailAddress
  ============================ */

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'email_address',
    referencedColumnName: 'emailAddress',
  })
  user: User;
}
