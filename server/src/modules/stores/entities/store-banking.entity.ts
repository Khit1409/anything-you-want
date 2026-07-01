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
@Entity('store_banking_payments')
@Check(
  'CK_STORE_BANKING_REQUIRED',
  ` enabled = false
    OR
    (
        bank_name IS NOT NULL 
        AND account_number IS NOT NULL
        AND account_name IS NOT NULL
    )
  `,
)
export class StoreBankingPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @OneToOne(() => Store, (store) => store.bankPayment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'store_id' })
  store: Store;
  @Column({ name: 'bin', type: 'varchar', nullable: false })
  bin: string;
  @Column({
    name: 'account_number',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  accountNumber: string;
  @Column({
    name: 'account_name',
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  accountName: string;
  @Column({
    name: 'bank_name',
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  bankName: string;
  @Column({
    name: 'enabled',
    default: true,
  })
  enabled: boolean;
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
