import { RequestHandler } from 'express';
import type { AuthResponse } from '@myfinance/shared';
import { AuthCookie } from '../lib/auth.js';
import { Env } from '../lib/env.js';
import * as AuthService from '../services/authService.js';

function setAuthCookie(response: any, Token: string) {
  response.cookie(AuthCookie, Token, { httpOnly: true, sameSite: 'lax', secure: Env.COOKIE_SECURE, maxAge: 7 * 24 * 60 * 60 * 1000, path: '/' });
}

function UserResponse(User: any): AuthResponse {
  return { User: { Id: User.Id, Name: User.Name, Email: User.Email, CreatedAt: User.CreatedAt.toISOString() } };
}

export const register: RequestHandler = async (request, response, next) => {
  try { const result = await AuthService.register(request.body); setAuthCookie(response, result.Token); response.status(201).json(UserResponse(result.User)); } catch (error) { next(error); }
};

export const login: RequestHandler = async (request, response, next) => {
  try { const result = await AuthService.login(request.body); setAuthCookie(response, result.Token); response.json(UserResponse(result.User)); } catch (error) { next(error); }
};

export const me: RequestHandler = async (request, response, next) => {
  try {
    if (!request.UserId) { response.status(401).json({ Message: 'Sesi login tidak ditemukan.' }); return; }
    response.json(UserResponse(await AuthService.getUser(request.UserId)));
  } catch (error) { next(error); }
};

export const logout: RequestHandler = (_request, response) => { response.clearCookie(AuthCookie, { httpOnly: true, sameSite: 'lax', secure: Env.COOKIE_SECURE, path: '/' }); response.json({ Message: 'Berhasil logout.' }); };
