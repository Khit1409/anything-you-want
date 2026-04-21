import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Seller } from './seller.entity';

@Entity('seller_info')
export class SellerInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'avatar' })
  avatar: string;

  @Column({
    name: 'date_of_birth',
    type: 'date',
    nullable: true,
  })
  dateOfBirth: Date;

  /* ============================
     RELATION: OneToOne Seller
  ============================ */

  @OneToOne(() => Seller, (seller) => seller.info, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'seller_id' })
  seller: Seller;
}
