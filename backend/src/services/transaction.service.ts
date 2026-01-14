import { prisma } from "../lib/prisma";
import { GetTransactionsQuery } from "../schemas/transaction.schema";

export async function listTransactions(
  accountId: string,
  filters: GetTransactionsQuery
) {
  const { page, limit, type, category, startDate, endDate } = filters;

  // Calcular offset para paginação
  const skip = (page - 1) * limit;

  // Montar condições do WHERE dinamicamente
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
    if (startDate) where.date.gte = startDate;
    if (endDate) where.date.lte = endDate;
  }

  // Buscar transações
  const transactions = await prisma.transaction.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      date: "desc", // Mais recente primeiro
    },
  });

  // Contar total de registros
  const total = await prisma.transaction.count({ where });

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


//Função para buscar transação por ID
export async function getTransactionById(transactionId: string) {
  return await prisma.transaction.findUnique({
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


//Função para agrupar despesas por categoria
export async function getExpensesByCategory(
  accountId: string,
  startDate: Date,
  endDate: Date
) {
  const transactions = await prisma.transaction.findMany({
    where: {
      account_id: accountId,
      type: 'expense', // Só despesas
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      category: true,
      amount: true,
    },
  })

  // Agrupar por categoria
  const grouped = transactions.reduce((acc, transaction) => {
    const category = transaction.category
    const amount = Number(transaction.amount)

    if (!acc[category]) {
      acc[category] = 0
    }

    acc[category] += amount

    return acc
  }, {} as Record<string, number>)

  // Converter para array e ordenar
  const result = Object.entries(grouped)
    .map(([category, total]) => ({
      category,
      total,
    }))
    .sort((a, b) => b.total - a.total) // Maior primeiro

  return result
}

export async function getMonthlyAnalysis(accountId: string, months: number = 6) {
  const endDate = new Date()
  const startDate = new Date()
  startDate.setMonth(startDate.getMonth() - months)

  const transactions = await prisma.transaction.findMany({
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
  })

  // Agrupar por mês
  const monthlyData = transactions.reduce((acc, transaction) => {
    const monthKey = `${transaction.date.getFullYear()}-${String(transaction.date.getMonth() + 1).padStart(2, '0')}`
    
    if (!acc[monthKey]) {
      acc[monthKey] = { income: 0, expense: 0 }
    }

    const amount = Number(transaction.amount)
    
    if (transaction.type === 'income') {
      acc[monthKey].income += amount
    } else {
      acc[monthKey].expense += amount
    }

    return acc
  }, {} as Record<string, { income: number; expense: number }>)

  // Converter para array
  const result = Object.entries(monthlyData).map(([month, data]) => ({
    month,
    income: data.income,
    expense: data.expense,
  }))

  return result
}