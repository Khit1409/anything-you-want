import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Store } from './store.entity';

@Entity('store_banking_payment_configs')
export class StoreBankingPaymentConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Store, (store) => store.bankPaymentConfig, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'store_id' })
  store: Store;
  @Column({ name: 'client_id', type: 'varchar' })
  clientId: string;
  @Column({ name: 'api_key', type: 'varchar' })
  apiKey: string;
  @Column({ name: 'checksum_key', type: 'varchar' })
  checkSumKey: string;
  @CreateDateColumn({ name: 'createdAt', type: 'timestamptz' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamptz' })
  updatedAt: Date;
}
