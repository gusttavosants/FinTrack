import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AccountsModule } from './accounts/accounts.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule, TransactionsModule, AccountsModule],
  providers: [PrismaService],
})
export class AppModule {}
