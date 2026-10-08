import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { Env } from './lib/env.js';
import { AuthRoutes } from './routes/authRoutes.js';
import { CategoryRoutes } from './routes/categoryRoutes.js';
import { TransactionRoutes } from './routes/transactionRoutes.js';
import { DashboardRoutes } from './routes/dashboardRoutes.js';
import { requireAuth } from './middleware/auth.js';
import { errorHandler } from './middleware/errorHandler.js';

export const App = express();

App.disable('x-powered-by');
App.use(helmet());
App.use(cors({ origin: Env.FRONTEND_URL, credentials: true }));
App.use(express.json({ limit: '100kb' }));
App.use(cookieParser());

App.get('/health', (_request, response) => response.json({ Status: 'ok', Service: 'MyFinance API' }));
App.use('/api/auth', AuthRoutes);
App.use('/api/categories', requireAuth, CategoryRoutes);
App.use('/api/transactions', requireAuth, TransactionRoutes);
App.use('/api/dashboard', requireAuth, DashboardRoutes);

App.use((_request, response) => response.status(404).json({ Message: 'Endpoint tidak ditemukan.' }));
App.use(errorHandler);
