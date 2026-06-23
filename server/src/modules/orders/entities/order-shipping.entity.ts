import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { ShippingMethod } from '../../products/schemas/product-shipping.schema';

@Entity('order_shipping')
export class OrderShipping {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @OneToOne(() => Order, (order) => order.shipping, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;
  @Column({
    name: 'type',
    type: 'enum',
    enum: ShippingMethod,
    default: ShippingMethod.STANDARD,
  })
  type: ShippingMethod;
  @CreateDateColumn({ name: 'startedAt', type: 'timestamptz' })
  startedAt: Date;
  @Column({ name: 'finishedAt', type: 'timestamptz', nullable: true })
  finishedAt: Date | null;
}
