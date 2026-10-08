import { Transaction } from '../models/Transaction';

export interface TransactionListResponse {
  Data: Transaction[];
  Total: number;
}

export interface TransactionResponse {
  Data: Transaction;
}
