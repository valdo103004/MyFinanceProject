
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Edit3, Plus, Trash2, X } from 'lucide-react';
import type { Category, TransactionType } from '@myfinance/shared';
import { api } from '../services/api';

export function CategoriesPage() {
  const [Categories, setCategories] = useState<Category[]>([]);
  const [Open, setOpen] = useState(false);
  const [Editing, setEditing] = useState<Category | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [Message, setMessage] = useState('');

  const load = async () => {
    try {
      setCategories(await api.categories());
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Gagal memuat kategori.'
      );
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setMessage('');

    const data = new FormData(event.currentTarget);
    const payload = {
      Name: String(data.get('Name') ?? ''),
      Type: data.get('Type') as TransactionType
    };

    try {
      if (Editing) {
        await api.updateCategory(Editing.Id, payload);
      } else {
        await api.createCategory(payload);
      }

      setOpen(false);
      setEditing(null);
      setMessage('Kategori berhasil disimpan.');
      await load();
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Gagal menyimpan kategori.'
      );
    }
  };

  const remove = async (Id: number) => {
    if (!window.confirm('Yakin ingin menghapus kategori ini?')) {
      return;
    }

    setErrorMessage('');
    setMessage('');

    try {
      await api.deleteCategory(Id);
      setMessage('Kategori berhasil dihapus.');
      await load();
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Gagal menghapus kategori.'
      );
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Kategori
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Atur kategori pemasukan dan pengeluaran.
          </p>
        </div>

        <button
          onClick={() => {
            setEditing(null);
            setErrorMessage('');
            setOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
        >
          <Plus size={16} />
          Tambah kategori
        </button>
      </header>

      {Message && (
        <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {Message}
        </div>
      )}

      {errorMessage && (
        <div className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {errorMessage}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <CategoryGroup
          Title="Pemasukan"
          Items={Categories.filter(
            (category) => category.Type === 'INCOME'
          )}
          onEdit={(item) => {
            setEditing(item);
            setOpen(true);
          }}
          onDelete={remove}
        />

        <CategoryGroup
          Title="Pengeluaran"
          Items={Categories.filter(
            (category) => category.Type === 'EXPENSE'
          )}
          onEdit={(item) => {
            setEditing(item);
            setOpen(true);
          }}
          onDelete={remove}
        />
      </div>

      {Open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-5">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {Editing ? 'Edit kategori' : 'Tambah kategori'}
              </h2>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setEditing(null);
                }}
                className="rounded-xl p-2 hover:bg-slate-100"
              >
                <X />
              </button>
            </div>

            <form onSubmit={save} className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium">
                  Nama kategori
                </span>

                <input
                  name="Name"
                  defaultValue={Editing?.Name ?? ''}
                  required
                  minLength={2}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium">
                  Tipe
                </span>

                <select
                  name="Type"
                  defaultValue={Editing?.Type ?? 'EXPENSE'}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3"
                >
                  <option value="EXPENSE">Pengeluaran</option>
                  <option value="INCOME">Pemasukan</option>
                </select>
              </label>

              <button
                type="submit"
                className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white"
              >
                Simpan
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function CategoryGroup({
  Title,
  Items,
  onEdit,
  onDelete
}: {
  Title: string;
  Items: Category[];
  onEdit: (item: Category) => void;
  onDelete: (Id: number) => Promise<void>;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
      <h2 className="font-semibold">{Title}</h2>

      <div className="mt-4 space-y-2">
        {Items.map((item) => (
          <div
            key={item.Id}
            className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
          >
            <span className="font-medium">{item.Name}</span>

            <div className="flex gap-1">
              <button
                onClick={() => onEdit(item)}
                aria-label="Edit kategori"
                className="rounded-lg p-2 text-slate-500 hover:bg-white"
              >
                <Edit3 size={15} />
              </button>

              <button
                onClick={() => void onDelete(item.Id)}
                aria-label="Hapus kategori"
                className="rounded-lg p-2 text-slate-500 hover:bg-white hover:text-rose-600"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}

        {Items.length === 0 && (
          <div className="py-6 text-sm text-slate-400">
            Belum ada kategori.
          </div>
        )}
      </div>
    </div>
  );
}
