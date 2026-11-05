
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Edit3, Plus, Trash2, X } from 'lucide-react';
import type {
  Category,
  Transaction,
  TransactionType
} from '@myfinance/shared';
import { api } from '../services/api';
import { TypeBadge } from '../components/StatusBadge';

const money = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value);

const today = () => {
  const date = new Date();
  const localDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  );
  return localDate.toISOString().slice(0, 10);
};

export function TransactionsPage() {
  const [Transactions, setTransactions] = useState<Transaction[]>([]);
  const [Categories, setCategories] = useState<Category[]>([]);

  const [Type, setType] = useState<'' | TransactionType>('');
  const [CategoryId, setCategoryId] = useState('');
  const [Month, setMonth] = useState(today().slice(0, 7));

  const [Open, setOpen] = useState(false);
  const [Editing, setEditing] = useState<Transaction | null>(null);

  const [FormType, setFormType] = useState<TransactionType>(
    'EXPENSE' as TransactionType
  );

  const [FormCategoryId, setFormCategoryId] = useState('');
  const [ErrorMessage, setErrorMessage] = useState('');
  const [Message, setMessage] = useState('');
  const [Loading, setLoading] = useState(true);
  const [FormLoading, setFormLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const params = new URLSearchParams({ Month });

      if (Type) params.set('Type', Type);
      if (CategoryId) params.set('CategoryId', CategoryId);

      const [transactionResult, categoryResult] =
        await Promise.all([
          api.transactions(params),
          api.categories()
        ]);

      setTransactions(transactionResult.Data);
      setCategories(categoryResult);
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Gagal memuat transaksi.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, [Month, Type, CategoryId]);

  const FormCategories = Categories.filter(
    category => category.Type === FormType
  );

  const openCreate = () => {
    setEditing(null);
    setFormType('EXPENSE' as TransactionType);
    setFormCategoryId(
      String(
        Categories.find(
          category => category.Type === 'EXPENSE'
        )?.Id ?? ''
      )
    );
    setErrorMessage('');
    setOpen(true);
  };

  const openEdit = (transaction: Transaction) => {
    setEditing(transaction);
    setFormType(transaction.Type);
    setFormCategoryId(String(transaction.CategoryId));
    setErrorMessage('');
    setOpen(true);
  };

  useEffect(() => {
    if (
      !FormCategories.some(
        category => String(category.Id) === FormCategoryId
      )
    ) {
      setFormCategoryId(String(FormCategories[0]?.Id ?? ''));
    }
  }, [FormType, Categories, FormCategoryId]);

  const closeModal = () => {
    setOpen(false);
    setEditing(null);
  };

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (FormLoading) return;

    setFormLoading(true);
    setErrorMessage('');
    setMessage('');

    const data = new FormData(event.currentTarget);

    const payload = {
      Type: FormType,
      Amount: Number(data.get('Amount')),
      CategoryId: Number(FormCategoryId),
      Description: String(data.get('Description') ?? ''),
      TransactionDate: String(data.get('TransactionDate') ?? '')
    };

    if (
      !Number.isFinite(payload.Amount) ||
      payload.Amount <= 0 ||
      payload.Amount > 1000000000
    ) {
      setErrorMessage('Nominal harus antara Rp1 dan Rp1.000.000.000.');
      setFormLoading(false);
      return;
    }

    if (!FormCategoryId || payload.CategoryId <= 0) {
      setErrorMessage('Pilih kategori yang valid.');
      setFormLoading(false);
      return;
    }

    if (!payload.Description.trim()) {
      setErrorMessage('Keterangan tidak boleh kosong.');
      setFormLoading(false);
      return;
    }

    try {
      if (Editing) {
        await api.updateTransaction(Editing.Id, payload);
      } else {
        await api.createTransaction(payload);
      }

      closeModal();
      setMessage('Transaksi berhasil disimpan.');
      await load();
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Gagal menyimpan transaksi.'
      );
    } finally {
      setFormLoading(false);
    }
  };

  const remove = async (Id: number) => {
    if (!window.confirm('Yakin ingin menghapus transaksi ini?')) {
      return;
    }

    setErrorMessage('');
    setMessage('');

    try {
      await api.deleteTransaction(Id);
      setMessage('Transaksi berhasil dihapus.');
      await load();
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Gagal menghapus transaksi.'
      );
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Transaksi
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Kelola pemasukan dan pengeluaran pribadi.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          <Plus size={16} />
          Tambah transaksi
        </button>
      </header>

      {Message && (
        <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {Message}
        </div>
      )}

      {ErrorMessage && (
        <div className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {ErrorMessage}
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-3">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
            Bulan
          </span>
          <input
            type="month"
            value={Month}
            onChange={event => setMonth(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
            Tipe
          </span>
          <select
            value={Type}
            onChange={event =>
              setType(event.target.value as '' | TransactionType)
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
          >
            <option value="">Semua tipe</option>
            <option value="INCOME">Pemasukan</option>
            <option value="EXPENSE">Pengeluaran</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
            Kategori
          </span>
          <select
            value={CategoryId}
            onChange={event => setCategoryId(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
          >
            <option value="">Semua kategori</option>
            {Categories.map(category => (
              <option key={category.Id} value={category.Id}>
                {category.Name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-5 py-4">Tanggal</th>
                <th className="px-5 py-4">Keterangan</th>
                <th className="px-5 py-4">Kategori</th>
                <th className="px-5 py-4">Tipe</th>
                <th className="px-5 py-4 text-right">Nominal</th>
                <th className="px-5 py-4 text-right">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {Loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-slate-400"
                  >
                    Memuat transaksi...
                  </td>
                </tr>
              ) : Transactions.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-slate-400"
                  >
                    Belum ada transaksi pada filter ini.
                  </td>
                </tr>
              ) : (
                Transactions.map(transaction => (
                  <tr
                    key={transaction.Id}
                    className="hover:bg-slate-50"
                  >
                    <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                      {transaction.TransactionDate}
                    </td>

                    <td className="px-5 py-4 font-medium">
                      {transaction.Description}
                    </td>

                    <td className="px-5 py-4 text-slate-500">
                      {transaction.Category?.Name}
                    </td>

                    <td className="px-5 py-4">
                      <TypeBadge Type={transaction.Type} />
                    </td>

                    <td
                      className={`px-5 py-4 text-right font-semibold ${
                        transaction.Type === 'INCOME'
                          ? 'text-emerald-600'
                          : 'text-rose-600'
                      }`}
                    >
                      {transaction.Type === 'INCOME' ? '+' : '-'}
                      {money(transaction.Amount)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(transaction)}
                          aria-label="Edit transaksi"
                          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                        >
                          <Edit3 size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => void remove(transaction.Id)}
                          aria-label="Hapus transaksi"
                          className="rounded-lg p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {Open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-5">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  {Editing ? 'Edit transaksi' : 'Tambah transaksi'}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Isi data transaksi dengan benar.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Tutup"
                className="rounded-xl p-2 hover:bg-slate-100"
              >
                <X />
              </button>
            </div>

            <form
              key={Editing?.Id ?? 'new'}
              onSubmit={save}
              className="mt-6 space-y-4"
            >
              <label className="block">
                <span className="mb-2 block text-sm font-medium">
                  Tipe
                </span>
                <select
                  value={FormType}
                  onChange={event =>
                    setFormType(event.target.value as TransactionType)
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3"
                >
                  <option value="EXPENSE">Pengeluaran</option>
                  <option value="INCOME">Pemasukan</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium">
                  Nominal
                </span>
                <input
                  name="Amount"
                  type="number"
                  min="1"
                  max="1000000000"
                  step="1"
                  defaultValue={Editing?.Amount ?? ''}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium">
                  Kategori
                </span>
                <select
                  value={FormCategoryId}
                  onChange={event =>
                    setFormCategoryId(event.target.value)
                  }
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3"
                >
                  {FormCategories.map(category => (
                    <option key={category.Id} value={category.Id}>
                      {category.Name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium">
                  Keterangan
                </span>
                <input
                  name="Description"
                  defaultValue={Editing?.Description ?? ''}
                  required
                  maxLength={255}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium">
                  Tanggal
                </span>
                <input
                  name="TransactionDate"
                  type="date"
                  defaultValue={Editing?.TransactionDate ?? today()}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3"
                />
              </label>

              <button
                type="submit"
                disabled={FormLoading || !FormCategoryId}
                className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white disabled:opacity-60"
              >
                {FormLoading ? 'Menyimpan...' : 'Simpan transaksi'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
