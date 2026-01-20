import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Account } from '../database/entities/account.entity';
import { Transaction } from '../database/entities/transaction.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
  ) {}

  async findAccountByUserId(userId: string) {
    return await this.accountsRepository.findOne({
      where: {
        userId,
      },
    });
  }

  async getAccountBalance(accountId: string) {
    return await this.accountsRepository.findOne({
      where: { id: accountId },
      select: {
        balance: true,
        currency: true,
      },
    });
  }

  async getAccountMetrics(
    accountId: string,
    startDate?: Date,
    endDate?: Date,
  ) {
    const start = startDate || new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const end = endDate || new Date();

    const transactions = await this.transactionsRepository.find({
      where: {
        accountId,
        date: Between(start, end),
      },
    });

    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount ?? 0), 0);

    const totalExpense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount ?? 0), 0);

    const netBalance = totalIncome - totalExpense;

    return {
      totalIncome,
      totalExpense,
      netBalance,
      transactionCount: transactions.length,
    };
  }
}
