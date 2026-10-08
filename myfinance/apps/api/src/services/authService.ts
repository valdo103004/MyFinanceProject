import bcrypt from 'bcryptjs';
import { Prisma } from '../lib/prisma.js';
import { LoginSchema, RegisterSchema } from '../validators/auth.js';
import { createToken } from '../lib/auth.js';
import type { User } from '@myfinance/shared';

export async function register(input: unknown) {
  const Data = RegisterSchema.parse(input);
  const ExistingUser = await Prisma.user.findUnique({ where: { Email: Data.Email.toLowerCase() } });
  if (ExistingUser) {
    const error = new Error('Email sudah digunakan.');
    error.name = 'ConflictError';
    throw error;
  }

  const PasswordHash = await bcrypt.hash(Data.Password, 12);
  const User = await Prisma.user.create({
    data: { Name: Data.Name, Email: Data.Email.toLowerCase(), PasswordHash }
  });
  return { User, Token: createToken(User.Id) };
}

export async function login(input: unknown) {
  const Data = LoginSchema.parse(input);
  const User = await Prisma.user.findUnique({ where: { Email: Data.Email.toLowerCase() } });
  const IsValid = User ? await bcrypt.compare(Data.Password, User.PasswordHash) : false;
  if (!User || !IsValid) {
    const error = new Error('Email atau password salah.');
    error.name = 'AuthError';
    throw error;
  }

  return { User, Token: createToken(User.Id) };
}

export async function getUser(UserId: number): Promise<User & { PasswordHash: string }> {
  return Prisma.user.findUniqueOrThrow({ where: { Id: UserId } }) as unknown as User & { PasswordHash: string };
}
