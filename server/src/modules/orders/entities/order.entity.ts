import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderContact } from './order-contact.entity';
import { OrderShipping } from './order-shipping.entity';
import { OrderAddress } from './order-address.entity';
import { OrderPayment } from './order-payment.entity';
import { User } from '../../users/entities/user.entity';
import { Seller } from '../../sellers/entities/seller.entity';
import { Store } from '../../stores/entities/store.entity';

export enum OrderStatus {
  PENDING = 'pending',
  SHIPPING = 'shipping',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  SHIPPING_FAILED = 'shipping_failed',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;
  @Column({ name: 'product_id', type: 'varchar' })
  productId: string;
  @Column({ name: 'thumbnail', type: 'varchar' })
  thumbnail: string;
  @Column({ name: 'sku', type: 'varchar' })
  sku: string;
  @Column({ name: 'totalPrice', type: 'decimal', precision: 12, scale: 2 })
  totalPrice: number;
  @Column({ name: 'quantity', type: 'int' })
  quantity: number;
  @Column({ name: 'price', type: 'decimal', precision: 12, scale: 2 })
  price: number;
  @Column({ name: 'sale', type: 'int' })
  sale: number;
  @Column({ name: 'orderCode', unique: true, generated: 'increment' })
  orderCode: number;
  @OneToOne(() => OrderContact, (contact) => contact.order, {
    onDelete: 'CASCADE',
    cascade: ['insert'],
  })
  contact: OrderContact;
  @OneToOne(() => OrderPayment, (payment) => payment.order, {
    onDelete: 'CASCADE',
    cascade: ['insert'],
  })
  payment: OrderPayment;
  @OneToOne(() => OrderShipping, (shipping) => shipping.order, {
    onDelete: 'CASCADE',
    cascade: ['insert'],
  })
  shipping: OrderShipping;
  @OneToOne(() => OrderAddress, (address) => address.order, {
    onDelete: 'CASCADE',
    cascade: ['insert'],
  })
  address: OrderAddress;
  @Column({
    name: 'status',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;
  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
  @ManyToOne(() => Seller, (seller) => seller.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'seller_id' })
  seller: Seller;
  @ManyToOne(() => Store, (store) => store.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'store_id' })
  store: Store;
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
