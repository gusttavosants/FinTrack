import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { GetTransactionsDto } from './dto/get-transactions.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get()
  async listTransactions(
    @Query() filters: GetTransactionsDto,
    @Param('accountId') accountId: string,
  ) {
    return this.transactionsService.listTransactions(accountId, filters);
  }

  @Get(':id')
  async getTransactionById(@Param('id') id: string) {
    return this.transactionsService.getTransactionById(id);
  }

  @Get('analytics/expenses-by-category')
  async getExpensesByCategory(
    @Param('accountId') accountId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.transactionsService.getExpensesByCategory(
      accountId,
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Get('analytics/monthly')
  async getMonthlyAnalysis(
    @Param('accountId') accountId: string,
    @Query('months') months?: number,
  ) {
    return this.transactionsService.getMonthlyAnalysis(accountId, months);
  }
}
