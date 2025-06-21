// --- DATA SOAL LENGKAP (115 SOAL) ---
const allQuestions = [
    // Literasi: Sinonim (1-15)
    { id: 1, main_category: 'Literasi', category: 'Sinonim', question: 'Siklus', options: ['Daur', 'Program', 'Proses', 'Tesis'], correctAnswer: 'a' },
    { id: 2, main_category: 'Literasi', category: 'Sinonim', question: 'Loka', options: ['Tujuan', 'Kerja', 'Tempat', 'Rencana'], correctAnswer: 'c' },
    { id: 3, main_category: 'Literasi', category: 'Sinonim', question: 'Random', options: ['Urut', 'Serasi', 'Sesuai', 'Acak'], correctAnswer: 'd' },
    { id: 4, main_category: 'Literasi', category: 'Sinonim', question: 'Dekade', options: ['5 tahun', '10 tahun', '25 tahun', '100 tahun'], correctAnswer: 'b' },
    { id: 5, main_category: 'Literasi', category: 'Sinonim', question: 'Donasi', options: ['Permintaan', 'Hambatan', 'Bantuan', 'Hadiah'], correctAnswer: 'c' },
    { id: 6, main_category: 'Literasi', category: 'Sinonim', question: 'Kedap', options: ['Rapat', 'Rongga', 'Semu', 'Gelap'], correctAnswer: 'a' },
    { id: 7, main_category: 'Literasi', category: 'Sinonim', question: 'Residu', options: ['Racun', 'Kendala', 'Isi', 'Sisa'], correctAnswer: 'd' },
    { id: 8, main_category: 'Literasi', category: 'Sinonim', question: 'Caraka', options: ['Tamu', 'Undangan', 'Utusan', 'Raja'], correctAnswer: 'c' },
    { id: 9, main_category: 'Literasi', category: 'Sinonim', question: 'Eksklusif', options: ['Umum', 'Khusus', 'Biasa', 'Wajar'], correctAnswer: 'b' },
    { id: 10, main_category: 'Literasi', category: 'Sinonim', question: 'Skeptis', options: ['Yakin', 'Siap', 'Susah', 'Ragu'], correctAnswer: 'd' },
    { id: 11, main_category: 'Literasi', category: 'Sinonim', question: 'Awam', options: ['Pemula', 'Ahli', 'Juara', 'Jago'], correctAnswer: 'a' },
    { id: 12, main_category: 'Literasi', category: 'Sinonim', question: 'Aktual', options: ['Lama', 'Tinggal', 'Terbaru', 'Agenda'], correctAnswer: 'c' },
    { id: 13, main_category: 'Literasi', category: 'Sinonim', question: 'Insentif', options: ['Rutin', 'Tambahan', 'Uang', 'Hadiah'], correctAnswer: 'b' },
    { id: 14, main_category: 'Literasi', category: 'Sinonim', question: 'Konstan', options: ['Goyang', 'Rubah', 'Lekat', 'Stabil'], correctAnswer: 'd' },
    { id: 15, main_category: 'Literasi', category: 'Sinonim', question: 'Misteri', options: ['Umum', 'Rahasia', 'Aturan', 'Tradisi'], correctAnswer: 'b' },
    // Literasi: Antonim (16-30)
    { id: 16, main_category: 'Literasi', category: 'Antonim', question: 'Maya', options: ['Khayal', 'Nyata', 'Imajinasi', 'Impian'], correctAnswer: 'b' },
    { id: 17, main_category: 'Literasi', category: 'Antonim', question: 'Makar', options: ['Khianat', 'Berontak', 'Senang', 'Setia'], correctAnswer: 'd' },
    { id: 18, main_category: 'Literasi', category: 'Antonim', question: 'Jompo', options: ['Muda', 'Wreda', 'Tua', 'Sebaya'], correctAnswer: 'a' },
    { id: 19, main_category: 'Literasi', category: 'Antonim', question: 'Mini', options: ['Kecil', 'Jumbo', 'Kerdil', 'Sederhana'], correctAnswer: 'b' },
    { id: 20, main_category: 'Literasi', category: 'Antonim', question: 'Nyenyak', options: ['Lelap', 'Kantuk', 'Malam', 'Insomnia'], correctAnswer: 'd' },
    { id: 21, main_category: 'Literasi', category: 'Antonim', question: 'Pra', options: ['Histori', 'Sebelum', 'Pasca', 'Antara'], correctAnswer: 'c' },
    { id: 22, main_category: 'Literasi', category: 'Antonim', question: 'Vertikal', options: ['Horisontal', 'Plural', 'Lurus', 'Bengkok'], correctAnswer: 'a' },
    { id: 23, main_category: 'Literasi', category: 'Antonim', question: 'Fana', options: ['Sementara', 'Dunia', 'Sekarang', 'Abadi'], correctAnswer: 'd' },
    { id: 24, main_category: 'Literasi', category: 'Antonim', question: 'Kekang', options: ['Terbatas', 'Bebas', 'Kurung', 'Penjara'], correctAnswer: 'b' },
    { id: 25, main_category: 'Literasi', category: 'Antonim', question: 'Monolog', options: ['Dialog', 'Prolog', 'Epilog', 'Babak'], correctAnswer: 'a' },
    { id: 26, main_category: 'Literasi', category: 'Antonim', question: 'Fiksi', options: ['Khayal', 'Imajinasi', 'Mimpi', 'Fakta'], correctAnswer: 'd' },
    { id: 27, main_category: 'Literasi', category: 'Antonim', question: 'Kerut', options: ['Wajah', 'Halus', 'Melar', 'Lebar'], correctAnswer: 'c' },
    { id: 28, main_category: 'Literasi', category: 'Antonim', question: 'Bontot', options: ['Ragil', 'Sulung', 'Bungsu', 'Akhir'], correctAnswer: 'b' },
    { id: 29, main_category: 'Literasi', category: 'Antonim', question: 'Labil', options: ['Stabil', 'Goyah', 'Rapuh', 'Agil'], correctAnswer: 'a' },
    { id: 30, main_category: 'Literasi', category: 'Antonim', question: 'Preambule', options: ['Pembuka', 'Pengantar', 'Penutup', 'Keterangan'], correctAnswer: 'c' },
    // Literasi: Kelompok Kata (31-40)
    { id: 31, main_category: 'Literasi', category: 'Kelompok Kata', question: 'Carilah satu pilihan kata yang tidak berkaitan dengan kata lainnya!', options: ['Yunani', 'Mali', 'London', 'Finlandia'], correctAnswer: 'c' },
    { id: 32, main_category: 'Literasi', category: 'Kelompok Kata', question: 'Carilah satu pilihan kata yang tidak berkaitan dengan kata lainnya!', options: ['Emas', 'Yen', 'Poundsterling', 'Ringgit'], correctAnswer: 'a' },
    { id: 33, main_category: 'Literasi', category: 'Kelompok Kata', question: 'Carilah satu pilihan kata yang tidak berkaitan dengan kata lainnya!', options: ['Ayam', 'Kambing', 'Sapi', 'Singa'], correctAnswer: 'd' },
    { id: 34, main_category: 'Literasi', category: 'Kelompok Kata', question: 'Carilah satu pilihan kata yang tidak berkaitan dengan kata lainnya!', options: ['Mahabharata', 'Ramayana', 'Tantular', 'Sutasoma'], correctAnswer: 'c' },
    { id: 35, main_category: 'Literasi', category: 'Kelompok Kata', question: 'Carilah satu pilihan kata yang tidak berkaitan dengan kata lainnya!', options: ['Osaka', 'Kairo', 'Tripoli', 'Seoul'], correctAnswer: 'a' },
    { id: 36, main_category: 'Literasi', category: 'Kelompok Kata', question: 'Carilah satu pilihan kata yang tidak berkaitan dengan kata lainnya!', options: ['Gamelan', 'Angklung', 'Gendang', 'Rencong'], correctAnswer: 'd' },
    { id: 37, main_category: 'Literasi', category: 'Kelompok Kata', question: 'Carilah satu pilihan kata yang tidak berkaitan dengan kata lainnya!', options: ['MPR', 'DPR', 'BPD', 'DPD'], correctAnswer: 'c' },
    { id: 38, main_category: 'Literasi', category: 'Kelompok Kata', question: 'Carilah satu pilihan kata yang tidak berkaitan dengan kata lainnya!', options: ['Prambanan', 'Borobudur', 'Kedukan Bukit', 'Muara Takus'], correctAnswer: 'c' },
    { id: 39, main_category: 'Literasi', 'category': 'Kelompok Kata', question: 'Carilah satu pilihan kata yang tidak berkaitan dengan kata lainnya!', options: ['Persebaya', 'Pertamina', 'Persija', 'Gresik United'], correctAnswer: 'b' },
    { id: 40, main_category: 'Literasi', category: 'Kelompok Kata', question: 'Carilah satu pilihan kata yang tidak berkaitan dengan kata lainnya!', options: ['Bapak', 'Masinis', 'Dokter', 'Polisi'], correctAnswer: 'a' },
    // Literasi: Analogi (41-50)
    { id: 41, main_category: 'Literasi', category: 'Analogi', question: 'Masinis : Kereta Api = .... : ....', options: ['Bus : Sopir', 'Pilot : Pesawat Terbang', 'Becak : Delman', 'Guru : Murid'], correctAnswer: 'b' },
    { id: 42, main_category: 'Literasi', category: 'Analogi', question: 'Matahari : Siang = .... : Malam', options: ['Hujan', 'Pelangi', 'Gelap', 'Bulan'], correctAnswer: 'd' },
    { id: 43, main_category: 'Literasi', category: 'Analogi', question: 'Jawa : Majapahit = .... : ....', options: ['Gowa : Sulawesi', 'Demak : Jawa', 'Sumatera : Sriwijaya', 'Jawa : Ternate'], correctAnswer: 'c' },
    { id: 44, main_category: 'Literasi', category: 'Analogi', question: 'Jam : Menit = .... : ....', options: ['Minggu : Hari', 'Minggu : Bulan', 'Detik : Menit', 'Minggu : Senin'], correctAnswer: 'a' },
    { id: 45, main_category: 'Literasi', category: 'Analogi', question: 'Bromo : Gunung = Kapuas : ....', options: ['Danau', 'Benteng', 'Sungai', 'Tumbuhan'], correctAnswer: 'c' },
    { id: 46, main_category: 'Literasi', category: 'Analogi', question: 'Harimau : Karnivora = .... : ....', options: ['Katak : Amphibi', 'Reptil : Ayam', 'Kuda : Aves', 'Herbivora : Kelinci'], correctAnswer: 'a' },
    { id: 47, main_category: 'Literasi', category: 'Analogi', question: 'Mandau : Senjata = .... : ....', options: ['Alat Musik : Rebana', 'Rencong : Keris', 'Gadang : Sumatera Barat', 'Gambus : Alat Musik'], correctAnswer: 'd' },
    { id: 48, main_category: 'Literasi', category: 'Analogi', question: 'Selasa : Senin = Juni : ....', options: ['Juli', 'Agustus', 'Mei', 'April'], correctAnswer: 'c' },
    { id: 49, main_category: 'Literasi', category: 'Analogi', question: 'Pedas : Sambal = .... : ....', options: ['Harum : Melati', 'Matahari : Panas', 'Hidung : Bau', 'Kecap : Manis'], correctAnswer: 'a' },
    { id: 50, main_category: 'Literasi', category: 'Analogi', question: 'Finlandia : Eropa = .... : ....', options: ['Kanada : Eropa', 'Asia : India', 'Mali : Afrika', 'Bolivia : Eropa'], correctAnswer: 'c' },
    // Numerasi: Hitung Cepat (51-60)
    { id: 51, main_category: 'Numerasi', category: 'Hitung Cepat', question: '0,27 - 0,196 = ....', options: ['0,034', '0,054', '0,064', '0,074'], correctAnswer: 'd' },
    { id: 52, main_category: 'Numerasi', category: 'Hitung Cepat', question: '13% dari 250 adalah ....', options: ['28', '32,5', '34', '36,5'], correctAnswer: 'b' },
    { id: 53, main_category: 'Numerasi', category: 'Hitung Cepat', question: '√49 x (436 - 398) = ....', options: ['266', '326', '436', '466'], correctAnswer: 'a' },
    { id: 54, main_category: 'Numerasi', category: 'Hitung Cepat', question: '7,4 + 17% + 1,38 = .... (Asumsi 17% = 0.17)', options: ['7.85', '7.95', '8.85', '8.95'], correctAnswer: 'd' },
    { id: 55, main_category: 'Numerasi', category: 'Hitung Cepat', question: 'Hasil dari 87 + 14 + 67 + 72 - 93 adalah ....', options: ['127', '131', '147', '151'], correctAnswer: 'c' },
    { id: 56, main_category: 'Numerasi', category: 'Hitung Cepat', question: '(101.150 : 14) + 6.350 = ....', options: ['13.575', '14.625', '14.850', '15.175'], correctAnswer: 'a' },
    { id: 57, main_category: 'Numerasi', category: 'Hitung Cepat', question: '(0,19 + 12%) x 890.000 = .... (Asumsi 12% = 0.12)', options: ['245.300', '265.900', '275.900', '285.300'], correctAnswer: 'c' },
    { id: 58, main_category: 'Numerasi', category: 'Hitung Cepat', question: '6 1/8 - 3 1/2 = ....', options: ['2 3/8', '2 5/8', '3 3/8', '3 5/8'], correctAnswer: 'b' },
    { id: 59, main_category: 'Numerasi', category: 'Hitung Cepat', question: '23,7 - 13,9 + 4,6 = ....', options: ['9,4', '11,4', '12,4', '14,4'], correctAnswer: 'd' },
    { id: 60, main_category: 'Numerasi', category: 'Hitung Cepat', question: '(13 x 6) + 29 - 78 = ....', options: ['26', '27', '29', '30'], correctAnswer: 'c' },
    // Numerasi: Deret Hitung (61-70)
    { id: 61, main_category: 'Numerasi', category: 'Deret Hitung', question: '5, 15, 25, 35, ...., ....', options: ['30, 40', '45, 55', '40, 45', '40, 50'], correctAnswer: 'b' },
    { id: 62, main_category: 'Numerasi', category: 'Deret Hitung', question: '2, 3, 5, 7, 11, ...., ....', options: ['12, 14', '13, 15', '13, 17', '12, 15'], correctAnswer: 'c' },
    { id: 63, main_category: 'Numerasi', category: 'Deret Hitung', question: '1, 4, 9, 16, ...., 36.', options: ['18', '20', '25', '30'], correctAnswer: 'c' },
    { id: 64, main_category: 'Numerasi', category: 'Deret Hitung', question: '5, 2, 10, 4, 15, ...., ....', options: ['6, 20', '20, 6', '8, 20', '20, 8'], correctAnswer: 'a' },
    { id: 65, main_category: 'Numerasi', category: 'Deret Hitung', question: '1, 2, 2, 3, 3, 3, 4, 4, 4, ....', options: ['3', '4', '5', '6'], correctAnswer: 'b' },
    { id: 66, main_category: 'Numerasi', category: 'Deret Hitung', question: '2, 3, 5, 8, 13, ....', options: ['15', '16', '18', '21'], correctAnswer: 'd' },
    { id: 67, main_category: 'Numerasi', category: 'Deret Hitung', question: '2, 5, 4, 25, ...., 625', options: ['125', '8', '16', '275'], correctAnswer: 'c' },
    { id: 68, main_category: 'Numerasi', category: 'Deret Hitung', question: '5, 9, 10, 12, 15, 15, ...., ....', options: ['14, 18', '18, 15', '18, 20', '20, 18'], correctAnswer: 'd' },
    { id: 69, main_category: 'Numerasi', category: 'Deret Hitung', question: '2, 3, 4, 6, 8, ....', options: ['12', '10', '9', '5'], correctAnswer: 'a' },
    { id: 70, main_category: 'Numerasi', category: 'Deret Hitung', question: '25, 100, 75, 90, 125, ...., ....', options: ['80, 100', '175, 80', '80, 175', '100, 175'], correctAnswer: 'c' },
    // Numerasi: Matematika (71-80)
    { id: 71, main_category: 'Numerasi', category: 'Matematika', question: 'Sekolah Edo berjarak 3 kilometer dari rumahnya. Jika Edo mampu berjalan 4 kilometer setiap jamnya, waktu yang dibutuhkan Edo untuk berjalan pulang-pergi selama 6 hari adalah ....', options: ['6 jam', '7 jam', '8 jam', '9 jam'], correctAnswer: 'd' },
    { id: 72, main_category: 'Numerasi', category: 'Matematika', question: 'Bu Tadi membeli 4 karung beras seharga Rp680.000,-. Masing-masing karung memiliki berat 1 kuintal. Jika Bu Tadi menjual beras dengan harga Rp2.300,- per kilogram, keuntungan yang akan di dapat Bu Tadi adalah ....', options: ['Rp200.000,-', 'Rp220.000,-', 'Rp240.000,-', 'Rp260.000,-'], correctAnswer: 'c' },
    { id: 73, main_category: 'Numerasi', category: 'Matematika', question: 'Pak Tono membeli satu kotak kancing baju. Kemudian digunakannya 4/9 bagian untuk membuat baju. Jika kancing yang digunakan sebanyak 72 buah, maka isi kancing pada kotak yang utuh adalah .... buah.', options: ['162', '180', '182', '200'], correctAnswer: 'a' },
    { id: 74, main_category: 'Numerasi', category: 'Matematika', question: 'Untuk membangun sebuah gudang selama 12 hari diperlukan 6 orang tukang bangunan. Berapakah tukang bangunan yang dibutuhkan agar gudang selesai dalam waktu 3 hari?', options: ['12 orang', '18 orang', '24 orang', '32 orang'], correctAnswer: 'c' },
    { id: 75, main_category: 'Numerasi', category: 'Matematika', question: 'Dalam penerimaan rapor di kelasnya Lia menduduki peringkat 12 dari atas, dan juga 12 dari bawah. Ini berarti jumlah siswa dalam kelas adalah .... siswa.', options: ['23', '24', '25', '27'], correctAnswer: 'a' },
    { id: 76, main_category: 'Numerasi', category: 'Matematika', question: 'Sebuah kardus memiliki panjang 20 cm dengan lebar 8 cm. Jika tinggi kardus setengah dari panjang kardus, berapakah volume kardus tersebut?', options: ['800 cm³', '1.200 cm³', '1.400 cm³', '1.600 cm³'], correctAnswer: 'd' },
    { id: 77, main_category: 'Numerasi', category: 'Matematika', question: 'Yosi menjual sebuah buku dengan harga Rp40.250,-. Jika dalam setiap penjualan Yosi mendapatkan keuntungan sebesar 15%, berapakah harga beli buku tersebut?', options: ['Rp32.500,-', 'Rp35.000,-', 'Rp36.000,-', 'Rp37.500,-'], correctAnswer: 'b' },
    { id: 78, main_category: 'Numerasi', category: 'Matematika', question: 'Sebuah mobil menempuh jarak 1.170 km dalam waktu 13 jam. Manakah yang bukan merupakan kecepatan mobil tersebut?', options: ['2.000 m/menit', '90 km/jam', '1.500 m/menit', '25 m/detik'], correctAnswer: 'a' },
    { id: 79, main_category: 'Numerasi', category: 'Matematika', question: 'Perbandingan uang Yuni dan uang Ratna adalah 3 : 4. Jumlah uang mereka adalah Rp122.500,-. Banyak uang Yuni adalah ....', options: ['Rp47.500,-', 'Rp52.500,-', 'Rp55.500,-', 'Rp57.500,-'], correctAnswer: 'b' },
    { id: 80, main_category: 'Numerasi', category: 'Matematika', question: 'Dua buah roda berputar dengan kecepatan yang berbeda. Saat roda pertama berputar 6 kali, roda kedua berputar 9 kali. Jika roda pertama berputar sebanyak 24 kali, roda kedua akan berputar sebanyak.... kali.', options: ['27', '36', '45', '54'], correctAnswer: 'b' },
    // Sains (81-90)
    { id: 81, main_category: 'Sains', category: 'Sains', question: 'Larutan cuka yang kita kenal dalam kehidupan sehari-hari memiliki kandungan asam ....', options: ['Sitrat', 'Asetat', 'Klorida', 'Nitrat'], correctAnswer: 'b' },
    { id: 82, main_category: 'Sains', category: 'Sains', question: 'Sebuah benda dikatakan bergerak lurus beraturan apabila ....', options: ['Menempuh lintasan lurus dengan kelajuan yang menurun', 'Menempuh lintasan lurus dengan kelajuan yang tidak berubah', 'Menempuh lintasan lurus dengan kelajuan yang meningkat dengan bertahap', 'Menempuh lintasan lurus dengan kelajuan yang naik turun'], correctAnswer: 'b' },
    { id: 83, main_category: 'Sains', category: 'Sains', question: 'Berdasarkan gambar, cara pembuatan magnet tersebut adalah dengan .... (Gambar menunjukkan paku dililit kawat yang terhubung ke baterai)', options: ['Menggosok', 'Memberi aliran arus listrik', 'Induksi', 'Konveksi'], correctAnswer: 'a' }, // Kunci jawaban dari PDF adalah 'a', meskipun gambar menunjukkan 'b'
    { id: 84, main_category: 'Sains', category: 'Sains', question: 'Jamur atau fungi dapat digunakan untuk bahan pembuatan makanan di bawah ini, kecuali ....', options: ['Tempe', 'Keju', 'Tape', 'Agar-agar'], correctAnswer: 'd' },
    { id: 85, main_category: 'Sains', category: 'Sains', question: 'Waktu yang dibutuhkan untuk membuat satu kali getaran disebut dengan ....', options: ['Simpangan', 'Amplitudo', 'Periode', 'Frekuensi'], correctAnswer: 'c' },
    { id: 86, main_category: 'Sains', category: 'Sains', question: 'Cairan yang mengisi ruang antara membran sel dan inti sel disebut....', options: ['Sitoplasma', 'Mitokondria', 'Kloroplas', 'Plastida'], correctAnswer: 'a' },
    { id: 87, main_category: 'Sains', category: 'Sains', question: 'Tulang-tulang di bawah ini merupakan tulang yang menyusun tulang panggul, kecuali ....', options: ['Ilium', 'Pubis', 'Ischium', 'Tibia'], correctAnswer: 'd' },
    { id: 88, main_category: 'Sains', category: 'Sains', question: 'Di bawah ini yang tidak termasuk saluran reproduksi pada pria adalah ....', options: ['Uretra', 'Uterus', 'Vas Deferens', 'Epididimis'], correctAnswer: 'b' },
    { id: 89, main_category: 'Sains', category: 'Sains', question: 'Bagian lidah yang ditunjukkan oleh anak panah (menunjuk ke bagian samping) adalah bagian lidah yang peka terhadap rasa ....', options: ['Asam', 'Manis', 'Asin', 'Pahit'], correctAnswer: 'd' }, // Kunci jawaban dari PDF adalah 'd' (Pahit), umumnya bagian samping peka rasa asam/asin
    { id: 90, main_category: 'Sains', category: 'Sains', question: 'Gen yang apabila berpasangan dengan gen lain akan tertutup atau tidak muncul sifatnya disebut gen ....', options: ['Hibrid', 'Dominan', 'Resesif', 'Intermediet'], correctAnswer: 'c' },
    // Sosial (91-100)
    { id: 91, main_category: 'Sosial', category: 'Sosial', question: 'Sebab-sebab umum terjadinya Perang Dunia II adalah berikut ini, kecuali ....', options: ['Penyerbuan Jepang terhadap pangkalan Angkatan Laut Amerika Serikat di Pearl Harbour', 'Perlombaan senjata antarnegara', 'Pertentangan antara paham liberalisme dan totaliterisme', 'Semangat untuk membalas dendam karena kekalahan dalam PD I'], correctAnswer: 'a' },
    { id: 92, main_category: 'Sosial', category: 'Sosial', question: 'Gerakan pada lapisan kulit bumi secara horizontal maupun vertikal akibat pengangkatan dan penurunan permukaan bumi yang terjadi sangat cepat serta meliputi wilayah yang sempit disebut ....', options: ['Epirogenesa positif', 'Epirogenesa negatif', 'Orogenesa', 'Sinklinal'], correctAnswer: 'c' },
    { id: 93, main_category: 'Sosial', category: 'Sosial', question: 'Peta yang dibuat pada bidang datar, seperti kain, kertas, atau triplek, disebut dengan peta ....', options: ['Kadaster', 'Planimetri', 'Relief', 'Digital'], correctAnswer: 'b' },
    { id: 94, main_category: 'Sosial', category: 'Sosial', question: 'Sebagai pengganti BPUPKI, dibentuklah sebuah panitia yang bertugas mempersiapkan segala sesuatu yang dibutuhkan bagi pendirian negara dan pemerintahan Republik Indonesia. Panitia tersebut diberi nama ....', options: ['Panitia Sembilan', 'Panitia Pancasila Jaya', 'Panitia Persiapan Kemerdekaan Indonesia', 'Panitia Persiapan Kemerdekaan Republik Indonesia'], correctAnswer: 'c' },
    { id: 95, main_category: 'Sosial', category: 'Sosial', question: 'Hujan yang terjadi karena adanya pengumpulan awan yang disebabkan oleh angin disebut hujan ....', options: ['Orografis', 'Konveksi', 'Frontal', 'Konvergen'], correctAnswer: 'd' },
    { id: 96, main_category: 'Sosial', category: 'Sosial', question: 'Pada tahun 1965 Indonesia sempat keluar dari keanggotaannya di PBB. Hal ini terjadi disebabkan karena ....', options: ['PBB tidak bersedia memberikan bantuan moneter kepada Indonesia', 'Terpilihnya Malaysia sebagai anggota tidak tetap Dewan Keamanan PBB', 'Indonesia tidak setuju dengan markas PBB', 'Indonesia ingin mendirikan PBB tandingan'], correctAnswer: 'b' },
    { id: 97, main_category: 'Sosial', category: 'Sosial', question: 'Kesenjangan antara pencari kerja dan lowongan kerja disebut ....', options: ['Pengangguran friksional', 'Pengangguran struktural', 'Pengangguran konjungtur', 'Pengangguran voluntary'], correctAnswer: 'a' },
    { id: 98, main_category: 'Sosial', category: 'Sosial', question: 'Lapisan atmosfer yang paling dekat letaknya dengan bumi adalah ....', options: ['Stratosfer', 'Termosfer', 'Mesosfer', 'Troposfer'], correctAnswer: 'd' },
    { id: 99, main_category: 'Sosial', category: 'Sosial', question: 'Di bawah ini yang termasuk fungsi asli dari uang adalah ....', options: ['Sebagai alat pembayaran', 'Sebagai alat satuan hitung', 'Sebagai alat penimbun kekayaan', 'Sebagai alat pemindah kekayaan'], correctAnswer: 'b' },
    { id: 100, main_category: 'Sosial', category: 'Sosial', question: 'Taman Siswa merupakan salah satu sekolah kebangsaan yang didirikan oleh Ki Hajar Dewantara pada tahun ....', options: ['1908', '1912', '1922', '1924'], correctAnswer: 'c' },
    // Literasi: Penalaran (101-105)
    { id: 101, main_category: 'Literasi', category: 'Penalaran', question: 'Semua siswa baru mengenakan topi.\nSebagian siswa baru mengenakan dasi.\nKesimpulan yang tepat adalah ....', options: ['Semua siswa baru mengenakan dasi', 'Semua siswa baru yang tidak mengenakan topi memakai dasi', 'Sebagian siswa baru mengenakan dasi', 'Sebagian siswa baru mengenakan dasi dan topi'], correctAnswer: 'd' },
    { id: 102, main_category: 'Literasi', category: 'Penalaran', question: 'Semua binatang diberi makanan.\nSebagian makanan adalah daging.\nKesimpulan yang tepat adalah ....', options: ['Semua binatang diberi makanan bukan daging', 'Sebagian binatang diberi makanan bukan daging', 'Sebagian binatang diberi makanan daging dan sebagian tidak diberi makan', 'Semua binatang diberi makanan daging'], correctAnswer: 'b' },
    { id: 103, main_category: 'Literasi', category: 'Penalaran', question: 'Binatang A hidup di daratan.\nBinatang B hidup di air.\nKesimpulan yang tepat tentang tempat hidup kedua binatang adalah ....', options: ['Binatang B ada di tempat hidup bukan binatang A', 'Binatang B ada di tempat hidup bukan binatang B', 'Binatang B ada di tempat hidup binatang A', 'Binatang A ada di tempat hidup bukan binatang A'], correctAnswer: 'a' },
    { id: 104, main_category: 'Literasi', category: 'Penalaran', question: 'Perhatikan keterangan berikut:\nAhmad, Doni, Joko, Linda, dan Okta adalah teman sekelas. Mereka selalu berangkat sekolah bersama-sama, kecuali Okta yang rumahnya di sebelah sekolah. Setiap pagi Doni berangkat ke sekolah setelah dijemput oleh Linda. Sedangkan Joko berangkat menunggu jemputan dari Ahmad. Joko berangkat lebih pagi daripada Linda karena rumahnya lebih jauh.\n\nSiapakah yang letak rumahnya paling jauh dari sekolah?', options: ['Linda', 'Ahmad', 'Doni', 'Joko'], correctAnswer: 'b' },
    { id: 105, main_category: 'Literasi', category: 'Penalaran', question: 'Berdasarkan keterangan soal sebelumnya, urutan rumah anak-anak tersebut dimulai dari yang terdekat dengan sekolah adalah ....', options: ['Okta - Joko - Doni - Linda - Ahmad', 'Okta - Doni - Linda - Joko - Ahmad', 'Okta - Doni - Joko - Linda - Ahmad', 'Okta - Linda - Doni - Joko - Ahmad'], correctAnswer: 'b' },
    // Ketelitian (106-115)
    { id: 106, main_category: 'Ketelitian', category: 'Ketelitian', question: 'Carilah satu pilihan yang tidak sama dengan pilihan lainnya!', options: ['Lumyzia Auxalliantara Prabawardhaningrum', 'Lumyzia Auxalliantara Prabawardhaningrum', 'Lumyzia Auxallianatra Prabawardhaningrum', 'Lumyzia Auxalliantara Prabawardhaningrum'], correctAnswer: 'c' },
    { id: 107, main_category: 'Ketelitian', category: 'Ketelitian', question: 'Carilah satu pilihan yang tidak sama dengan pilihan lainnya!', options: ['085389748832', '085839748832', '085839748832', '085839748832'], correctAnswer: 'a' },
    { id: 108, main_category: 'Ketelitian', category: 'Ketelitian', question: 'Carilah satu pilihan yang tidak sama dengan pilihan lainnya!', options: ['379rr_roemasinatoen@gmail.com', '379rr_roemasinatoen@gmail.com', '379rr_roemasinatoen@gmail.com', '379tr_roemasinatoen@gmail.com'], correctAnswer: 'd' },
    { id: 109, main_category: 'Ketelitian', category: 'Ketelitian', question: 'Carilah satu pilihan yang tidak sama dengan pilihan lainnya!', options: ['19631229 199406 2 014', '19631229 199406 2 014', '19631229 199486 2 014', '19631229 199406 2 014'], correctAnswer: 'c' },
    { id: 110, main_category: 'Ketelitian', category: 'Ketelitian', question: 'Carilah satu pilihan yang tidak sama dengan pilihan lainnya!', options: ['westports_dragonwarriors@yahoo.com', 'westports_dragonwanriors@yahoo.com', 'westports_dragonwarriors@yahoo.com', 'westports_dragonwarriors@yahoo.com'], correctAnswer: 'b' },
    { id: 111, main_category: 'Ketelitian', category: 'Ketelitian', question: 'Carilah satu pilihan yang tidak sama dengan pilihan lainnya!', options: ['The Sorcerers Apprentice', 'The Sorcerers Appretnice', 'The Sorcerers Apprentice', 'The Sorcerers Apprentice'], correctAnswer: 'b' },
    { id: 112, main_category: 'Ketelitian', category: 'Ketelitian', question: 'Carilah satu pilihan yang tidak sama dengan pilihan lainnya!', options: ['82019374191873164', '82019374191873164', '82019374191873164', '82019374191783164'], correctAnswer: 'd' },
    { id: 113, main_category: 'Ketelitian', category: 'Ketelitian', question: 'Carilah satu pilihan yang tidak sama dengan pilihan lainnya!', options: ['giannico_almerazfa492@gmail.com', 'giannico_almerazta492@gmail.com', 'giannico_almerazta492@gmail.com', 'giannico_almerazta492@gmail.com'], correctAnswer: 'a' },
    { id: 114, main_category: 'Ketelitian', category: 'Ketelitian', question: 'Carilah satu pilihan yang tidak sama dengan pilihan lainnya!', options: ['Jalan Atmosukarto Kartadjaya, Gang VIII, No 173, Semarang', 'Jalan Atmosukarto Kartadjaya, Gang VIII, No 173, Semarang', 'Jalan Atmosukarto Kartadjaya, Gang VIII, No 173, Semarang', 'Jalan Atmosukarto Kartadjaya, Geng VIII, No 173, Semarang'], correctAnswer: 'd' },
    { id: 115, main_category: 'Ketelitian', category: 'Ketelitian', question: 'Carilah satu pilihan yang tidak sama dengan pilihan lainnya!', options: ['wisata_oemahdjawayogyakarta@yahoo.com', 'wisata_oemahdjawayogyakarta@yahoo.com', 'wisata_oemahdjawayogyakerta@yahoo.com', 'wisata_oemahdjawayogyakarta@yahoo.com'], correctAnswer: 'c' },
];

