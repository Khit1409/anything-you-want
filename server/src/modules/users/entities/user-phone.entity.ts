import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_phones')
export class UserPhone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'phone_number',
    length: 10,
  })
  phoneNumber: string;

  @ManyToOne(() => User, (user) => user.phones, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
