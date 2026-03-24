import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_info')
export class UserInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', length: 255 })
  firstName: string;

  @Column({ name: 'last_name', length: 255 })
  lastName: string;

  @Column({ name: 'full_name', length: 255 })
  fullName: string;

  @Column({ type: 'text', nullable: true })
  avatar: string;

  @Column({
    name: 'date_of_birth',
    type: 'date',
    nullable: true,
  })
  dateOfBirth: Date;

  @OneToOne(() => User, (user) => user.info, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
