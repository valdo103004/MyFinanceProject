
import type {
  DashboardResponse,
  Transaction
} from '@myfinance/shared';

import { Prisma } from '../lib/prisma.js';

type ExpenseGroup = {
  CategoryId: number;
  _sum: {
    Amount: unknown;
  };
};

type CategoryItem = {
  Id: number;
  Name: string;
};

function toNumber(value: unknown): number {
  return Number(value ?? 0);
}

function mapTransaction(transaction: any): Transaction {
  return {
    ...transaction,
    Amount: Number(transaction.Amount),
    TransactionDate: transaction.TransactionDate.toISOString().slice(0, 10),
    CreatedAt: transaction.CreatedAt.toISOString(),
    UpdatedAt: transaction.UpdatedAt.toISOString()
  };
}

export async function getDashboard(
  UserId: number
): Promise<DashboardResponse> {
  const [
    income,
    expense,
    totalTransactions,
    groupedExpense,
    recentTransactions
  ] = await Promise.all([
    Prisma.transaction.aggregate({
      where: { UserId, Type: 'INCOME' },
      _sum: { Amount: true }
    }),

    Prisma.transaction.aggregate({
      where: { UserId, Type: 'EXPENSE' },
      _sum: { Amount: true }
    }),

    Prisma.transaction.count({
      where: { UserId }
    }),

    Prisma.transaction.groupBy({
      by: ['CategoryId'],
      where: { UserId, Type: 'EXPENSE' },
      _sum: { Amount: true },
      orderBy: {
        _sum: { Amount: 'desc' }
      }
    }),

    Prisma.transaction.findMany({
      where: { UserId },
      include: { Category: true },
      orderBy: [
        { TransactionDate: 'desc' },
        { Id: 'desc' }
      ],
      take: 6
    })
  ]);

  const TotalIncome = toNumber(income._sum.Amount);
  const TotalExpense = toNumber(expense._sum.Amount);
  const Balance = TotalIncome - TotalExpense;

  const SavingsRate =
    TotalIncome > 0
      ? Math.round((Balance / TotalIncome) * 1000) / 10
      : 0;

  const ExpenseGroups = groupedExpense as ExpenseGroup[];

  const CategoryIds = ExpenseGroups.map(
    (item: ExpenseGroup) => item.CategoryId
  );

  const Categories = await Prisma.category.findMany({
    where: {
      Id: { in: CategoryIds }
    }
  });


const CategoryMap = new Map<number, string>(
  Categories.map((item: CategoryItem): [number, string] => [
    item.Id,
    item.Name
  ])
);
;

  return {
    Balance,
    TotalIncome,
    TotalExpense,
    SavingsRate,
    TotalTransactions: totalTransactions,

    ExpenseByCategory: ExpenseGroups.map(
      (item: ExpenseGroup) => {
        const Amount = toNumber(item._sum.Amount);

        return {
          CategoryId: item.CategoryId,
          CategoryName:
            CategoryMap.get(item.CategoryId) ?? 'Lainnya',
          Amount,
          Percentage:
            TotalExpense > 0
              ? Math.round((Amount / TotalExpense) * 100)
              : 0
        };
      }
    ),

    RecentTransactions: recentTransactions.map(mapTransaction)
  };
}