// --- SCRIPT LOGIC ---
let activeQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = {};
let flaggedQuestions = new Set();
let timerInterval;
let participantName = '';
let totalTestTimeMinutes;
let currentReviewIndex = 0;

// Behavior Tracking
let trackingData = {};
let currentQuestionStartTime;

const screens = {
    welcome: document.getElementById('welcome-screen'),
    selection: document.getElementById('selection-screen'),
    instruction: document.getElementById('instruction-screen'),
    test: document.getElementById('test-screen'),
    results: document.getElementById('results-screen'),
    review: document.getElementById('review-screen')
};

const dom = {
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    questionNumberCategory: document.getElementById('question-number-category'),
    questionGrid: document.getElementById('question-grid'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    flagBtn: document.getElementById('flag-btn'),
    timerEl: document.getElementById('timer'),
    progressBar: document.getElementById('progress-bar')
};

function showScreen(screenName) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[screenName].classList.add('active');
}

function prepareTest() {
    participantName = document.getElementById('participant-name').value.trim();
    if (participantName === "") {
        alert("Nama tidak boleh kosong.");
        return;
    }
    showScreen('selection');
}

function startTest(mode) {
    let testTitle = "Ujian";
    switch (mode) {
        case 'all': activeQuestions = allQuestions; totalTestTimeMinutes = 90; testTitle = "Ujian Lengkap TKA"; break;
        case 'literasi': activeQuestions = allQuestions.filter(q => q.main_category === 'Literasi'); totalTestTimeMinutes = 45; testTitle = "Ujian Kategori Literasi"; break;
        case 'numerasi': activeQuestions = allQuestions.filter(q => q.main_category === 'Numerasi'); totalTestTimeMinutes = 25; testTitle = "Ujian Kategori Numerasi"; break;
        case 'sains': activeQuestions = allQuestions.filter(q => q.main_category === 'Sains'); totalTestTimeMinutes = 8; testTitle = "Ujian Kategori Pengetahuan Sains"; break;
        case 'sosial': activeQuestions = allQuestions.filter(q => q.main_category === 'Sosial'); totalTestTimeMinutes = 8; testTitle = "Ujian Kategori Pengetahuan Sosial"; break;
        case 'ketelitian': activeQuestions = allQuestions.filter(q => q.main_category === 'Ketelitian'); totalTestTimeMinutes = 4; testTitle = "Ujian Kategori Ketelitian"; break;
    }

    document.getElementById('instruction-title').textContent = `Petunjuk Pengerjaan ${testTitle}`;
    document.getElementById('instruction-list').innerHTML = `
        <li>Anda akan mengerjakan <strong>${activeQuestions.length} soal</strong> dalam waktu <strong>${totalTestTimeMinutes} menit</strong>.</li>
        <li>Waktu akan berjalan otomatis saat tes dimulai.</li>
        <li>Gunakan tombol navigasi di bagian bawah untuk berpindah soal.</li>
        <li>Gunakan panel navigasi di sebelah kiri untuk melompat ke soal tertentu.</li>
        <li>Anda dapat menandai soal yang dianggap ragu-ragu dengan tombol <i class="fa-solid fa-flag"></i>.</li>
    `;
    showScreen('instruction');
}

