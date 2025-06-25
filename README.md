
<div align="center">

```
   ████████╗██╗  ██╗ █████╗
   ╚══██╔══╝██║ ██╔╝██╔══██╗
      ██║   █████╔╝ ███████║
      ██║   ██╔═██╗ ██╔══██║
      ██║   ██║  ██╗██║  ██║
      ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝
```
# **Sistem Ujian Mandiri TOPintar**

**Platform Ujian Online Mandiri yang Aman, Modern, dan Mudah Dikonfigurasi**

</div>

| Status | License | Framework | Code Style |
| :---: | :---: | :---: | :---: |
| ![Status](https://img.shields.io/badge/status-aktif-success) | ![License](https://img.shields.io/badge/license-MIT-blue) | ![Framework](https://img.shields.io/badge/framework-Vanilla%20JS-yellow) | ![Code Style](https://img.shields.io/badge/code%20style-ES6%20Modules-ff69b4) |

---

### **Daftar Isi**
1. [**Tentang Proyek**](#tentang-proyek)
2. [**Fitur Utama**](#fitur-utama)
3. [**Struktur Proyek**](#struktur-proyek)
4. [**Instalasi & Konfigurasi**](#instalasi--konfigurasi)
    - [Prasyarat](#prasyarat)
    - [Menjalankan Aplikasi](#menjalankan-aplikasi)
    - [Konfigurasi `config.json`](#konfigurasi-configjson)
    - [Format Soal `batch-X.json`](#format-soal-batch-xjson)
5. [**Teknologi yang Digunakan**](#teknologi-yang-digunakan)
6. [**Lisensi**](#lisensi)

---

## **Tentang Proyek**

**Sistem Ujian Mandiri TOPintar** adalah sebuah aplikasi web yang dirancang untuk menyelenggarakan ujian atau tes secara mandiri (self-hosted). Aplikasi ini dibangun sepenuhnya menggunakan Vanilla JavaScript (ES6 Modules), HTML5, dan CSS3, tanpa ketergantungan pada framework eksternal yang kompleks. Tujuannya adalah menyediakan platform yang ringan, cepat, aman, dan sangat mudah untuk dikustomisasi sesuai kebutuhan.

Aplikasi ini sangat ideal untuk keperluan:
- Ujian seleksi internal
- Latihan soal (tryout)
- Tes rekrutmen
- Penilaian pengetahuan karyawan

Dengan sistem anti-kecurangan yang terintegrasi dan laporan hasil yang mendetail, aplikasi ini memberikan pengalaman ujian yang profesional dan terpercaya.

---

## **Fitur Utama**

- 🔐 **Akses Terproteksi**: Opsi untuk mengaktifkan kode akses unik untuk memulai sesi ujian.
- 📚 **Batch Soal Dinamis**: Muat paket-paket soal yang berbeda dari file JSON eksternal.
- ⏱️ **Manajemen Waktu**: Timer ujian yang berjalan mundur dengan visualisasi progress bar.
-  cheating **Sistem Anti-Kecurangan**: Mendeteksi aktivitas mencurigakan seperti:
    - Pindah tab atau window (unfocus)
    - Upaya menyalin konten (copy)
    - Klik kanan untuk membuka menu konteks
    - Perubahan ukuran jendela browser
    - Pembukaan Developer Tools (Inspect Element)
- 📊 **Laporan Hasil Detail**: Setelah ujian selesai, laporan lengkap akan ditampilkan berisi:
    - Skor akhir dan predikat (Sangat Baik, Baik, Perlu Ditingkatkan).
    - Rincian jawaban benar, salah, dan tidak dijawab.
    - Analisis performa mendalam untuk setiap kategori soal.
    - Ringkasan pelanggaran yang tercatat selama ujian.
- 💡 **Rekomendasi Personal**: Memberikan saran belajar yang dipersonalisasi berdasarkan kategori soal terlemah.
- 📝 **Mode Review Pembahasan**: Fitur untuk meninjau kembali semua soal, jawaban pengguna, kunci jawaban, dan pembahasan detail.
- 📥 **Unduh Laporan PDF**: Kemampuan untuk mengunduh hasil laporan dalam format PDF yang rapi.
- 🎨 **Branding Mudah**: Ubah judul, sub-judul, dan disclaimer dengan mudah melalui file `config.json`.

---

## **Struktur Proyek**

Proyek ini telah direfaktorisasi ke dalam struktur modular (ES6 Modules) untuk kemudahan pemeliharaan dan skalabilitas.

```
.
├── 📂 data/
│   └── 📜 batch-1.json      # Contoh file data soal
├── 📂 js/
│   ├── 📜 main.js          # Titik masuk utama & orkestrasi aplikasi
│   ├── 📜 api.js           # Mengelola pengambilan data (fetch)
│   ├── 📜 antiCheat.js    # Logika sistem anti-kecurangan
│   ├── 📜 quiz.js         # Logika inti selama ujian berlangsung
│   ├── 📜 report.js       # Logika pembuatan laporan hasil
│   ├── 📜 review.js       # Logika untuk mode review pembahasan
│   ├── 📜 state.js        # Manajemen state terpusat
│   ├── 📜 ui.js           # Mengelola semua manipulasi DOM dan UI
│   └── 📜 utils.js        # Fungsi-fungsi bantuan (helpers)
├── 📜 config.json         # File konfigurasi utama
├── 📜 index.html          # File HTML utama
├── 📜 style.css           # File styling
└── 📜 README.md           # Anda sedang membacanya
```

---

## **Instalasi & Konfigurasi**

### **Prasyarat**
- Browser modern (Chrome, Firefox, Edge, dll.)
- Web server lokal (opsional, tapi direkomendasikan)

### **Menjalankan Aplikasi**
1.  **Clone atau Unduh Repositori**
    ```bash
    git clone https://github.com/username/repo-name.git
    ```
2.  **Jalankan Melalui Web Server (Direkomendasikan)**
    Karena aplikasi ini memuat file JSON (`config.json`, `batch-X.json`) menggunakan `fetch` API, menjalankannya langsung dari file (`file:///...`) dapat menyebabkan error CORS di beberapa browser. Cara terbaik adalah menjalankannya melalui server lokal.
    
    Jika Anda memiliki Python terinstal, cukup jalankan perintah berikut di direktori proyek:
    ```bash
    # Untuk Python 3
    python -m http.server
    
    # Untuk Python 2
    python -m SimpleHTTPServer
    ```
    Kemudian buka `http://localhost:8000` di browser Anda.

3.  **Buka `index.html`**
    Jika Anda tidak ingin menggunakan server lokal, Anda bisa mencoba membuka file `index.html` secara langsung di browser Anda.

### **Konfigurasi `config.json`**
Ini adalah pusat kendali aplikasi Anda.

```json
{
  "branding": {
    "title": "Ujian Mandiri TOPintar",
    "subtitle": "Tes Kemampuan Akademik & Skolastik",
    "disclaimer": "Dengan melanjutkan, Anda setuju untuk mengikuti ujian dengan jujur...",
    "developer": "TOPintar Developer"
  },
  "access": {
    "required": true,
    "validCodes": ["TKA2025", "RAHASIA"]
  },
  "batches": [
    {
      "title": "Batch 1: Campuran",
      "description": "Soal Literasi, Numerasi, dan Sains.",
      "filePath": "data/batch-1.json",
      "status": "active" 
    }
  ],
  "security": {
    "antiCheatEnabled": true,
    "applyToMode": "all"
  }
}
```
- **`branding`**: Ubah teks judul, sub-judul, dan nama pengembang di sini.
- **`access`**:
    - `required`: Set `true` untuk mengaktifkan layar login kode akses.
    - `validCodes`: Daftar kode akses yang diterima.
- **`batches`**: Definisikan satu atau lebih paket soal.
    - `title` & `description`: Tampil di layar pemilihan batch.
    - `filePath`: Path menuju file JSON soal.
    - `status`: `active` atau `locked`.
- **`security`**:
    - `antiCheatEnabled`: `true` untuk mengaktifkan semua fitur monitoring.
    - `applyToMode`: Tentukan mode mana yang akan dimonitor (biasanya `"all"` untuk Ujian Lengkap).

### **Format Soal `batch-X.json`**
Setiap file batch harus berisi array dari objek-objek soal dengan format berikut:

```json
[
  {
    "id": "NUM001",
    "main_category": "Numerasi",
    "category": "Aljabar Dasar",
    "question": "Jika **2x + 5 = 15**, berapakah nilai dari **x**?",
    "options": [
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "correctAnswer": "c",
    "pembahasan": "Untuk menyelesaikan persamaan 2x + 5 = 15, pertama kurangi kedua sisi dengan 5, sehingga menjadi 2x = 10. Kemudian, bagi kedua sisi dengan 2 untuk mendapatkan x = 5."
  }
]
```
- **`id`**: ID unik untuk setiap soal.
- **`main_category`**: Kategori utama (e.g., "Numerasi", "Literasi", "Sains"). Digunakan untuk analisis dan pemilihan mode.
- **`category`**: Sub-kategori yang lebih spesifik.
- **`question`**: Teks pertanyaan. Anda bisa menggunakan format Markdown `**teks tebal**`.
- **`options`**: Array berisi 5 string pilihan jawaban.
- **`correctAnswer`**: Kunci jawaban (`"a"`, `"b"`, `"c"`, `"d"`, atau `"e"`).
- **`pembahasan`**: Teks penjelasan yang akan muncul di mode review.

---

## **Teknologi yang Digunakan**

- **HTML5**
- **CSS3**
- **JavaScript (ES6 Modules)**
- **Font Awesome**: Untuk ikonografi.
- **jsPDF & html2canvas**: Untuk fungsionalitas unduh laporan PDF.

---

## **Lisensi**

Proyek ini dilisensikan di bawah [Lisensi MIT](LICENSE).
