# Catatan Versi

## 6.3
- Tombol Lupa PIN tidak lagi menghapus data. Sekarang hanya menjelaskan jalan keluarnya.
- Sidik jari (atau kunci layar HP) bisa dipakai membuka aplikasi lewat WebAuthn. Ia membuka kunci enkripsi yang sama, jadi PIN bisa diganti tanpa kehilangan data.
- Kunci data kini berupa kunci utama acak yang dibungkus PIN, sehingga mengganti PIN tidak perlu mengenkripsi ulang seluruh data. Data format lama dimigrasikan otomatis.
- Hapus semua data di Pengaturan wajib memverifikasi PIN atau sidik jari.
- Kalender: kolom tanggal tidak lagi melebar keluar kartu.

## 6.2
- Pembaruan langsung terpakai: service worker kini mengutamakan jaringan dan hanya memakai cache saat offline atau gagal, serta tidak menyimpan halaman "tidak ditemukan".
- Alamat file memakai nomor versi agar tidak terjebak cache lama.
- Muncul pesan penjelasan bila file aplikasi belum termuat lengkap, bukan halaman polos tanpa keterangan.

## 6.1
- Kartu pengingat cadangan dihapus dari halaman Jadwal. Keterangan cadangan terakhir kini tampil di Pengaturan, menu Cadangan dan data.

## 6.0
- Kode dipecah menjadi `index.html`, `style.css`, `app.js`, `boot.js`. Aturan keamanan dikencangkan: tanpa skrip inline dan tanpa font dari luar.
- PIN 8 digit kini mengenkripsi seluruh data (AES-256-GCM). PIN lama otomatis dimigrasikan saat pertama kali dibuka.
- Opsi hapus data otomatis setelah 10 atau 20 kali salah PIN.
- Cadangan bisa diberi kata sandi (terenkripsi).
- Tanggal Hijriah dihitung secara astronomis dengan kriteria MABIMS, lengkap dengan hari besar Islam, tampilan di beranda, kalender, dan agenda, serta koreksi plus atau minus satu hari.
- Data tersimpan dan hasil pemulihan divalidasi lebih ketat.
- Font sistem menggantikan font dari Google.

## 5.0
- PIN 8 digit, transfer antar dompet, transaksi berulang, tren 6 bulan, ekspor CSV.
- Kalender mode agenda, kegiatan sekali saja dan salin ke beberapa hari.
- Pengingat cadangan mingguan.

## 4.0 dan sebelumnya
- Jadwal harian, waktu shalat, kalender dan pengingat, tugas, keuangan, review mingguan, pencarian, dan pengaturan.