function beginActualTest() {
    currentQuestionIndex = 0;
    userAnswers = {};
    flaggedQuestions.clear();
    clearInterval(timerInterval);

    trackingData = { startTime: new Date(), endTime: null, questions: {} };
    activeQuestions.forEach(q => {
        trackingData.questions[q.id] = { timeSpent: 0, changes: 0, flagged: false };
    });

    buildNavigationGrid();
    loadQuestion(0);
    
    let time = totalTestTimeMinutes * 60;
    const totalTimeSeconds = time;
    timerInterval = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        dom.timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        const timeElapsed = totalTimeSeconds - time;
        const progressPercentage = (timeElapsed / totalTimeSeconds) * 100;
        dom.progressBar.style.width = `${progressPercentage}%`;

        time--;
        if (time < 0) {
            clearInterval(timerInterval);
            finishTest();
        }
    }, 1000);

    showScreen('test');
}

function buildNavigationGrid() {
    dom.questionGrid.innerHTML = '';
    activeQuestions.forEach((q, index) => {
        const btn = document.createElement('button');
        btn.className = 'q-btn';
        btn.textContent = index + 1;
        btn.onclick = () => jumpToQuestion(index);
        dom.questionGrid.appendChild(btn);
    });
}

function stopAndRecordTime() {
    if (currentQuestionStartTime && activeQuestions[currentQuestionIndex]) {
        const timeSpent = (new Date() - currentQuestionStartTime) / 1000;
        const prevQuestionId = activeQuestions[currentQuestionIndex].id;
        if (trackingData.questions[prevQuestionId]) {
             trackingData.questions[prevQuestionId].timeSpent += timeSpent;
        }
    }
}

