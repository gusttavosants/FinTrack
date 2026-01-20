import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { decimalTransformer } from '../transformers/decimal.transformer';
import { User } from './user.entity';
import { Transaction } from './transaction.entity';
import { CreditCard } from './credit-card.entity';

@Entity({ name: 'accounts' })
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id' })
  userId!: string;

  @Column({ name: 'account_number', unique: true })
  accountNumber!: string;

  @Column({ type: 'decimal', transformer: decimalTransformer, default: 0 })
  balance!: number;

  @Column({ name: 'account_type', default: 'checking' })
  accountType!: string;

  @Column({ default: 'BRL' })
  currency!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.accounts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions!: Transaction[];

  @OneToMany(() => CreditCard, (creditCard) => creditCard.account)
  creditCards!: CreditCard[];
}
