import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import type { User } from '@myfinance/shared';
import { Layout } from './components/Layout';
import { api } from './services/api';
import { CategoriesPage } from './pages/CategoriesPage';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { TransactionsPage } from './pages/TransactionsPage';

function ProtectedApp({ User }: { User: User }) {
  return <Layout User={User}><Routes><Route path="/" element={<DashboardPage User={User} />} /><Route path="/transactions" element={<TransactionsPage />} /><Route path="/categories" element={<CategoriesPage />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></Layout>;
}

export default function App() {
  const [User, setUser] = useState<User | null>(null);
  const [Loading, setLoading] = useState(true);

  useEffect(() => { api.me().then((result) => setUser(result.User)).catch(() => setUser(null)).finally(() => setLoading(false)); }, []);
  if (Loading) return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">Memuat MyFinance...</div>;

  return <Routes><Route path="/login" element={User ? <Navigate to="/" replace /> : <LoginPage />} /><Route path="/register" element={User ? <Navigate to="/" replace /> : <RegisterPage />} /><Route path="/*" element={User ? <ProtectedApp User={User} /> : <Navigate to="/login" replace />} /></Routes>;
}