function loadQuestion(index) {
    stopAndRecordTime();
    currentQuestionIndex = index;
    const q = activeQuestions[index];
    
    dom.questionText.textContent = q.question;
    dom.questionNumberCategory.textContent = `Soal ${index + 1} dari ${activeQuestions.length} - ${q.category}`;
    dom.optionsContainer.innerHTML = '';

    const optionLabels = ['a', 'b', 'c', 'd'];
    q.options.forEach((option, i) => {
        const label = document.createElement('label');
        label.className = 'option';
        label.innerHTML = `
            <input type="radio" name="option" value="${optionLabels[i]}">
            <span class="option-label">${optionLabels[i].toUpperCase()}</span>
            <span>${option}</span>
        `;
        label.onclick = () => selectAnswer(q.id, optionLabels[i]);
        dom.optionsContainer.appendChild(label);
    });
    
    if (userAnswers[q.id]) {
        const selectedRadio = dom.optionsContainer.querySelector(`input[value="${userAnswers[q.id]}"]`);
        if (selectedRadio) selectedRadio.checked = true;
    }

    updateUI();
    currentQuestionStartTime = new Date();
}

function selectAnswer(questionId, answer) {
    if (userAnswers[questionId] && userAnswers[questionId] !== answer) {
         if (trackingData.questions[questionId]) trackingData.questions[questionId].changes++;
    }
    userAnswers[questionId] = answer;
    updateUI();
}

