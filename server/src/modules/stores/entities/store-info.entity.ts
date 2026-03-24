import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Store } from './store.entity';

@Entity('store_info')
export class StoreInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  avatar: string;

  @Column({ type: 'text', nullable: true })
  thumbnail: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    name: 'phone_number',
    length: 15,
  })
  phoneNumber: string;

  @Column({
    name: 'email_address',
  })
  emailAddress: string;

  /* ============================
     RELATION: OneToOne Store
  ============================ */

  @OneToOne(() => Store, (store) => store.info, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'store_id' })
  store: Store;
}
