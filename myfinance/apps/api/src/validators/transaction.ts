import { z } from 'zod';

export const TransactionSchema = z.object({
  Type: z.enum(['INCOME', 'EXPENSE']),
  Amount: z.coerce.number().positive().max(1000000000),
  CategoryId: z.coerce.number().int().positive(),
  Description: z.string().trim().min(1).max(255),
  TransactionDate: z.coerce.date()
});

export const TransactionQuerySchema = z.object({
  Month: z.string().regex(/^\d{4}-\d{2}$/).optional(),
  Type: z.enum(['INCOME', 'EXPENSE']).optional(),
  CategoryId: z.coerce.number().int().positive().optional()
});
