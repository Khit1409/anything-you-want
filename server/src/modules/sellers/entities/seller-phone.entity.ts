import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Seller } from './seller.entity';

export enum SellerPhoneType {
  COMPANY = 'company',
  INDIVIDUAL = 'individual',
}
@Entity('seller_phones')
export class SellerPhone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'phone_number',
    length: 10,
  })
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: SellerPhoneType,
    default: SellerPhoneType.INDIVIDUAL,
  })
  type: SellerPhoneType;
  /* ============================
     RELATION: Many Phones -> One Seller
  ============================ */

  @ManyToOne(() => Seller, (seller) => seller.phones, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'seller_id' })
  seller: Seller;
}
