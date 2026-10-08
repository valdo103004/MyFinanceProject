import { Router } from 'express';
import { dashboard } from '../controllers/dashboardController.js';

export const DashboardRoutes = Router();
DashboardRoutes.get('/', dashboard);
DashboardRoutes.get('/summary', dashboard);
DashboardRoutes.get('/expense-by-category', dashboard);
