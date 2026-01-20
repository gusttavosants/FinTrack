import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'bank_connections' })
export class BankConnection {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id' })
  userId!: string;

  @Column()
  provider!: string;

  @Column({ name: 'item_id' })
  itemId!: string;

  @Column({ name: 'access_token', nullable: true })
  accessToken?: string | null;

  @Column()
  status!: string;

  @Column({ name: 'last_sync', type: 'datetime', nullable: true })
  lastSync?: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.bankConnections)
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
