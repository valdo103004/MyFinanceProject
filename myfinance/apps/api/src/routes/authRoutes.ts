import { Router } from 'express';
import { login, logout, me, register } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';
import { authRateLimit } from '../middleware/rateLimit.js';

export const AuthRoutes = Router();
AuthRoutes.post('/register', authRateLimit, register);
AuthRoutes.post('/login', authRateLimit, login);
AuthRoutes.post('/logout', logout);
AuthRoutes.get('/me', requireAuth, me);
