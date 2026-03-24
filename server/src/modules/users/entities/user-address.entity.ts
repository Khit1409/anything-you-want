import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_address')
export class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  province: string;

  @Column({ length: 255 })
  ward: string;

  @Column({
    name: 'address_detail',
    length: 255,
  })
  addressDetail: string;

  @ManyToOne(() => User, (user) => user.addresses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
