# Jadwal Harianku

Aplikasi perencana pribadi: jadwal harian, kalender dengan pengingat, tugas kuliah, keuangan, dan review mingguan. Berjalan penuh di browser, tanpa server dan tanpa akun. Bisa dipasang di layar HP (PWA).

## Struktur file

| File | Fungsi |
| --- | --- |
| `index.html` | Kerangka halaman dan aturan keamanan (CSP) |
| `style.css` | Seluruh tampilan |
| `app.js` | Logika aplikasi: jadwal, kalender, tugas, keuangan, Hijriah, review |
| `boot.js` | Penyimpanan data, enkripsi PIN, layar kunci, dan pendaftaran service worker |
| `sw.js` | Service worker agar bisa dibuka tanpa internet |
| `manifest.webmanifest`, `icon-*.png` | Pemasangan sebagai aplikasi |

Urutan muat: `app.js` (hanya mendefinisikan fungsi mulai), lalu `boot.js` yang menyiapkan data dan baru memulai aplikasi setelah PIN benar.

## Memasang lewat GitHub Pages

1. Unggah semua file ke satu repositori.
2. Settings, Pages, pilih branch utama dan folder root.
3. Buka alamat yang diberikan GitHub di Chrome, lalu pilih "Instal aplikasi" atau "Tambahkan ke layar utama".

## Memperbarui

Ganti file yang berubah di repositori, lalu buka aplikasi dua kali: pembukaan pertama mengunduh versi baru di latar belakang, pembukaan kedua memakainya. Naikkan angka `V` di `sw.js` setiap kali ada pembaruan agar cache lama dibersihkan.

## Keamanan

- Aturan CSP ketat: skrip hanya dari file sendiri, tanpa skrip inline, tanpa permintaan ke server luar, tanpa font luar.
- PIN 8 digit mengenkripsi seluruh data dengan AES-256-GCM. Kunci diturunkan dari PIN memakai PBKDF2-SHA256 (200.000 putaran) dengan salt acak. Kunci hanya ada di memori.
- Percobaan PIN salah ditahan setelah 5 kali. Ada opsi hapus data otomatis setelah 10 atau 20 kali salah.
- PIN yang lupa tidak bisa dipulihkan. Buat cadangan secara berkala (menu Pengaturan, Cadangan dan data). Cadangan bisa diberi kata sandi.
- Semua data yang dibaca dari penyimpanan atau hasil pemulihan divalidasi sebelum dipakai.
- Batas yang jujur: enkripsi melindungi data yang tersimpan, bukan saat aplikasi sedang terbuka di depan orang lain.
- Data hanya disimpan di browser perangkat ini. Hanya kunci milik aplikasi yang dibaca atau dihapus, jadi aplikasi lain di alamat yang sama tidak tersentuh.

## Waktu shalat dan tanggal Hijriah

- Waktu shalat dihitung di perangkat dengan metode Kemenag RI (Subuh 20 derajat, Isya 18 derajat, ihtiyat 2 menit). Selisih dengan jadwal resmi sekitar 1 sampai 2 menit.
- Tanggal Hijriah dihitung dari posisi bulan (Meeus) dengan kriteria MABIMS: tinggi hilal minimal 3 derajat dan elongasi minimal 6,4 derajat, diuji di titik paling barat Indonesia. Hasilnya cocok dengan awal bulan resmi pemerintah dari Muharram 1447 sampai Rabiul Awal 1448. Penetapan resmi tetap lewat sidang isbat Kemenag, jadi ada koreksi plus atau minus satu hari di Pengaturan.

## Pengujian

Logika diuji dengan skrip Node untuk perhitungan Hijriah dan waktu shalat, enkripsi dan buka kunci, validasi data berbahaya, dan alur lengkap aplikasi. Belum ada pengujian otomatis di browser sungguhan; langkah berikutnya yang disarankan adalah menambahkannya (misalnya Playwright) lewat GitHub Actions.

## Pengembangan

Jangan menambah fitur sebelum ada kebutuhan nyata dari pemakaian harian. Catat masalah dan ide sebagai Issues di repositori ini.
