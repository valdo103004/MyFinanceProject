import { RequestHandler } from 'express';
import * as CategoryService from '../services/categoryService.js';

export const list: RequestHandler = async (_request, response, next) => {
  try { response.json(await CategoryService.listCategories()); } catch (error) { next(error); }
};

export const create: RequestHandler = async (request, response, next) => {
  try { response.status(201).json(await CategoryService.createCategory(request.body)); } catch (error) { next(error); }
};

export const update: RequestHandler = async (request, response, next) => {
  try { response.json(await CategoryService.updateCategory(Number(request.params.Id), request.body)); } catch (error) { next(error); }
};

export const remove: RequestHandler = async (request, response, next) => {
  try { await CategoryService.deleteCategory(Number(request.params.Id)); response.json({ Message: 'Kategori dihapus.' }); } catch (error) { next(error); }
};
