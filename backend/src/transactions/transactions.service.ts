import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetTransactionsDto } from './dto/get-transactions.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) { }

  async listTransactions(accountId: string, filters: GetTransactionsDto) {
    const { page = 1, limit = 10, type, category, startDate, endDate } = filters;

    const skip = (page - 1) * limit;

    const where: any = {
      account_id: accountId,
    };

    if (type) {
      where.type = type;
    }

    if (category) {
      where.category = category;
    }

    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate);
      if (endDate) where.date.lte = new Date(endDate);
    }

    const transactions = await this.prisma.transaction.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        date: 'desc',
      },
    });

    const total = await this.prisma.transaction.count({ where });

    return {
      transactions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getTransactionById(transactionId: string) {
    return await this.prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
      include: {
        account: {
          select: {
            account_number: true,
            user_id: true,
          },
        },
      },
    });
  }

  async getExpensesByCategory(accountId: string, startDate: Date, endDate: Date) {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        account_id: accountId,
        type: 'expense',
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        category: true,
        amount: true,
      },
    });

    const grouped = transactions.reduce((acc, transaction) => {
      const category = transaction.category;
      const amount = Number(transaction.amount);

      if (!acc[category]) {
        acc[category] = 0;
      }

      acc[category] += amount;

      return acc;
    }, {} as Record<string, number>);

    const result = Object.entries(grouped)
      .map(([category, total]) => ({
        category,
        total,
      }))
      .sort((a, b) => b.total - a.total);

    return result;
  }

  async getMonthlyAnalysis(accountId: string, months: number = 6) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);

    const transactions = await this.prisma.transaction.findMany({
      where: {
        account_id: accountId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        type: true,
        amount: true,
        date: true,
      },
      orderBy: {
        date: 'asc',
      },
    });

    const monthlyData = transactions.reduce((acc, transaction) => {
      const monthKey = `${transaction.date.getFullYear()}-${String(transaction.date.getMonth() + 1).padStart(2, '0')}`;

      if (!acc[monthKey]) {
        acc[monthKey] = { income: 0, expense: 0 };
      }

      const amount = Number(transaction.amount);

      if (transaction.type === 'income') {
        acc[monthKey].income += amount;
      } else {
        acc[monthKey].expense += amount;
      }

      return acc;
    }, {} as Record<string, { income: number; expense: number }>);

    const result = Object.entries(monthlyData).map(([month, data]) => ({
      month,
      income: data.income,
      expense: data.expense,
    }));

    return result;
  }
}
