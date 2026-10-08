import { Prisma } from '../lib/prisma.js';
import type { Transaction, TransactionListResponse } from '@myfinance/shared';
import { TransactionQuerySchema, TransactionSchema } from '../validators/transaction.js';

const transactionInclude = { Category: true } as const;

function mapTransaction(transaction: any): Transaction {
  return {
    ...transaction,
    Amount: Number(transaction.Amount),
    TransactionDate: transaction.TransactionDate.toISOString().slice(0, 10),
    CreatedAt: transaction.CreatedAt.toISOString(),
    UpdatedAt: transaction.UpdatedAt.toISOString()
  };
}

export async function listTransactions(UserId: number, input: unknown): Promise<TransactionListResponse> {
  const Query = TransactionQuerySchema.parse(input);
  const where: any = { UserId };
  if (Query.Type) where.Type = Query.Type;
  if (Query.CategoryId) where.CategoryId = Query.CategoryId;
  if (Query.Month) {
    const [year, month] = Query.Month.split('-').map(Number);
    where.TransactionDate = {
      gte: new Date(Date.UTC(year, month - 1, 1)),
      lt: new Date(Date.UTC(year, month, 1))
    };
  }

  const [Data, Total] = await Promise.all([
    Prisma.transaction.findMany({ where, include: transactionInclude, orderBy: [{ TransactionDate: 'desc' }, { Id: 'desc' }] }),
    Prisma.transaction.count({ where })
  ]);
  return { Data: Data.map(mapTransaction), Total };
}

export async function getTransaction(UserId: number, Id: number): Promise<Transaction> {
  const Result = await Prisma.transaction.findFirst({ where: { Id, UserId }, include: transactionInclude });
  if (!Result) {
    const error = new Error('Transaksi tidak ditemukan.');
    error.name = 'NotFoundError';
    throw error;
  }
  return mapTransaction(Result);
}

export async function createTransaction(UserId: number, input: unknown): Promise<Transaction> {
  const Data = TransactionSchema.parse(input);
  const Category = await Prisma.category.findUnique({ where: { Id: Data.CategoryId } });
  if (!Category || Category.Type !== Data.Type) {
    const error = new Error('Kategori tidak sesuai dengan tipe transaksi.');
    error.name = 'ValidationError';
    throw error;
  }
  const Result = await Prisma.transaction.create({ data: { ...Data, UserId }, include: transactionInclude });
  return mapTransaction(Result);
}

export async function updateTransaction(UserId: number, Id: number, input: unknown): Promise<Transaction> {
  const Data = TransactionSchema.parse(input);
  const Existing = await Prisma.transaction.findFirst({ where: { Id, UserId } });
  if (!Existing) {
    const error = new Error('Transaksi tidak ditemukan.');
    error.name = 'NotFoundError';
    throw error;
  }
  const Category = await Prisma.category.findUnique({ where: { Id: Data.CategoryId } });
  if (!Category || Category.Type !== Data.Type) {
    const error = new Error('Kategori tidak sesuai dengan tipe transaksi.');
    error.name = 'ValidationError';
    throw error;
  }
  const Result = await Prisma.transaction.update({ where: { Id }, data: Data, include: transactionInclude });
  return mapTransaction(Result);
}

export async function deleteTransaction(UserId: number, Id: number) {
  const Existing = await Prisma.transaction.findFirst({ where: { Id, UserId } });
  if (!Existing) {
    const error = new Error('Transaksi tidak ditemukan.');
    error.name = 'NotFoundError';
    throw error;
  }
  await Prisma.transaction.delete({ where: { Id } });
}
