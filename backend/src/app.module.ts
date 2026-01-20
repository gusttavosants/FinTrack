import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AccountsModule } from './accounts/accounts.module';
import { env } from './lib/env';

function resolveSqlitePath(databaseUrl: string) {
  if (databaseUrl.startsWith('file:')) {
    const relativePath = databaseUrl.replace('file:', '');
    return join(__dirname, '..', relativePath);
  }

  return databaseUrl;
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: resolveSqlitePath(env.DATABASE_URL),
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    TransactionsModule,
    AccountsModule,
  ],
})
export class AppModule {}
