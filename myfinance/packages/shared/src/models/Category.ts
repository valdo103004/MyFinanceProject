import { TransactionType } from '../enums/TransactionType';

export interface Category {
  Id: number;
  Name: string;
  Type: TransactionType;
  CreatedAt: string;
}
