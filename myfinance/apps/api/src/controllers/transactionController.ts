import { RequestHandler } from 'express';
import * as TransactionService from '../services/transactionService.js';

function getUserId(request: Parameters<RequestHandler>[0]) {
  if (!request.UserId) throw new Error('Unauthorized');
  return request.UserId;
}

export const list: RequestHandler = async (request, response, next) => {
  try { response.json(await TransactionService.listTransactions(getUserId(request), request.query)); } catch (error) { next(error); }
};

export const detail: RequestHandler = async (request, response, next) => {
  try { response.json({ Data: await TransactionService.getTransaction(getUserId(request), Number(request.params.Id)) }); } catch (error) { next(error); }
};

export const create: RequestHandler = async (request, response, next) => {
  try { response.status(201).json({ Data: await TransactionService.createTransaction(getUserId(request), request.body) }); } catch (error) { next(error); }
};

export const update: RequestHandler = async (request, response, next) => {
  try { response.json({ Data: await TransactionService.updateTransaction(getUserId(request), Number(request.params.Id), request.body) }); } catch (error) { next(error); }
};

export const remove: RequestHandler = async (request, response, next) => {
  try { await TransactionService.deleteTransaction(getUserId(request), Number(request.params.Id)); response.json({ Message: 'Transaksi dihapus.' }); } catch (error) { next(error); }
};
