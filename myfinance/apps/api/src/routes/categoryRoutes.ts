import { Router } from 'express';
import * as CategoryController from '../controllers/categoryController.js';

export const CategoryRoutes = Router();
CategoryRoutes.get('/', CategoryController.list);
CategoryRoutes.post('/', CategoryController.create);
CategoryRoutes.put('/:Id', CategoryController.update);
CategoryRoutes.delete('/:Id', CategoryController.remove);
