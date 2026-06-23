import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('order_address')
export class OrderAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @OneToOne(() => Order, (order) => order.address, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;
  @Column({ type: 'varchar', length: 255, nullable: false, name: 'province' })
  province: string;
  @Column({ type: 'varchar', length: 255, nullable: false, name: 'ward' })
  ward: string;
  @Column({ type: 'varchar', length: 255, nullable: false, name: 'address' })
  detail: string;
}
