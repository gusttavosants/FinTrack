import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('accounts')
@UseGuards(JwtAuthGuard)
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Get(':userId')
  async findAccountByUserId(@Param('userId') userId: string) {
    return this.accountsService.findAccountByUserId(userId);
  }

  @Get(':accountId/balance')
  async getAccountBalance(@Param('accountId') accountId: string) {
    return this.accountsService.getAccountBalance(accountId);
  }

  @Get(':accountId/metrics')
  async getAccountMetrics(
    @Param('accountId') accountId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.accountsService.getAccountMetrics(
      accountId,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }
}
