import { z } from 'zod';

export const CategorySchema = z.object({
  Name: z.string().trim().min(2).max(100),
  Type: z.enum(['INCOME', 'EXPENSE'])
});
