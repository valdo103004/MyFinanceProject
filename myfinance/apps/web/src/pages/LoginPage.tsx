import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WalletCards } from 'lucide-react';
import { api } from '../services/api';

export function LoginPage() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState('demo@myfinance.local');
  const [Password, setPassword] = useState('Demo123!');
  const [Error, setError] = useState('');
  const [Loading, setLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.login({ Email, Password });
      navigate('/');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login gagal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-5">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">
        <div className="hidden bg-slate-900 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10"><WalletCards size={22} /></div>
            <h1 className="mt-8 text-4xl font-bold tracking-tight">MyFinance</h1>
            <p className="mt-4 max-w-sm leading-7 text-slate-300">Catat pemasukan dan pengeluaran, lalu lihat kondisi keuanganmu dalam satu dashboard.</p>
          </div>
          <div className="text-sm text-slate-400">Aplikasi tugas full-stack P1–P4</div>
        </div>

        <div className="p-7 sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight">Masuk</h2>
          <p className="mt-2 text-sm text-slate-500">Gunakan akun MyFinance kamu.</p>

          <form onSubmit={submit} className="mt-7 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
              <input value={Email} onChange={(event) => setEmail(event.target.value)} type="email" required className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
              <input value={Password} onChange={(event) => setPassword(event.target.value)} type="password" required className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400" />
            </label>
            {Error ? <div className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{Error}</div> : null}
            <button disabled={Loading} className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800 disabled:opacity-60">
              {Loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <div className="mt-5 text-center text-sm text-slate-500">
            Belum punya akun? <Link to="/register" className="font-semibold text-slate-900 hover:underline">Daftar</Link>
          </div>
          <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-xs text-slate-500">
            Demo: <b>demo@myfinance.local</b> / <b>Demo123!</b>
          </div>
        </div>
      </div>
    </div>
  );
}
