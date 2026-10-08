export interface DashboardResponse {
  Balance: number;
  TotalIncome: number;
  TotalExpense: number;
  SavingsRate: number;
  TotalTransactions: number;
  ExpenseByCategory: Array<{
    CategoryId: number;
    CategoryName: string;
    Amount: number;
    Percentage: number;
  }>;
  RecentTransactions: import('../models/Transaction').Transaction[];
}
