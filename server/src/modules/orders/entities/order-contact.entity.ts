import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('order_contact')
export class OrderContact {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'phone', type: 'varchar', length: 10, nullable: false })
  phone: string;
  @Column({ name: 'email', type: 'varchar', length: 255 })
  email: string;
  @Column({ name: 'user_name', type: 'varchar', length: 255 })
  userName: string;
  @OneToOne(() => Order, (order) => order.contact, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
