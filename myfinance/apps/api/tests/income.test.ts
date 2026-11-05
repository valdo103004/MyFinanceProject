
import { describe, it, expect } from 'vitest';
import { TransactionSchema } from '../src/validators/transaction';

const income = {
  Type: 'INCOME',
  Amount: 100000,
  CategoryId: 1,
  Description: 'Gaji freelance',
  TransactionDate: new Date('2026-10-01'),
};

describe('Unit Test Pemasukan MyFinance', () => {
  it('menerima pemasukan valid', () => {
    expect(TransactionSchema.safeParse(income).success).toBe(true);
  });

  it('menolak pemasukan bernilai nol', () => {
    expect(TransactionSchema.safeParse({
      ...income,
      Amount: 0,
    }).success).toBe(false);
  });

  it('menolak pemasukan negatif', () => {
    expect(TransactionSchema.safeParse({
      ...income,
      Amount: -10000,
    }).success).toBe(false);
  });

  it('menolak nominal melebihi batas', () => {
    expect(TransactionSchema.safeParse({
      ...income,
      Amount: 1000000001,
    }).success).toBe(false);
  });

  it('menolak deskripsi kosong', () => {
    expect(TransactionSchema.safeParse({
      ...income,
      Description: '',
    }).success).toBe(false);
  });
});
