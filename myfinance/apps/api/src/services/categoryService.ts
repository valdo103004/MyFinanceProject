import type { Category } from '@myfinance/shared';
import { Prisma } from '../lib/prisma.js';
import { CategorySchema } from '../validators/category.js';

export async function listCategories(): Promise<Category[]> {
  return Prisma.category.findMany({ orderBy: [{ Type: 'asc' }, { Name: 'asc' }] }) as unknown as Category[];
}

export async function createCategory(input: unknown): Promise<Category> {
  const Data = CategorySchema.parse(input);
  return Prisma.category.create({ data: Data }) as unknown as Category;
}

export async function updateCategory(Id: number, input: unknown): Promise<Category> {
  const Data = CategorySchema.parse(input);
  return Prisma.category.update({ where: { Id }, data: Data }) as unknown as Category;
}

export async function deleteCategory(Id: number) {
  const usage = await Prisma.transaction.count({ where: { CategoryId: Id } });
  if (usage > 0) {
    const error = new Error('Kategori masih digunakan oleh transaksi dan tidak dapat dihapus.');
    error.name = 'ConflictError';
    throw error;
  }
  return Prisma.category.delete({ where: { Id } });
}