function toggleFlag() {
    const currentId = activeQuestions[currentQuestionIndex].id;
    if (flaggedQuestions.has(currentId)) {
        flaggedQuestions.delete(currentId);
         if (trackingData.questions[currentId]) trackingData.questions[currentId].flagged = false;
    } else {
        flaggedQuestions.add(currentId);
        if (trackingData.questions[currentId]) trackingData.questions[currentId].flagged = true;
    }
    updateUI();
}

function updateUI() {
    document.querySelectorAll('#question-grid .q-btn').forEach((btn, i) => {
        const qId = activeQuestions[i].id;
        btn.className = 'q-btn';
        if (i === currentQuestionIndex) btn.classList.add('current');
        if (userAnswers[qId]) btn.classList.add('answered');
        if (flaggedQuestions.has(qId)) btn.classList.add('flagged');
    });
    dom.prevBtn.disabled = currentQuestionIndex === 0;
    dom.nextBtn.disabled = currentQuestionIndex === activeQuestions.length - 1;
    
    const currentId = activeQuestions[currentQuestionIndex].id;
    if(flaggedQuestions.has(currentId)) {
        dom.flagBtn.classList.add('flagged');
        dom.flagBtn.innerHTML = '<i class="fa-solid fa-flag"></i> Hapus Tanda';
    } else {
        dom.flagBtn.classList.remove('flagged');
        dom.flagBtn.innerHTML = '<i class="fa-solid fa-flag"></i> Tandai Soal';
    }
}

