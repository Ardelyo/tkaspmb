# Ringkasan Pembaruan - Inisialisasi Proyek

Dokumen ini merangkum status dan fitur utama dari proyek "Aplikasi Ujian Online - Topintar" pada rilis awal.

## Versi 1.0 - Rilis Awal

### Fitur Utama yang Diimplementasikan:

1.  **Arsitektur Berbasis Klien (*Client-Side*)**:
    *   Aplikasi dirancang untuk berjalan sepenuhnya di peramban pengguna tanpa ketergantungan pada *backend* atau database.
    *   Memanfaatkan JavaScript `fetch()` API untuk memuat data secara dinamis.

2.  **Konfigurasi Eksternal via JSON**:
    *   Pengaturan ujian (judul, durasi) dapat dikonfigurasi melalui file `config.json`.
    *   Bank soal dipisahkan ke dalam file JSON di dalam direktori `/data`, memungkinkan pengelolaan soal yang mudah dan modular.

3.  **Fungsionalitas Ujian Inti**:
    *   **Pemuatan Soal**: Sistem dapat memuat soal dan pilihan jawaban dari file JSON yang ditentukan.
    *   **Timer (Hitung Mundur)**: Ujian dilengkapi dengan timer yang berjalan sesuai durasi yang ditetapkan di `config.json`.
    *   **Penyimpanan Jawaban**: Jawaban yang dipilih oleh pengguna disimpan di sisi klien selama sesi ujian.
    *   **Proses Penilaian**: Setelah ujian selesai, sistem secara otomatis menghitung skor akhir berdasarkan jawaban yang benar.

### Struktur Proyek:

Struktur file awal telah ditetapkan untuk memisahkan antara tampilan (`index.html`, `style.css`), logika (`script.js`), dan data (`config.json`, `/data/*.json`).

### Catatan Teknis:

*   Proyek ini harus dijalankan melalui server web lokal (misalnya, VS Code Live Server atau `python -m http.server`) untuk menghindari masalah CORS saat memuat file JSON.
*   Proyek ini siap untuk di-*hosting* di layanan *static hosting* manapun (seperti GitHub Pages, Netlify, Vercel).