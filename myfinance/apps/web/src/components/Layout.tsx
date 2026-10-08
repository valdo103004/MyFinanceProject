import { PropsWithChildren } from 'react';
import { BarChart3, LogOut, ReceiptText, Settings2, WalletCards } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import type { User } from '@myfinance/shared';
import { api } from '../services/api';

interface LayoutProps extends PropsWithChildren {
  User: User;
}

const links = [
  { To: '/', Label: 'Dashboard', Icon: BarChart3 },
  { To: '/transactions', Label: 'Transaksi', Icon: ReceiptText },
  { To: '/categories', Label: 'Kategori', Icon: Settings2 }
];

export function Layout({ User, children }: LayoutProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white lg:block">
        <div className="flex h-full flex-col p-5">
          <div className="flex items-center gap-3 px-2 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <WalletCards size={20} />
            </div>
            <div>
              <div className="font-bold tracking-tight">MyFinance</div>
              <div className="text-xs text-slate-400">Keuangan pribadi</div>
            </div>
          </div>

          <nav className="mt-8 space-y-1">
            {links.map(({ To, Label, Icon }) => (
              <NavLink
                key={To}
                to={To}
                end={To === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`
                }
              >
                <Icon size={18} />
                {Label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl bg-slate-50 p-4">
            <div className="truncate text-sm font-semibold">{User.Name}</div>
            <div className="mt-1 truncate text-xs text-slate-400">{User.Email}</div>
            <button onClick={handleLogout} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </aside>

      <div className="border-b border-slate-200 bg-white lg:hidden">
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white"><WalletCards size={18} /></div>
            <div className="font-bold">MyFinance</div>
          </div>
          <button onClick={handleLogout} className="rounded-xl border border-slate-200 p-2 text-slate-600"><LogOut size={17} /></button>
        </div>
        <nav className="flex gap-2 overflow-x-auto px-5 pb-4">
          {links.map(({ To, Label }) => <NavLink key={To} to={To} end={To === '/'} className={({ isActive }) => `whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium ${isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}>{Label}</NavLink>)}
        </nav>
      </div>

      <main className="lg:pl-64">
        <div className="mx-auto max-w-7xl p-5 sm:p-8">{children}</div>
      </main>
    </div>
  );
}
