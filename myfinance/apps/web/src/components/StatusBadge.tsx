import type { TransactionType } from '@myfinance/shared';

interface StatusBadgeProps {
  Type: TransactionType;
}

export function TypeBadge({ Type }: StatusBadgeProps) {
  const isIncome = Type === 'INCOME';
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${isIncome ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
      {isIncome ? 'Pemasukan' : 'Pengeluaran'}
    </span>
  );
}
