# How to Run — MyFinance

## 1. Deskripsi Aplikasi

MyFinance adalah aplikasi pencatatan keuangan pribadi berbasis web. Aplikasi ini digunakan untuk mengelola pemasukan, pengeluaran, kategori transaksi, dan melihat ringkasan keuangan melalui dashboard.

**Teknologi yang digunakan:**
- Frontend: React, TypeScript, dan Vite
- Backend: Node.js, Express, dan TypeScript
- Database: MySQL 8.4
- ORM: Prisma
- Unit Testing: Vitest
- Database Environment: Docker Compose

## 2. Persyaratan Sistem

Sebelum menjalankan aplikasi, siapkan:

- Node.js versi 20 atau lebih baru
- npm
- Docker Desktop
- Git
- Visual Studio Code atau editor lainnya

## 3. Clone Repository

Buka terminal dan jalankan:

```bash
git clone https://github.com/valdo103004/MyFinanceProject.git
cd MyFinanceProject/myfinance
```

Untuk menggunakan branch pengembangan MVP:

```bash
git switch feature/mvp-version-1
```

## 4. Instalasi Dependency

Jalankan dari folder utama `myfinance`:

```bash
npm ci
```

## 5. Konfigurasi Environment

Salin `.env.example` menjadi `.env` di folder `apps/api`:

```powershell
Copy-Item .env.example apps/api/.env
```

Pastikan `DATABASE_URL` sesuai dengan database lokal:

```env
DATABASE_URL="mysql://myfinance:myfinance@localhost:3307/myfinance"
```

Konfigurasikan variabel environment lainnya sesuai `.env.example`, termasuk secret autentikasi yang kuat.

Jangan mengunggah file `.env` ke GitHub.

## 6. Menjalankan Database

Pastikan Docker Desktop aktif, kemudian jalankan:

```bash
npm run db:up
```

Periksa status container:

```bash
docker compose ps
```

Pastikan MySQL berstatus healthy.

## 7. Prisma Migration dan Seed

Jalankan:

```bash
npm run db:migrate
npm run db:seed
```

Migration digunakan untuk menyiapkan struktur tabel database, sedangkan seed digunakan untuk mengisi data awal aplikasi.

## 8. Menjalankan Aplikasi

Jalankan:

```bash
npm run dev
```

Akses aplikasi melalui:

- Frontend: http://localhost:5173
- Backend: http://localhost:4000
- Health check: http://localhost:4000/health

## 9. Menjalankan Unit Test

Jalankan:

```bash
npm run test -w @myfinance/api
```

Unit test mencakup lima bagian:

1. Pemasukan
2. Pengeluaran
3. Kategori
4. Autentikasi
5. Dashboard

Seluruh unit test wajib menunjukkan status PASSED sebelum aplikasi dinyatakan siap didemonstrasikan.

## 10. Build Aplikasi

Jalankan:

```bash
npm run build
```

Build dinyatakan berhasil apabila seluruh proses selesai tanpa error.

## 11. Pengujian Manual

Lakukan pengujian berikut:

- Registrasi dan login pengguna
- Menambahkan dan mengelola kategori
- Menambahkan pemasukan
- Menambahkan pengeluaran
- Memeriksa perubahan saldo dashboard
- Memeriksa riwayat transaksi
- Memastikan data tetap tersimpan setelah halaman di-refresh

## 12. Troubleshooting

**npm install gagal karena workspace protocol**

Periksa dependency `@myfinance/shared` dalam `package.json`. Pastikan konfigurasi kompatibel dengan npm workspace.

**Database tidak terhubung**

Pastikan Docker Desktop aktif dan `DATABASE_URL` benar.

**Prisma migration gagal**

Periksa konfigurasi database dan izin pengguna MySQL untuk menjalankan migration.

**Build gagal**

Jalankan pemeriksaan TypeScript dan perbaiki error yang ditampilkan:

```bash
npm run build -w @myfinance/api
```

**Unit test gagal**

Jalankan:

```bash
npm run test -w @myfinance/api
```

Periksa nama file, konfigurasi Vitest, dan pesan kegagalannya.
