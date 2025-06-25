# Aplikasi Ujian Online - Topintar

Proyek ini adalah sebuah aplikasi web sederhana berbasis klien (*client-side*) untuk menyelenggarakan ujian atau kuis online. Aplikasi ini dirancang untuk menjadi ringan dan mudah dikonfigurasi, dengan soal dan pengaturan yang dimuat dari file JSON eksternal.

## Konsep Proyek

Tujuan utama dari proyek ini adalah menyediakan platform ujian yang minimalis tanpa memerlukan *backend* atau database yang kompleks. Semua logika, mulai dari memuat soal, menampilkan timer, hingga proses penilaian, dijalankan sepenuhnya di peramban (*browser*) pengguna. Hal ini membuatnya sangat mudah untuk di-*hosting* di layanan *static hosting* manapun.

Data soal dan konfigurasi dipisahkan dari kode utama untuk kemudahan pengelolaan:
1.  **Konfigurasi Ujian (`config.json`)**: Mengatur parameter dasar ujian seperti judul, durasi, dan file soal mana yang akan digunakan.
2.  **Bank Soal (`/data/*.json`)**: Setiap file JSON di dalam direktori `/data` dapat berisi satu set soal untuk batch atau mata pelajaran yang berbeda.

## Struktur Proyek

Struktur direktori dan file proyek ini adalah sebagai berikut:

```
/topintar-ujian/
├── index.html
├── style.css
├── script.js
├── config.json
└── /data/
    └── batch-1.json
```

**Penjelasan File:**

*   `index.html`: Merupakan kerangka utama dan titik masuk dari aplikasi web. File ini berisi struktur HTML untuk menampilkan soal, pilihan jawaban, timer, dan elemen antarmuka lainnya.
*   `style.css`: Berisi semua aturan CSS untuk mengatur tampilan dan tata letak aplikasi agar terlihat rapi dan responsif.
*   `script.js`: **(Catatan: Terdapat potensi kesalahan penulisan pada nama file `script.jsss` di konteks awal, nama yang umum digunakan adalah `script.js`)**. File ini adalah inti dari aplikasi. Logika JavaScript di dalamnya bertanggung jawab untuk:
    *   Membaca `config.json` untuk mendapatkan pengaturan ujian.
    *   Memuat soal dari file JSON yang sesuai (misalnya, `data/batch-1.json`).
    *   Menampilkan soal satu per satu.
    *   Menjalankan dan menampilkan hitung mundur waktu (timer).
    *   Menyimpan jawaban pengguna.
    *   Menghitung skor akhir setelah ujian selesai.
*   `config.json`: File konfigurasi utama dalam format JSON. Contoh isinya:
    ```json
    {
      "examTitle": "Ujian Seleksi Batch 1",
      "timeInMinutes": 60,
      "questionFile": "data/batch-1.json"
    }
    ```
*   `/data/batch-1.json`: File bank soal dalam format JSON. Berisi sebuah *array* dari objek-objek soal. Setiap objek memiliki pertanyaan, pilihan jawaban, dan kunci jawaban yang benar. Contoh isinya:
    ```json
    [
      {
        "question": "Apa ibukota dari negara Indonesia?",
        "options": [
          "Bandung",
          "Surabaya",
          "Jakarta",
          "Yogyakarta"
        ],
        "answer": "Jakarta"
      },
      {
        "question": "2 + 2 * 2 = ?",
        "options": [
          "8",
          "6",
          "4",
          "10"
        ],
        "answer": "6"
      }
    ]
    ```

## Cara Menjalankan Proyek

Karena aplikasi ini menggunakan `fetch()` API di JavaScript untuk memuat file JSON lokal, Anda tidak bisa langsung membukanya dari sistem file (`file:///...`). Anda perlu menjalankannya melalui sebuah server web lokal untuk menghindari masalah kebijakan keamanan CORS (*Cross-Origin Resource Sharing*).

1.  **Prasyarat**: Pastikan Anda memiliki Node.js (opsional, untuk `live-server`) atau Python terinstal.

2.  **Unduh Proyek**: Unduh atau *clone* repositori ini ke komputer Anda.

3.  **Jalankan dengan Live Server (VS Code)**:
    *   Buka folder proyek di Visual Studio Code.
    *   Instal ekstensi Live Server.
    *   Klik kanan pada file `index.html` dan pilih "Open with Live Server".

4.  **Jalankan dengan Python**:
    *   Buka terminal atau command prompt.
    *   Arahkan ke direktori utama proyek (`/topintar-ujian/`).
    *   Jalankan salah satu perintah berikut (tergantung versi Python Anda):
      ```bash
      # Untuk Python 3
      python -m http.server
      
      # Untuk Python 2
      python -m SimpleHTTPServer
      ```
    *   Buka peramban Anda dan akses `http://localhost:8000`.

## Kontribusi

Kontribusi untuk pengembangan proyek ini sangat diterima. Anda dapat melakukan *fork* pada repositori ini, membuat *branch* baru untuk fitur atau perbaikan yang Anda kerjakan, dan kemudian mengajukan *Pull Request*.

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT.