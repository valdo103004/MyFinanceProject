
import { useEffect, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Plus,
  RefreshCw,
  Wallet
} from 'lucide-react';
import type { DashboardResponse, User } from '@myfinance/shared';
import { api } from '../services/api';
import { StatCard } from '../components/StatCard';
import { TypeBadge } from '../components/StatusBadge';

interface DashboardPageProps {
  User: User;
}

const money = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value);

export function DashboardPage({ User }: DashboardPageProps) {
  const [Data, setData] = useState<DashboardResponse | null>(null);
  const [Loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const load = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const result = await api.dashboard();
      setData(result);
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Gagal memuat dashboard.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  if (Loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-slate-500">
        Memuat dashboard...
      </div>
    );
  }

  if (errorMessage || !Data) {
    return (
      <div className="rounded-2xl bg-rose-50 p-5 text-rose-700">
        {errorMessage || 'Data dashboard tidak tersedia.'}
      </div>
    );
  }

  return (
    <div className="space-y-7">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm font-medium text-slate-500">
            Selamat datang kembali,
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            {User.Name}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Pantau kondisi keuanganmu dari satu tempat.
          </p>
        </div>

        <button
          onClick={() => void load()}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold shadow-sm hover:bg-slate-50"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          Label="Saldo Saat Ini"
          Value={money(Data.Balance)}
          Helper="Pemasukan - pengeluaran"
        />
        <StatCard
          Label="Total Pemasukan"
          Value={money(Data.TotalIncome)}
          Helper={`${Data.TotalTransactions} transaksi`}
        />
        <StatCard
          Label="Total Pengeluaran"
          Value={money(Data.TotalExpense)}
          Helper="Seluruh transaksi pengeluaran"
        />
        <StatCard
          Label="Savings Rate"
          Value={`${Data.SavingsRate.toFixed(1)}%`}
          Helper="Persentase uang yang tersisa"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-soft">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div>
              <h2 className="font-semibold">
                Transaksi Terbaru
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                6 transaksi paling baru
              </p>
            </div>
            <Plus size={18} className="text-slate-400" />
          </div>

          <div className="divide-y divide-slate-100">
            {Data.RecentTransactions.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-400">
                Belum ada transaksi.
              </div>
            ) : (
              Data.RecentTransactions.map((transaction) => (
                <div
                  key={transaction.Id}
                  className="flex items-center justify-between gap-4 p-5"
                >
                  <div className="min-w-0">
                    <div className="truncate font-medium">
                      {transaction.Description}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                      <TypeBadge Type={transaction.Type} />
                      {transaction.Category?.Name}
                    </div>
                  </div>

                  <div
                    className={`whitespace-nowrap font-semibold ${
                      transaction.Type === 'INCOME'
                        ? 'text-emerald-600'
                        : 'text-rose-600'
                    }`}
                  >
                    {transaction.Type === 'INCOME' ? '+' : '-'}
                    {money(transaction.Amount)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="font-semibold">
            Pengeluaran Berdasarkan Kategori
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Kategori dengan pengeluaran terbesar
          </p>

          <div className="mt-6 space-y-5">
            {Data.ExpenseByCategory.length === 0 ? (
              <div className="py-8 text-center text-sm text-slate-400">
                Belum ada pengeluaran.
              </div>
            ) : (
              Data.ExpenseByCategory.map((item) => (
                <div key={item.CategoryId}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium">
                      {item.CategoryName}
                    </span>
                    <span className="text-slate-500">
                      {money(item.Amount)}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-slate-900"
                      style={{
                        width: `${Math.min(
                          Math.max(item.Percentage, 0),
                          100
                        )}%`
                      }}
                    />
                  </div>

                  <div className="mt-1 text-right text-xs text-slate-400">
                    {item.Percentage}%
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <ArrowUpRight className="text-emerald-600" />
          <div className="mt-4 text-sm text-slate-500">
            Pemasukan
          </div>
          <div className="mt-1 text-lg font-bold">
            {money(Data.TotalIncome)}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <ArrowDownRight className="text-rose-600" />
          <div className="mt-4 text-sm text-slate-500">
            Pengeluaran
          </div>
          <div className="mt-1 text-lg font-bold">
            {money(Data.TotalExpense)}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <Wallet className="text-slate-700" />
          <div className="mt-4 text-sm text-slate-500">
            Saldo
          </div>
          <div className="mt-1 text-lg font-bold">
            {money(Data.Balance)}
          </div>
        </div>
      </section>
    </div>
  );
}
