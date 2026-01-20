import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './account.entity';
import { BankConnection } from './bank-connection.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ name: 'password_hash' })
  passwordHash!: string;

  @Column({ nullable: true, unique: true })
  cpf?: string | null;

  @Column({ nullable: true })
  phone?: string | null;

  @Column({ nullable: true })
  avatar?: string | null;

  @Column({ name: 'reset_password_token', nullable: true })
  resetPasswordToken?: string | null;

  @Column({ name: 'reset_password_expires', type: 'datetime', nullable: true })
  resetPasswordExpires?: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @OneToMany(() => Account, (account) => account.user)
  accounts!: Account[];

  @OneToMany(() => BankConnection, (connection) => connection.user)
  bankConnections!: BankConnection[];
}
