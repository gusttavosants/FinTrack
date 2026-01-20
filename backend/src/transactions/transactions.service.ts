import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindManyOptions, Repository } from 'typeorm';
import { Transaction } from '../database/entities/transaction.entity';
import { Account } from '../database/entities/account.entity';
import { GetTransactionsDto } from './dto/get-transactions.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
  ) {}

  async listTransactions(accountId: string, filters: GetTransactionsDto) {
    const { page = 1, limit = 10, type, category, startDate, endDate } = filters;

    const skip = (page - 1) * limit;

    const where: FindManyOptions<Transaction>['where'] = {
      accountId,
      ...(type ? { type } : {}),
      ...(category ? { category } : {}),
    };

    if (startDate || endDate) {
      const start = startDate ? new Date(startDate) : new Date(0);
      const end = endDate ? new Date(endDate) : new Date();
      where['date'] = Between(start, end);
    }

    const [transactions, total] = await this.transactionsRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: { date: 'DESC' },
    });

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
    return await this.transactionsRepository.findOne({
      where: { id: transactionId },
      relations: {
        account: true,
      },
      select: {
        id: true,
        type: true,
        category: true,
        amount: true,
        description: true,
        recipient: true,
        date: true,
        account: {
          accountNumber: true,
          userId: true,
        },
      },
    });
  }

  async getExpensesByCategory(accountId: string, startDate: Date, endDate: Date) {
    const transactions = await this.transactionsRepository.find({
      where: {
        accountId,
        type: 'expense',
        date: Between(startDate, endDate),
      },
      select: {
        category: true,
        amount: true,
      },
    });

    const grouped = transactions.reduce((acc, transaction) => {
      const category = transaction.category;
      const amount = Number(transaction.amount ?? 0);

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

    const transactions = await this.transactionsRepository.find({
      where: {
        accountId,
        date: Between(startDate, endDate),
      },
      select: {
        type: true,
        amount: true,
        date: true,
      },
      order: {
        date: 'ASC',
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
