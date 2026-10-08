import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof ZodError) {
    response.status(400).json({ Message: 'Data tidak valid.', Errors: error.flatten().fieldErrors });
    return;
  }

  const statusByName: Record<string, number> = {
    AuthError: 401,
    NotFoundError: 404,
    ConflictError: 409,
    ValidationError: 400
  };
  const status = statusByName[error?.name] ?? 500;
  if (status === 500) console.error(error);
  response.status(status).json({ Message: error instanceof Error ? error.message : 'Terjadi kesalahan pada server.' });
};
