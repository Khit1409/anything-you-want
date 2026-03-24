import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Seller } from './seller.entity';

@Entity('seller_address')
export class SellerAddress {
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

  @ManyToOne(() => Seller, (seller) => seller.addresses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'seller_id' })
  seller: Seller;
}
