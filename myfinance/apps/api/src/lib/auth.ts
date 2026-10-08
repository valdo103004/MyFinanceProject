import jwt from 'jsonwebtoken';
import { Env } from './env.js';

const CookieName = 'myfinance_token';

export function createToken(UserId: number) {
  return jwt.sign({ UserId }, Env.JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(Token: string) {
  const Payload = jwt.verify(Token, Env.JWT_SECRET);
  if (typeof Payload !== 'object' || typeof Payload.UserId !== 'number') {
    throw new Error('Invalid token');
  }
  return Payload.UserId;
}

export const AuthCookie = CookieName;
