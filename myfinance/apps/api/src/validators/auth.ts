import { z } from 'zod';

export const RegisterSchema = z.object({
  Name: z.string().trim().min(2).max(100),
  Email: z.string().trim().email().max(191),
  Password: z.string().min(8).max(72)
});

export const LoginSchema = z.object({
  Email: z.string().trim().email().max(191),
  Password: z.string().min(1).max(72)
});
