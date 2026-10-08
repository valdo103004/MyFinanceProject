import bcrypt from 'bcryptjs';
import { PrismaClient, TransactionType } from '@prisma/client';

const Prisma = new PrismaClient();

async function main() {
  const PasswordHash = await bcrypt.hash('Demo123!', 12);
  const User = await Prisma.user.upsert({
    where: { Email: 'demo@myfinance.local' },
    update: { Name: 'Demo User', PasswordHash },
    create: { Name: 'Demo User', Email: 'demo@myfinance.local', PasswordHash }
  });

  const categories = [
    ['Gaji', TransactionType.INCOME],
    ['Uang Saku', TransactionType.INCOME],
    ['Makanan', TransactionType.EXPENSE],
    ['Transportasi', TransactionType.EXPENSE],
    ['Kuliah', TransactionType.EXPENSE],
    ['Hiburan', TransactionType.EXPENSE],
    ['Belanja', TransactionType.EXPENSE],
    ['Lainnya', TransactionType.EXPENSE]
  ] as const;

  for (const [Name, Type] of categories) {
    await Prisma.category.upsert({
      where: { Name_Type: { Name, Type } },
      update: {},
      create: { Name, Type }
    });
  }

  const expenseCategory = await Prisma.category.findUnique({ where: { Name_Type: { Name: 'Makanan', Type: TransactionType.EXPENSE } } });
  const incomeCategory = await Prisma.category.findUnique({ where: { Name_Type: { Name: 'Uang Saku', Type: TransactionType.INCOME } } });

  const existingCount = await Prisma.transaction.count({ where: { UserId: User.Id } });
  if (existingCount === 0 && expenseCategory && incomeCategory) {
    await Prisma.transaction.createMany({
      data: [
        {
          UserId: User.Id,
          CategoryId: incomeCategory.Id,
          Type: TransactionType.INCOME,
          Amount: 2500000,
          Description: 'Uang saku bulanan',
          TransactionDate: new Date()
        },
        {
          UserId: User.Id,
          CategoryId: expenseCategory.Id,
          Type: TransactionType.EXPENSE,
          Amount: 45000,
          Description: 'Makan siang',
          TransactionDate: new Date()
        }
      ]
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await Prisma.$disconnect();
  });
