import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';

export enum PaymentStatus {
  PAID = 'paid',
  UNPAID = 'unpaid',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
}

export enum PaymentType {
  BANKING = 'banking',
  MOMO = 'momo',
  DELIVERED = 'delivered',
}

@Entity('order_payment')
export class OrderPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @OneToOne(() => Order, (order) => order.payment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;
  @Column({
    name: 'type',
    type: 'enum',
    enum: PaymentType,
    default: PaymentType.DELIVERED,
  })
  type: PaymentType;
  @Column({ name: 'payment_id', type: 'varchar', nullable: true })
  paymentLinkId: string;
  @Column({ name: 'description', nullable: true, type: 'varchar' })
  description: string | null;
  @Column({ name: 'qr_code', nullable: true, type: 'varchar' })
  qrCode: string | null;
  @Column({ name: 'checkout_url', nullable: true, type: 'varchar' })
  checkoutUrl: string | null;
  @Column({ name: 'expired_at', type: 'numeric', nullable: true })
  expiredAt: number | null;
  @Column({ name: 'status', enum: PaymentStatus, type: 'enum' })
  status: PaymentStatus;
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
}
