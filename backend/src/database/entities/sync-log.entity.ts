import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sync_logs' })
export class SyncLog {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'connection_id' })
  connectionId!: string;

  @Column()
  status!: string;

  @Column({ nullable: true })
  message?: string | null;

  @CreateDateColumn({ name: 'synced_at' })
  syncedAt!: Date;
}
