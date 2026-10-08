import { TransactionType } from '../enums/TransactionType';

export interface Transaction {
  Id: number;
  UserId: number;
  CategoryId: number;
  Type: TransactionType;
  Amount: number;
  Description: string;
  TransactionDate: string;
  CreatedAt: string;
  UpdatedAt: string;
  Category?: CategorySummary;
}

export interface CategorySummary {
  Id: number;
  Name: string;
  Type: TransactionType;
}
