
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WalletCards } from 'lucide-react';
import { api } from '../services/api';

export function RegisterPage() {
  const navigate = useNavigate();

  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [Loading, setLoading] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    if (Password !== ConfirmPassword) {
      setErrorMessage('Konfirmasi password tidak sama.');
      return;
    }

    setLoading(true);

    try {
      await api.register({
        Name,
        Email,
        Password
      });

      navigate('/');
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Pendaftaran gagal.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-5">
      <div className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl sm:p-10">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
          <WalletCards size={22} />
        </div>

        <h1 className="mt-6 text-2xl font-bold">
          Buat akun MyFinance
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Mulai catat keuangan pribadi kamu.
        </p>

        <form onSubmit={submit} className="mt-7 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium">
              Nama
            </span>

            <input
              value={Name}
              onChange={(event) => setName(event.target.value)}
              required
              minLength={2}
              maxLength={100}
              className="w-full rounded-xl border border-slate-200 px-4 py-3"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">
              Email
            </span>

            <input
              value={Email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
              maxLength={191}
              className="w-full rounded-xl border border-slate-200 px-4 py-3"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">
              Password
            </span>

            <input
              value={Password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              required
              minLength={8}
              maxLength={72}
              className="w-full rounded-xl border border-slate-200 px-4 py-3"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">
              Konfirmasi password
            </span>

            <input
              value={ConfirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              type="password"
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3"
            />
          </label>

          {errorMessage && (
            <div className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={Loading}
            className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white disabled:opacity-60"
          >
            {Loading ? 'Membuat akun...' : 'Daftar'}
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-slate-500">
          Sudah punya akun?{' '}
          <Link
            to="/login"
            className="font-semibold text-slate-900 hover:underline"
          >
            Masuk
          </Link>
        </div>
      </div>
    </div>
  );
}
