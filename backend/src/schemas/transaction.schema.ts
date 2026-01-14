import { z } from "zod";
//LIISTA TRANSACOES
export const getTransactionsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  type: z.enum(["income", "expense"]).optional(),
  category: z.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});
//ANALISA POR CATEGORIA
export const getExpensesByCategorySchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
});

export type GetTransactionsQuery = z.infer<typeof getTransactionsQuerySchema>;
export type GetExpensesByCategory = z.infer<typeof getExpensesByCategorySchema>;
