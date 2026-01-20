import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { decimalTransformer } from '../transformers/decimal.transformer';
import { CreditCard } from './credit-card.entity';

@Entity({ name: 'card_transactions' })
export class CardTransaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'card_id' })
  cardId!: string;

  @Column()
  category!: string;

  @Column({ type: 'decimal', transformer: decimalTransformer })
  amount!: number;

  @Column()
  description!: string;

  @Column()
  merchant!: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date!: Date;

  @Column({ type: 'int', default: 1 })
  installments!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => CreditCard, (card) => card.cardTransactions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'card_id' })
  card!: CreditCard;
}
