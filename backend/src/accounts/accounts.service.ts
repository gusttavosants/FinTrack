import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) { }

  async findAccountByUserId(userId: string) {
    return await this.prisma.account.findFirst({
      where: {
        user_id: userId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async getAccountBalance(accountId: string) {
    const account = await this.prisma.account.findUnique({
      where: {
        id: accountId,
      },
      select: {
        balance: true,
        currency: true,
      },
    });

    return account;
  }

  async getAccountMetrics(
    accountId: string,
    startDate?: Date,
    endDate?: Date,
  ) {
    const start = startDate || new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const end = endDate || new Date();

    const transactions = await this.prisma.transaction.findMany({
      where: {
        account_id: accountId,
        date: {
          gte: start,
          lte: end,
        },
      },
    });

    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const netBalance = totalIncome - totalExpense;

    return {
      totalIncome,
      totalExpense,
      netBalance,
      transactionCount: transactions.length,
    };
  }
}
