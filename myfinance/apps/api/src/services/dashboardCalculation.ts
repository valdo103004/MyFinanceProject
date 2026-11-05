
export type FinanceTransaction = {
  Type: 'INCOME' | 'EXPENSE';
  Amount: number;
};

export function calculateDashboard(
  transactions: FinanceTransaction[]
) {
  let totalIncome = 0;
  let totalExpense = 0;

  for (const transaction of transactions) {
    if (transaction.Type === 'INCOME') {
      totalIncome += transaction.Amount;
    } else {
      totalExpense += transaction.Amount;
    }
  }

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    transactionCount: transactions.length,
  };
}
