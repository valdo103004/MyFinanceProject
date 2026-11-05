
import { describe, it, expect } from 'vitest';
import { CategorySchema } from '../src/validators/category';

const validCategory = {
  Name: 'Makanan',
  Type: 'EXPENSE',
};

describe('Unit Test Kategori MyFinance', () => {
  it('menerima kategori valid', () => {
    expect(CategorySchema.safeParse(validCategory).success).toBe(true);
  });

  it('menolak nama kategori kosong', () => {
    expect(CategorySchema.safeParse({
      ...validCategory,
      Name: '',
    }).success).toBe(false);
  });

  it('menolak tipe kategori tidak valid', () => {
    expect(CategorySchema.safeParse({
      ...validCategory,
      Type: 'OTHER',
    }).success).toBe(false);
  });

  it('menolak nama kategori terlalu panjang', () => {
    expect(CategorySchema.safeParse({
      ...validCategory,
      Name: 'A'.repeat(256),
    }).success).toBe(false);
  });
});
