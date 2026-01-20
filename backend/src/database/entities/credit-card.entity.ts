import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { decimalTransformer } from '../transformers/decimal.transformer';
import { Account } from './account.entity';
import { CardTransaction } from './card-transaction.entity';

@Entity({ name: 'credit_cards' })
export class CreditCard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'account_id' })
  accountId!: string;

  @Column({ name: 'card_number_last4' })
  cardNumberLast4!: string;

  @Column({ name: 'card_brand' })
  cardBrand!: string;

  @Column({ name: 'card_holder_name' })
  cardHolderName!: string;

  @Column({ name: 'credit_limit', type: 'decimal', transformer: decimalTransformer })
  creditLimit!: number;

  @Column({ name: 'available_limit', type: 'decimal', transformer: decimalTransformer })
  availableLimit!: number;

  @Column({ name: 'current_invoice', type: 'decimal', transformer: decimalTransformer, default: 0 })
  currentInvoice!: number;

  @Column({ name: 'due_date', type: 'int' })
  dueDate!: number;

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => Account, (account) => account.creditCards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' })
  account!: Account;

  @OneToMany(() => CardTransaction, (transaction) => transaction.card)
  cardTransactions!: CardTransaction[];
}
