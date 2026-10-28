
import { describe, it, expect } from 'vitest';
import { RegisterSchema, LoginSchema } from '../src/validators/auth';

describe('Unit Test Autentikasi MyFinance', () => {
  it('menerima data registrasi valid', () => {
    const result = RegisterSchema.safeParse({
      Name: 'Valdo',
      Email: 'valdo@example.com',
      Password: 'Password123!',
    });

    expect(result.success).toBe(true);
  });

  it('menolak email registrasi tidak valid', () => {
    const result = RegisterSchema.safeParse({
      Name: 'Valdo',
      Email: 'email-salah',
      Password: 'Password123!',
    });

    expect(result.success).toBe(false);
  });

  it('menolak password registrasi kurang dari 8 karakter', () => {
    const result = RegisterSchema.safeParse({
      Name: 'Valdo',
      Email: 'valdo@example.com',
      Password: '123',
    });

    expect(result.success).toBe(false);
  });

  it('menolak nama registrasi kosong', () => {
    const result = RegisterSchema.safeParse({
      Name: '',
      Email: 'valdo@example.com',
      Password: 'Password123!',
    });

    expect(result.success).toBe(false);
  });

  it('menerima format login valid', () => {
    const result = LoginSchema.safeParse({
      Email: 'valdo@example.com',
      Password: 'Password123!',
    });

    expect(result.success).toBe(true);
  });

  it('menolak password login kosong', () => {
    const result = LoginSchema.safeParse({
      Email: 'valdo@example.com',
      Password: '',
    });

    expect(result.success).toBe(false);
  });
});
