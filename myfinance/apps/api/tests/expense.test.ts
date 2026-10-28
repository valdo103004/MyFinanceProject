import { describe, it, expect } from 'vitest';
import { TransactionSchema } from '../src/validators/transaction';

const expense = {
  Type: 'EXPENSE',
  Amount: 50000,
  CategoryId: 2,
  Description: 'Beli makanan',
  TransactionDate: new Date('2026-10-01'),
};

describe('Unit Test Pengeluaran MyFinance', () => {
  it('menerima pengeluaran valid', () => {
    expect(TransactionSchema.safeParse(expense).success).toBe(true);
  });

  it('menolak pengeluaran bernilai nol', () => {
    expect(TransactionSchema.safeParse({
      ...expense,
      Amount: 0,
    }).success).toBe(false);
  });

  it('menolak nominal negatif', () => {
    expect(TransactionSchema.safeParse({
      ...expense,
      Amount: -50000,
    }).success).toBe(false);
  });

  it('menolak nominal melebihi batas', () => {
    expect(TransactionSchema.safeParse({
      ...expense,
      Amount: 1000000001,
    }).success).toBe(false);
  });

  it('menolak kategori tidak valid', () => {
    expect(TransactionSchema.safeParse({
      ...expense,
      CategoryId: -1,
    }).success).toBe(false);
  });
});
