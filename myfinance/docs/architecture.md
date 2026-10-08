# MyFinance Architecture

## Overview

MyFinance menggunakan arsitektur tiga lapisan utama: frontend, backend API, dan database. Shared package berisi model/domain types yang digunakan bersama oleh frontend dan backend.

```text
User
  ↓
Web Browser
  ↓
React + TypeScript + Vite + Tailwind CSS
  ↓ REST API / JSON + HttpOnly Cookie
Node.js + Express + TypeScript
  ↓
Validation + Business Logic
  ↓
Prisma ORM
  ↓
MySQL
```

## Responsibilities

### Web
Mengelola UI, form, routing, loading state, error state, dan pemanggilan API.

### API
Mengelola authentication, validasi, business logic, ownership check, dan response JSON.

### Prisma
Menjadi penghubung backend dengan MySQL serta menyediakan migration.

### MySQL
Menyimpan User, Category, dan Transaction.

### Shared
Menyimpan interface, enum, dan DTO agar kontrak data frontend/backend tidak diduplikasi.

## Data Flow

```text
Tambah transaksi
 → React form
 → POST /api/transactions
 → Auth middleware
 → Zod validation
 → Transaction service
 → Prisma create
 → MySQL
 → Response JSON
 → UI refresh
```

## Security Boundary

Browser tidak memiliki database credential. `DATABASE_URL` dan `JWT_SECRET` hanya dibaca oleh backend. Authentication token menggunakan HttpOnly cookie.
