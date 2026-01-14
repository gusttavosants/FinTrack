import { z } from "zod";
//LISTA TRANSACOES DO CARTAO
export const getCardTransactionsQuerySchema = z.object({
  month: z.coerce.number().int().min(1).max(12).optional(),
  year: z.coerce.number().int().min(2020).max(2030).optional(),
});
//BUSCA FATURA
export const getCardInvoiceQuerySchema = z.object({
  month: z.coerce.number().int().min(1).max(12).optional(),
  year: z.coerce.number().int().min(2020).max(2030).optional(),
});
//CRIA TIPO TYPESCRIPT
export type GetCardTransactionsQuery = z.infer<
  typeof getCardTransactionsQuerySchema
>;
export type GetCardInvoiceQuery = z.infer<typeof getCardInvoiceQuerySchema>;
