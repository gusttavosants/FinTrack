import { prisma } from "../lib/prisma";

//BUSCANDO CONTA PELO ID DO USUARIO
export async function findAccountByUserId(userId: string) {
  return await prisma.account.findFirst({
    where: {
      user_id: userId,
    },
  });
}
//funcao PARA PEGAR O SALDO DA CONTA
export async function getAccountBalance(accountId: string) {
  const account = await prisma.account.findUnique({
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

export async function getAccountMetrics(
  accountId: string,
  startDate?: Date,
  endDate?: Date
) {
  // Definir período padrão (mês atual se não especificado)
  const start = startDate || new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  const end = endDate || new Date()

  // Buscar todas as transações do período
  const transactions = await prisma.transaction.findMany({
    where: {
      account_id: accountId,
      date: {
        gte: start, // maior ou igual (>=)
        lte: end,   // menor ou igual (<=)
      },
    },
  })

  // Calcular total de receitas (income)
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0)

  // Calcular total de despesas (expense)
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0)

  // Calcular balanço líquido
  const netBalance = totalIncome - totalExpense

  return {
    totalIncome,
    totalExpense,
    netBalance,
    transactionCount: transactions.length,
  }
}