function nextQuestion() { if (currentQuestionIndex < activeQuestions.length - 1) loadQuestion(currentQuestionIndex + 1); }
function prevQuestion() { if (currentQuestionIndex > 0) loadQuestion(currentQuestionIndex - 1); }
function jumpToQuestion(index) { if (index !== currentQuestionIndex) loadQuestion(index); }

function confirmFinish() {
    const unansweredCount = activeQuestions.length - Object.keys(userAnswers).length;
    let msg = "Apakah Anda yakin ingin menyelesaikan sesi ini?";
    if (unansweredCount > 0) {
        msg += `\nAnda masih memiliki ${unansweredCount} soal yang belum dijawab.`;
    }
    if(confirm(msg)) finishTest();
}

function finishTest() {
    clearInterval(timerInterval);
    stopAndRecordTime();
    trackingData.endTime = new Date();
    generateReport();
    showScreen('results');
}

function generateReport() {
    let correctAnswers = 0;
    activeQuestions.forEach(q => {
        if (userAnswers[q.id] === q.correctAnswer) correctAnswers++;
    });
    
    const totalQuestions = activeQuestions.length;
    const incorrectAnswers = Object.keys(userAnswers).length - correctAnswers;
    const unanswered = totalQuestions - Object.keys(userAnswers).length;
    const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

    document.getElementById('report-name').textContent = participantName.toUpperCase();
    const sessionId = 'TKA-' + Date.now();
    document.getElementById('report-session-id').textContent = sessionId;
    document.getElementById('report-date').textContent = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
    
    const durationMs = trackingData.endTime - trackingData.startTime;
    const durationMinutes = Math.floor(durationMs / 60000);
    const durationSeconds = Math.floor((durationMs % 60000) / 1000);
    document.getElementById('report-duration').textContent = `${durationMinutes} menit ${durationSeconds} detik`;
    
    document.getElementById('final-score').textContent = score;
    document.getElementById('correct-count').textContent = correctAnswers;
    document.getElementById('incorrect-count').textContent = incorrectAnswers;
    document.getElementById('unanswered-count').textContent = unanswered;
    
    let predicate = 'PERLU BELAJAR LAGI';
    if (score >= 90) predicate = 'LUAR BIASA';
    else if (score >= 80) predicate = 'SANGAT BAIK';
    else if (score >= 70) predicate = 'BAIK';
    else if (score >= 60) predicate = 'CUKUP';
    document.getElementById('score-predicate').textContent = predicate;
    
    const analysisTbody = document.getElementById('analysis-tbody');
    analysisTbody.innerHTML = '';
    const mainCategories = ['Literasi', 'Numerasi', 'Sains', 'Sosial', 'Ketelitian'];
    let categoryPerformances = [];
    const headers = ['Kategori', 'Benar/Total', 'Akurasi', 'Waktu Rata-rata'];

    mainCategories.forEach(cat => {
        const catQuestions = activeQuestions.filter(q => q.main_category === cat);
        if (catQuestions.length === 0) return;
        
        let catCorrect = 0, catTime = 0;
        catQuestions.forEach(q => {
            if (userAnswers[q.id] === q.correctAnswer) catCorrect++;
            if (trackingData.questions[q.id]) catTime += trackingData.questions[q.id].timeSpent;
        });
        const accuracy = catQuestions.length > 0 ? Math.round((catCorrect / catQuestions.length) * 100) : 0;
        const avgTime = catQuestions.length > 0 ? (catTime / catQuestions.length).toFixed(1) : 0;
        categoryPerformances.push({ name: cat, accuracy: accuracy, avgTime: parseFloat(avgTime) });

        const row = document.createElement('tr');
        row.innerHTML = `
            <td data-label="${headers[0]}">${cat}</td>
            <td data-label="${headers[1]}">${catCorrect} / ${catQuestions.length}</td>
            <td data-label="${headers[2]}"><div class="accuracy-bar-container"><div class="accuracy-bar" style="width: ${accuracy}%;"></div></div><span class="accuracy-text">${accuracy}%</span></td>
            <td data-label="${headers[3]}">${avgTime} detik</td>
        `;
        analysisTbody.appendChild(row);
    });

    const totalTimeSpent = Object.values(trackingData.questions).reduce((sum, q) => sum + q.timeSpent, 0);
    const avgTimePerQuestion = totalQuestions > 0 ? (totalTimeSpent / totalQuestions).toFixed(1) : '0.0';
    document.getElementById('behavior-time').innerHTML = `Waktu rata-rata per soal Anda <strong>${avgTimePerQuestion} detik</strong>.`;
    
    const totalChanges = Object.values(trackingData.questions).reduce((sum, q) => sum + q.changes, 0);
    let doubtText = `Anda mengubah jawaban sebanyak <strong>${totalChanges} kali</strong>. `;
    doubtText += (totalChanges > (totalQuestions * 0.15)) ? "Tingkat perubahan yang tinggi, pertimbangkan untuk lebih yakin pada jawaban pertama." : "Ini menunjukkan kepercayaan diri yang baik dalam menjawab.";
    document.getElementById('behavior-doubt').innerHTML = doubtText;

    const feedbackEl = document.getElementById('recommendation-feedback');
    feedbackEl.innerHTML = '';
    const strongAreas = categoryPerformances.filter(p => p.accuracy >= 80);
    const weakAreas = categoryPerformances.filter(p => p.accuracy < 60);

    if (strongAreas.length > 0) feedbackEl.innerHTML += `<div class="recommendation-block strengths"><h4><i class="fas fa-check-circle"></i> Kekuatan Utama</h4><p>Anda menunjukkan penguasaan yang sangat baik pada kategori <strong>${strongAreas.map(p=>p.name).join(', ')}</strong>. Pertahankan performa ini!</p></div>`;
    if (weakAreas.length > 0) feedbackEl.innerHTML += `<div class="recommendation-block weaknesses"><h4><i class="fas fa-exclamation-triangle"></i> Area Peningkatan</h4><p>Perlu perhatian lebih pada kategori <strong>${weakAreas.map(p=>p.name).join(', ')}</strong>. Latih kembali soal-soal di area ini.</p></div>`;
    if (feedbackEl.innerHTML === '') feedbackEl.innerHTML = '<div class="recommendation-block strengths"><p>Performa Anda secara umum sudah seimbang dan baik. Lanjutkan latihan secara konsisten. Kerja bagus!</p></div>';

    const qrCanvas = document.getElementById('qr-code');
    const qrData = `ID: ${sessionId}\nNama: ${participantName}\nSkor: ${score}/100`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(qrData)}`;
    const ctx = qrCanvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => { qrCanvas.width = 80; qrCanvas.height = 80; ctx.drawImage(img, 0, 0, 80, 80); };
    img.src = qrUrl;
}

// --- Review Functions ---
function showReview() {
    buildReviewGrid();
    loadReviewQuestion(0);
    showScreen('review');
}

function buildReviewGrid() {
    const grid = document.getElementById('review-grid');
    grid.innerHTML = '';
    activeQuestions.forEach((q, index) => {
        const btn = document.createElement('button');
        btn.className = 'q-btn';
        btn.textContent = index + 1;
        btn.onclick = () => loadReviewQuestion(index);

        const userAnswer = userAnswers[q.id];
        if (userAnswer === q.correctAnswer) btn.classList.add('review-correct');
        else if (userAnswer) btn.classList.add('review-incorrect');
        else btn.classList.add('review-unanswered');
        
        grid.appendChild(btn);
    });
}

function loadReviewQuestion(index) {
    currentReviewIndex = index;
    const q = activeQuestions[index];
    const userAnswer = userAnswers[q.id];
    const isCorrect = userAnswer === q.correctAnswer;

    document.getElementById('review-question-number-category').textContent = `Soal ${index + 1} - ${q.category}`;
    document.getElementById('review-question-text').textContent = q.question;
    
    const statusBanner = document.getElementById('review-status-banner');
    if (userAnswer) {
        statusBanner.className = isCorrect ? 'correct' : 'incorrect';
        statusBanner.innerHTML = isCorrect ? `<i class="fas fa-check-circle"></i> Jawaban Anda Benar` : `<i class="fas fa-times-circle"></i> Jawaban Anda Salah`;
    } else {
        statusBanner.className = 'unanswered';
        statusBanner.innerHTML = `<i class="fas fa-minus-circle"></i> Soal ini tidak dijawab`;
    }

    const optionsContainer = document.getElementById('review-options-container');
    optionsContainer.innerHTML = '';
    const optionLabels = ['a', 'b', 'c', 'd'];
    
    q.options.forEach((optionText, i) => {
        const optionValue = optionLabels[i];
        const div = document.createElement('div');
        div.className = 'review-option';
        let iconHTML = '';

        if (optionValue === q.correctAnswer) {
            div.classList.add('correct-answer');
            iconHTML = '<i class="fas fa-check review-icon"></i>';
        } else if (optionValue === userAnswer) {
            div.classList.add('user-incorrect');
            iconHTML = '<i class="fas fa-times review-icon"></i>';
        } else {
            div.classList.add('other-option');
        }
        
        div.innerHTML = `<span class="option-label">${optionValue.toUpperCase()}</span><span>${optionText}</span>${iconHTML}`;
        optionsContainer.appendChild(div);
    });

    updateReviewUI();
}

function updateReviewUI() {
    document.getElementById('review-prev-btn').disabled = currentReviewIndex === 0;
    document.getElementById('review-next-btn').disabled = currentReviewIndex === activeQuestions.length - 1;
    document.querySelectorAll('#review-grid .q-btn').forEach((btn, i) => {
        btn.classList.remove('current-review');
        if (i === currentReviewIndex) btn.classList.add('current-review');
    });
}

function reviewPrevQuestion() { if (currentReviewIndex > 0) loadReviewQuestion(currentReviewIndex - 1); }
function reviewNextQuestion() { if (currentReviewIndex < activeQuestions.length - 1) loadReviewQuestion(currentReviewIndex + 1); }

// --- Other Functions ---
function tryAgain() {
    showScreen('welcome');
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const report = document.getElementById('report-container');
    
    html2canvas(report, { scale: 1.5, useCORS: true, logging: false }).then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg', 0.9);
        const pdf = new jsPDF('p', 'mm', 'a4'); 
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const ratio = canvas.width / canvas.height;
        let finalWidth = pdfWidth - 20;
        let finalHeight = finalWidth / ratio;
        
        if (finalHeight > pdfHeight - 20) {
            finalHeight = pdfHeight - 20;
            finalWidth = finalHeight * ratio;
        }
        
        const x = (pdfWidth - finalWidth) / 2;
        const y = (pdfHeight - finalHeight) / 2;
        
        pdf.addImage(imgData, 'JPEG', x, y, finalWidth, finalHeight);
        pdf.save(`Laporan-TKA-${participantName.replace(/\s/g, '_')}-${Date.now()}.pdf`);
    });
}

// --- Initial Setup ---
document.addEventListener("DOMContentLoaded", () => {
    showScreen('welcome');
});
