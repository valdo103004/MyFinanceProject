
# Checklist MVP — MyFinance

## Informasi Project

- Nama aplikasi: MyFinance
- Versi: MVP Version 1
- Repository: https://github.com/valdo103004/MyFinanceProject
- Branch: feature/mvp-version-1
- Frontend: React + TypeScript + Vite
- Backend: Express + TypeScript
- Database: MySQL + Prisma
- Unit Testing: Vitest

## 1. User Story dan Acceptance Criteria

### US-01 — Registrasi dan Login

Sebagai pengguna, saya ingin membuat akun dan login
agar dapat mengakses data keuangan pribadi.

- [ ] Registrasi dengan data valid berhasil
- [ ] Email tidak valid ditolak
- [ ] Password registrasi kurang dari 8 karakter ditolak
- [ ] Login menggunakan kredensial benar berhasil
- [ ] Kredensial salah ditolak

Unit test: `auth.test.ts`

### US-02 — Kategori Transaksi

Sebagai pengguna, saya ingin mengelola kategori
agar transaksi dapat dikelompokkan.

- [ ] Kategori valid diterima
- [ ] Nama kategori kosong ditolak
- [ ] Tipe kategori tidak valid ditolak
- [ ] Kategori dapat ditambahkan
- [ ] Kategori dapat diedit dan dihapus

Unit test: `category.test.ts`

### US-03 — Pencatatan Pemasukan

Sebagai pengguna, saya ingin mencatat pemasukan
agar dapat mengetahui jumlah uang masuk.

- [ ] Nominal pemasukan positif diterima
- [ ] Nominal nol atau negatif ditolak
- [ ] Deskripsi kosong ditolak
- [ ] Data pemasukan tersimpan di database
- [ ] Total pemasukan pada dashboard bertambah

Unit test: `income.test.ts`

### US-04 — Pencatatan Pengeluaran

Sebagai pengguna, saya ingin mencatat pengeluaran
agar dapat memantau penggunaan uang.

- [ ] Pengeluaran valid diterima
- [ ] Nominal nol atau negatif ditolak
- [ ] Kategori tidak valid ditolak
- [ ] Pengeluaran tersimpan di database
- [ ] Saldo berkurang sesuai pengeluaran

Unit test: `expense.test.ts`

### US-05 — Dashboard Keuangan

Sebagai pengguna, saya ingin melihat ringkasan
keuangan agar mengetahui kondisi keuangan.

- [ ] Total pemasukan dihitung dengan benar
- [ ] Total pengeluaran dihitung dengan benar
- [ ] Saldo dihitung dengan benar
- [ ] Data kosong ditangani
- [ ] Ringkasan dashboard sesuai data transaksi

Unit test: `dashboard.test.ts`

## 2. Checklist Unit Test

- [x] income.test.ts — PASSED
- [x] expense.test.ts — PASSED
- [x] category.test.ts — PASSED
- [x] auth.test.ts — PASSED
- [x] dashboard.test.ts — PASSED

Status berdasarkan hasil unit test yang
telah dijalankan selama pengembangan.

Catatan:
Unit test yang tersedia terutama menguji validasi
input dan fungsi perhitungan. Integrasi API,
database, dan UI perlu pengujian tambahan.

## 3. Checklist Build

- [x] Error TypeScript backend diperbaiki
- [x] Build dilaporkan berhasil
- [x] Lima file unit test dilaporkan PASSED
- [ ] Fresh clone berhasil
- [ ] Aplikasi hasil fresh clone berhasil dijalankan

## 4. Pengujian Manual

- [ ] Registrasi pengguna baru
- [ ] Login dan logout
- [ ] Menambahkan kategori
- [ ] Mengedit dan menghapus kategori
- [ ] Menambahkan pemasukan
- [ ] Menambahkan pengeluaran
- [ ] Memeriksa saldo dashboard
- [ ] Memeriksa filter transaksi
- [ ] Memeriksa data setelah refresh
- [ ] Menguji input tidak valid
- [ ] Menguji loading dan pesan error

## 5. Git Commits

Production code:
221983d — fix: improve transaction validation
and dashboard calculations

Unit test:
899cfc9 — test: add dashboard balance
edge case tests

## 6. Bukti Pengujian

Bukti yang perlu disiapkan:

- Screenshot hasil unit test All Passed
- Screenshot hasil build berhasil
- Screenshot halaman login
- Screenshot dashboard
- Screenshot penambahan transaksi
- Screenshot riwayat transaksi
- Video demo aplikasi

## 7. Status Akhir

MVP sudah memiliki implementasi fitur inti,
unit test, dan riwayat Git commits.

Status penyelesaian penuh:
BELUM DIVERIFIKASI.

Checklist manual, pengujian regresi,
dan fresh clone harus diselesaikan sebelum
MVP dinyatakan siap dikumpulkan.
