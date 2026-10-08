import { RequestHandler } from 'express';
import { AuthCookie, verifyToken } from '../lib/auth.js';

export const requireAuth: RequestHandler = (request, response, next) => {
  try {
    const Token = request.cookies?.[AuthCookie];
    if (!Token) {
      response.status(401).json({ Message: 'Sesi login tidak ditemukan.' });
      return;
    }

    request.UserId = verifyToken(Token);
    next();
  } catch {
    response.status(401).json({ Message: 'Sesi login tidak valid atau sudah kedaluwarsa.' });
  }
};
