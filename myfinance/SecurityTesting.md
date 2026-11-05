
# Security Testing dan Hasil Pengujian MyFinance

## 1. Informasi Project

Nama Aplikasi: MyFinance

Versi: MVP Version 1

Repository:
https://github.com/valdo103004/MyFinanceProject

Branch Final: main

Teknologi:
- React dan TypeScript
- Node.js dan Express
- MySQL
- Prisma
- Docker
- Vitest

## 2. Tujuan Pengujian

Pengujian dilakukan untuk memeriksa keamanan
dependency, memastikan aplikasi dapat dijalankan
dari repository GitHub, serta memverifikasi
fungsi utama MyFinance.

## 3. Security Testing

Pengujian keamanan dependency dilakukan
menggunakan perintah:

npm audit

Hasil pemeriksaan:
- 3 high severity vulnerabilities
- Dependency terdampak: deepmerge-ts
- Dependency terkait: @prisma/config dan prisma

Temuan:
Versi deepmerge-ts yang digunakan memiliki
kerentanan stack exhaustion ketika memproses
struktur objek rekursif.

Upaya penanganan:
- Memeriksa dependency menggunakan npm ls.
- Memeriksa konfigurasi dependency overrides.
- Mencoba instalasi ulang dependency.
- Menguji pembaruan dependency melalui npm.

Hasil:
Kerentanan belum berhasil dihilangkan.

Pembaruan paksa ke Prisma 7 tidak dilakukan
karena berpotensi menyebabkan perubahan
yang tidak kompatibel dengan konfigurasi
Prisma pada aplikasi.

Status keamanan:
3 HIGH SEVERITY VULNERABILITIES MASIH TERBUKA.

Risiko tersebut perlu ditindaklanjuti sebelum
aplikasi digunakan pada lingkungan produksi.

## 4. Fresh Clone Testing

Fresh clone dilakukan menggunakan branch
feature/mvp-version-1 dari repository GitHub.

Tahapan pengujian:
1. Clone repository.
2. Instal dependency menggunakan npm ci.
3. Jalankan npm run build.
4. Jalankan seluruh unit test.
5. Siapkan konfigurasi database.
6. Jalankan MySQL melalui Docker.
7. Jalankan Prisma migration.
8. Jalankan aplikasi.

Hasil:
- Fresh clone: PASSED
- Instalasi dependency: PASSED
- Build: PASSED
- Unit test: PASSED
- Prisma migration: PASSED
- Aplikasi berjalan: PASSED

## 5. Hasil Unit Testing

Framework: Vitest

File pengujian:
1. auth.test.ts
2. category.test.ts
3. income.test.ts
4. expense.test.ts
5. dashboard.test.ts

Hasil:
- 5 test files PASSED
- 27 unit tests PASSED
- 0 failed tests

Pengujian mencakup validasi input
dan perhitungan bisnis.

## 6. Pengujian Integrasi

Pengujian dilakukan melalui website MyFinance.

Fitur yang telah diuji:
- Login pengguna
- Menampilkan dashboard
- Membuat kategori pengeluaran
- Menambahkan transaksi pengeluaran
- Menyimpan transaksi ke database
- Memperbarui ringkasan saldo
- Menampilkan riwayat transaksi

Hasil pengujian alur utama: PASSED.

Pengujian menyeluruh terhadap semua
kondisi invalid, loading, kegagalan API,
serta seluruh operasi edit dan hapus
masih perlu diverifikasi secara terpisah.

## 7. Permasalahan dan Penyelesaian

### Masalah 1 — Docker Engine Tidak Aktif

Gejala:
Terminal tidak dapat terhubung ke Docker API.

Penyebab:
Docker Desktop Engine belum aktif.

Penyelesaian:
Menjalankan Docker Desktop hingga Engine aktif.

Hasil:
MySQL dapat berjalan dengan status healthy.

### Masalah 2 — Konfigurasi Environment

Gejala:
File .env.example tidak ditemukan
di lokasi yang sebelumnya digunakan.

Penyelesaian:
Memeriksa lokasi konfigurasi dan menyiapkan
environment backend yang diperlukan.

Hasil:
Prisma berhasil terhubung ke MySQL.

### Masalah 3 — Dependency Security

Gejala:
npm audit melaporkan 3 high vulnerabilities.

Penyebab:
Dependency deepmerge-ts yang digunakan
melalui Prisma.

Penanganan:
Dilakukan pemeriksaan dan percobaan
pembaruan dependency.

Hasil:
Belum terselesaikan dan dicatat
sebagai risiko keamanan terbuka.

## 8. GitHub dan Pull Request

Pengembangan MVP dilakukan pada branch:

feature/mvp-version-1

Pull Request dibuat untuk menggabungkan
hasil pengembangan ke branch main.

Status:
- Pull Request: MERGED
- Build branch main: PASSED
- Unit test branch main: PASSED

## 9. Deployment

Aplikasi telah berhasil dijalankan
pada lingkungan lokal menggunakan:

- Frontend Vite
- Backend Express
- Database MySQL melalui Docker

Deployment publik belum dilakukan.

Lingkungan lokal digunakan sebagai
paket demonstrasi dan pengujian MVP.

## 10. Kesimpulan

Aplikasi MyFinance MVP V1 telah melalui
fresh clone testing, build testing,
unit testing, dan pengujian integrasi
pada alur utama.

Sebanyak 27 unit test berhasil dijalankan
tanpa kegagalan.

Aplikasi berhasil terhubung ke database
dan dapat dijalankan melalui browser.

Namun, hasil security audit masih
menunjukkan tiga kerentanan tingkat high
yang memerlukan tindak lanjut.

Dengan demikian, MVP telah memenuhi
pengujian fungsional yang dilakukan,
tetapi belum dinyatakan bebas dari
kerentanan keamanan.
