import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { UserInfo } from './user-info.entity';
import { UserAddress } from './user-address.entity';
import { UserPhone } from './user-phone.entity';

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BANNED = 'banned',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'email_address',
    unique: true,
    length: 255,
  })
  emailAddress: string;

  @Column({ name: 'hash_password' })
  hashPassword: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

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

  @OneToOne(() => UserInfo, (info) => info.user, {
    cascade: true,
  })
  info: UserInfo;

  @OneToMany(() => UserAddress, (address) => address.user, {
    cascade: true,
  })
  addresses: UserAddress[];

  @OneToMany(() => UserPhone, (phone) => phone.user, {
    cascade: true,
  })
  phones: UserPhone[];
}
