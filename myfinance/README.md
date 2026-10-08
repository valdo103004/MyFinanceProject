# MyFinance

MyFinance adalah aplikasi full-stack untuk membantu mahasiswa mencatat pemasukan dan pengeluaran pribadi melalui dashboard sederhana.

## Stack

- Frontend: React + TypeScript + Vite + Tailwind CSS
- Backend: Node.js + TypeScript + Express
- Database: MySQL 8.4
- ORM: Prisma
- API: REST API
- Shared types: `@myfinance/shared`
- Database development: Docker Compose

## API Utama

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
GET/POST /api/categories
PUT/DELETE /api/categories/:Id
GET/POST /api/transactions
GET/PUT/DELETE /api/transactions/:Id
GET /api/dashboard
GET /api/dashboard/summary
GET /api/dashboard/expense-by-category
```

## Fitur

- Register dan login
- Dashboard saldo, pemasukan, pengeluaran, dan savings rate
- CRUD transaksi
- Filter transaksi berdasarkan bulan, tipe, dan kategori
- CRUD kategori
- Riwayat transaksi terbaru
- Validasi input backend
- Password hashing dengan bcrypt
- JWT melalui HttpOnly cookie
- CORS, Helmet, dan rate limiting
- Pembatasan data berdasarkan user

## Prasyarat

- Node.js 20+
- npm 10+
- Docker Desktop

## Setup

1. Salin `.env.example` menjadi `.env` di root project.
2. Jalankan MySQL:

```bash
npm run db:up
```

3. Install dependency:

```bash
npm install
```

4. Jalankan migration:

```bash
npm run db:migrate
```

5. Isi seed data:

```bash
npm run db:seed
```

6. Jalankan frontend dan backend:

```bash
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:4000
Health check: http://localhost:4000/health

## Demo Account

- Email: `demo@myfinance.local`
- Password: `Demo123!`

## Menjalankan package secara terpisah

```bash
npm run dev -w @myfinance/api
npm run dev -w @myfinance/web
```

## Prisma

```bash
npm run db:studio
```

## Environment

Jangan commit `.env`. Gunakan `.env.example` untuk membagikan nama variable tanpa secret.

## Struktur

```text
myfinance/
  apps/
    web/
    api/
  packages/
    shared/
  docs/
  docker-compose.yml
  .env.example
  package.json
```

## Catatan keamanan

Versi tugas ini menerapkan basic security untuk aplikasi akademik. Untuk production, sebaiknya ditambah CSRF protection, observability, secret management, HTTPS wajib, backup database, dan audit logging.
