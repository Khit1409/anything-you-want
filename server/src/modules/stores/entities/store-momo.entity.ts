import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Store } from './store.entity';

@Entity('store_momo_payments')
@Check(
  'CK_STORE_MOMO_BANKING_REQUIRED',
  ` enabled = false 
    OR
    (
    phone_number IS NOT NULL AND
    owner_name IS NOT NULL
    )
    `,
)
export class StoreMomoPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @OneToOne(() => Store, (store) => store.momoPayment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'store_id' })
  store: Store;
  @Column({
    type: 'varchar',
    name: 'phone_number',
    nullable: true,
    unique: true,
  })
  phoneNumber: string;
  @Column({ type: 'varchar', name: 'owner_name', nullable: true })
  onwerName: string;
  @Column({ name: 'enabled', default: true })
  enabled: boolean;
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
