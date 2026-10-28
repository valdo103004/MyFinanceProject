
import { describe, it, expect } from 'vitest';
import { calculateDashboard } from '../src/services/dashboardCalculation';

describe('Unit Test Dashboard MyFinance', () => {
  it('menghitung total pemasukan dengan benar', () => {
    const result = calculateDashboard([
      { Type: 'INCOME', Amount: 100000 },
      { Type: 'INCOME', Amount: 50000 },
    ]);

    expect(result.totalIncome).toBe(150000);
  });

  it('menghitung total pengeluaran dengan benar', () => {
    const result = calculateDashboard([
      { Type: 'EXPENSE', Amount: 30000 },
      { Type: 'EXPENSE', Amount: 20000 },
    ]);

    expect(result.totalExpense).toBe(50000);
  });

  it('menghitung saldo akhir dengan benar', () => {
    const result = calculateDashboard([
      { Type: 'INCOME', Amount: 200000 },
      { Type: 'EXPENSE', Amount: 75000 },
    ]);

    expect(result.balance).toBe(125000);
  });

  it('menghasilkan nilai nol jika belum ada transaksi', () => {
    const result = calculateDashboard([]);

    expect(result.totalIncome).toBe(0);
    expect(result.totalExpense).toBe(0);
    expect(result.balance).toBe(0);
    expect(result.transactionCount).toBe(0);
  });

  it('menghitung jumlah transaksi dengan benar', () => {
    const result = calculateDashboard([
      { Type: 'INCOME', Amount: 100000 },
      { Type: 'EXPENSE', Amount: 25000 },
      { Type: 'EXPENSE', Amount: 10000 },
    ]);

    expect(result.transactionCount).toBe(3);
    expect(result.balance).toBe(65000);
  });
});
