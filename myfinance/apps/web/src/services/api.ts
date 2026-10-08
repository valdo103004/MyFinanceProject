import type { AuthResponse, Category, DashboardResponse, TransactionListResponse, TransactionResponse, TransactionType, User } from '@myfinance/shared';

const BaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BaseUrl}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {})
    }
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.Message ?? 'Terjadi kesalahan pada server.');
  return payload as T;
}

export const api = {
  register: (body: { Name: string; Email: string; Password: string }) => request<AuthResponse>('/api/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body: { Email: string; Password: string }) => request<AuthResponse>('/api/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  logout: () => request<{ Message: string }>('/api/auth/logout', { method: 'POST' }),
  me: () => request<AuthResponse>('/api/auth/me'),
  dashboard: () => request<DashboardResponse>('/api/dashboard'),
  categories: () => request<Category[]>('/api/categories'),
  createCategory: (body: { Name: string; Type: TransactionType }) => request<Category>('/api/categories', { method: 'POST', body: JSON.stringify(body) }),
  updateCategory: (Id: number, body: { Name: string; Type: TransactionType }) => request<Category>(`/api/categories/${Id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteCategory: (Id: number) => request<{ Message: string }>(`/api/categories/${Id}`, { method: 'DELETE' }),
  transactions: (params: URLSearchParams) => request<TransactionListResponse>(`/api/transactions?${params.toString()}`),
  createTransaction: (body: { Type: TransactionType; Amount: number; CategoryId: number; Description: string; TransactionDate: string }) => request<TransactionResponse>('/api/transactions', { method: 'POST', body: JSON.stringify(body) }),
  updateTransaction: (Id: number, body: { Type: TransactionType; Amount: number; CategoryId: number; Description: string; TransactionDate: string }) => request<TransactionResponse>(`/api/transactions/${Id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteTransaction: (Id: number) => request<{ Message: string }>(`/api/transactions/${Id}`, { method: 'DELETE' })
};

export type CurrentUser = User;
