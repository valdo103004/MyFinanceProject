import { Router } from 'express';
import * as TransactionController from '../controllers/transactionController.js';

export const TransactionRoutes = Router();
TransactionRoutes.get('/', TransactionController.list);
TransactionRoutes.get('/:Id', TransactionController.detail);
TransactionRoutes.post('/', TransactionController.create);
TransactionRoutes.put('/:Id', TransactionController.update);
TransactionRoutes.delete('/:Id', TransactionController.remove);
