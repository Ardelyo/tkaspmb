// --- DATA SOAL LENGKAP (30 SOAL HOTS) ---
const allQuestions = [
    // ===================================
    // == BAGIAN LITERASI (15 SOAL) ==
    // ===================================
    {
        id: 1,
        main_category: 'Literasi',
        category: 'Analisis Teks Banding',
        question: `Perhatikan dua teks berikut.\n
**Teks A (Laporan Hasil Observasi):**
Pohon Mangga (Mangifera indica) adalah tumbuhan berkayu yang termasuk dalam suku Anacardiaceae. Tingginya dapat mencapai 10-40 meter dengan diameter batang hingga 1,5 meter. Daunnya tunggal, berwarna hijau tua, dan berbentuk lanset. Buahnya termasuk kelompok buah batu (drupa) yang berdaging, dengan ukuran dan bentuk bervariasi. Berdasarkan pengamatan, buah mangga mengandung vitamin C, vitamin A, dan serat yang bermanfaat bagi kesehatan pencernaan.\n
**Teks B (Deskripsi):**
Di sudut kebunku, berdiri gagah sebatang pohon mangga warisan kakek. Rindang daunnya yang hijau pekat seolah menjadi payung raksasa yang meneduhkan, tempatku berlindung dari sengatan mentari siang. Ketika musim berbuah tiba, cabang-cabangnya yang kokoh dihiasi buah-buah ranum berwarna kuning keemasan, menebarkan aroma manis yang menggoda siapa pun yang lewat. Rasanya, pohon ini bukan sekadar tumbuhan, melainkan saksi bisu kenangan masa kecilku.\n
Berdasarkan analisis tujuan penulisan, perbedaan paling mendasar antara Teks A dan Teks B adalah...`,
        options: [
            'Teks A menyajikan fakta umum, sedangkan Teks B menyajikan fakta khusus.',
            'Teks A bertujuan mengklasifikasikan secara objektif, sedangkan Teks B bertujuan membangkitkan pengalaman personal dan imajinasi pembaca.',
            'Teks A menggunakan bahasa baku, sedangkan Teks B menggunakan bahasa tidak baku.',
            'Teks A membahas manfaat, sedangkan Teks B hanya membahas ciri fisik.'
        ],
        correctAnswer: 'b'
    },
    {
        id: 2,
        main_category: 'Literasi',
        category: 'Evaluasi & Modifikasi Teks',
        question: `Mengacu pada Teks A dan Teks B dari soal sebelumnya, jika penulis Teks B ingin mengubah tulisannya menjadi sebuah Teks Laporan Hasil Observasi (seperti Teks A), hal paling krusial yang harus ia hilangkan adalah...`,
        options: [
            'Informasi mengenai warna dan bentuk buah mangga.',
            'Deskripsi tentang tinggi dan diameter batang pohon.',
            'Penggunaan citraan (aroma manis) dan ungkapan emotif (saksi bisu kenangan).',
            'Penyebutan nama latin Mangifera indica.'
        ],
        correctAnswer: 'c'
    },
    {
        id: 3,
        main_category: 'Literasi',
        category: 'Penalaran Teks Diskusi',
        question: `Debat mengenai penggunaan kecerdasan buatan (AI) di dunia pendidikan semakin mengemuka. Di satu sisi (Argumen Pro), AI dipandang sebagai alat bantu revolusioner yang dapat mempersonalisasi pembelajaran. Di sisi lain (Argumen Kontra), ada kekhawatiran bahwa ketergantungan berlebihan pada AI akan mengikis kemampuan berpikir kritis. Isu privasi data dan potensi bias algoritma juga menjadi ancaman.\n\nManakah simpulan yang paling tepat dan representatif untuk mengakhiri teks diskusi di atas, yang mampu memberikan jalan tengah?`,
        options: [
            'Oleh karena itu, penggunaan AI dalam pendidikan harus ditolak sepenuhnya untuk melindungi siswa dari dampak negatifnya.',
            'Dengan demikian, AI harus segera diimplementasikan di semua sekolah karena manfaatnya jauh lebih besar daripada risikonya.',
            'AI memang menawarkan potensi besar, tetapi implementasinya harus dilakukan secara hati-hati dengan regulasi yang ketat untuk memitigasi risiko sambil memaksimalkan manfaatnya.',
            'Perdebatan ini tidak akan pernah berakhir karena kedua belah pihak memiliki argumen yang sama kuatnya.'
        ],
        correctAnswer: 'c'
    },
    {
        id: 4,
        main_category: 'Literasi',
        category: 'Transformasi Jenis Teks',
        question: `Jika seorang penulis ingin mengubah teks diskusi tentang AI (dari soal sebelumnya) menjadi sebuah **Teks Eksposisi** yang bertujuan meyakinkan pembaca bahwa **AI baik untuk pendidikan**, bagian mana yang harus diperkuat dan bagian mana yang harus diminimalkan?`,
        options: [
            'Memperkuat "Argumen Kontra" dengan data dan fakta, serta meminimalkan "Argumen Pro".',
            'Memperkuat "Argumen Pro" dengan contoh keberhasilan dan data pendukung, serta menyajikan "Argumen Kontra" hanya sebagai sanggahan yang kemudian dibantah.',
            'Menghilangkan kedua argumen dan menggantinya dengan langkah-langkah menggunakan AI di kelas.',
            'Menambahkan lebih banyak pertanyaan retoris untuk membuat pembaca bingung.'
        ],
        correctAnswer: 'b'
    },
    {
        id: 5,
        main_category: 'Literasi',
        category: 'Evaluasi Teks Prosedur',
        question: `Perhatikan prosedur berikut:\n(1) Siapkan blender.\n(2) Masukkan potongan buah naga dan pisang.\n(3) Tuangkan 100 ml air putih.\n(4) Tambahkan dua sendok makan gula.\n(5) Nyalakan blender hingga semua bahan halus.\n(6) Jus siap dinikmati.\n\nSeorang ahli gizi mengkritik prosedur di atas karena dianggap kurang sehat. Jika Anda diminta merevisi prosedur tersebut agar sesuai dengan prinsip hidup sehat, modifikasi paling efektif adalah...`,
        options: [
            'Mengganti blender dengan juicer.',
            'Menghilangkan langkah (4) dan menyarankan penggunaan madu atau tidak menggunakan pemanis sama sekali.',
            'Menambahkan es batu pada langkah (2) agar lebih segar.',
            'Mengganti air putih dengan susu kental manis pada langkah (3).'
        ],
        correctAnswer: 'b'
    },
    {
        id: 6,
        main_category: 'Literasi',
        category: 'Analisis Teks Berita',
        question: `Perhatikan kutipan berita berikut:\n"Menteri Keuangan menyatakan bahwa stabilitas ekonomi nasional pada kuartal ketiga menunjukkan tren positif. 'Kita optimis pertumbuhan akan melampaui target,' ujarnya saat konferensi pers di Jakarta, Selasa (25/10). Ia menambahkan, optimisme ini didasarkan pada peningkatan investasi dan konsumsi domestik."\n\nAnalisis yang paling tepat terhadap struktur dan kaidah kebahasaan teks berita di atas adalah...`,
        options: [
            'Teks menggunakan struktur piramida terbalik dengan menyajikan kutipan langsung (kalimat langsung) untuk memperkuat kredibilitas informasi.',
            'Teks ini bias karena hanya menyajikan opini dari satu pihak tanpa data pendukung.',
            'Teks menggunakan kalimat tidak langsung untuk menyembunyikan identitas narasumber.',
            'Teks tersebut bukan berita karena tidak memenuhi unsur "Di mana" (Where).'
        ],
        correctAnswer: 'a'
    },
    {
        id: 7,
        main_category: 'Literasi',
        category: 'Analisis Puisi (HOTS)',
        question: `Perhatikan kutipan puisi berikut.\n*Senja di Pelabuhan Kecil*\nIni kali tidak ada yang mencari cinta\ndi antara gudang, rumah tua, pada cerita\ntiang serta temali. Kapal, perahu tiada berlaut\nmenghembus diri dalam mempercayai mau berpaut\n(Chairil Anwar)\n\nAmanat yang tersirat dari sintesis antara diksi ("tiada berlaut", "tiada berpaut") dan citraan suasana ("gudang, rumah tua") dalam puisi tersebut adalah...`,
        options: [
            'Ajakan untuk mencintai keindahan pelabuhan di waktu senja.',
            'Gambaran tentang kesibukan para nelayan di sore hari.',
            'Refleksi tentang perasaan hampa, kesepian, dan ketiadaan harapan.',
            'Kritik sosial terhadap kondisi pelabuhan yang tidak terawat.'
        ],
        correctAnswer: 'c'
    },
    {
        id: 8,
        main_category: 'Literasi',
        category: 'Analisis Teks Ulasan',
        question: `Sebuah ulasan film menulis: "Meskipun sinematografinya memukau dan akting pemeran utama patut diacungi jempol, alur cerita film ini terasa terlalu mudah ditebak sejak pertengahan durasi. Penonton seolah hanya disuguhi keindahan visual tanpa kejutan naratif yang berarti."\n\nEvaluasi yang terkandung dalam kutipan ulasan tersebut menyiratkan bahwa...`,
        options: [
            'Film tersebut gagal total dalam semua aspek.',
            'Film tersebut memiliki keunggulan teknis namun lemah dalam aspek penceritaan (storytelling).',
            'Penulis ulasan tidak menyukai genre film tersebut.',
            'Akting yang bagus tidak mampu menutupi sinematografi yang buruk.'
        ],
        correctAnswer: 'b'
    },
    {
        id: 9,
        main_category: 'Literasi',
        category: 'Strategi Teks Persuasi',
        question: `Seorang kepala desa ingin menyampaikan pidato untuk mengajak warganya mengikuti program "Bank Sampah". Untuk mencapai tujuan pengubahan tanggapan (dari apatis menjadi partisipatif), strategi pidato persuasif yang paling efektif adalah...`,
        options: [
            'Membuka pidato dengan data statistik global tentang sampah, lalu menutup dengan sanksi bagi yang tidak ikut.',
            'Menggunakan bahasa yang formal dan ilmiah untuk menunjukkan kredibilitas program.',
            'Memulai dengan cerita inspiratif tentang desa lain yang sukses, menunjukkan keuntungan ekonomi langsung bagi warga (kata-kata emotif), dan diakhiri dengan ajakan "mari" dan "ayo" yang bersemangat.',
            'Fokus menjelaskan struktur organisasi Bank Sampah secara rinci dari awal hingga akhir.'
        ],
        correctAnswer: 'c'
    },
    {
        id: 10,
        main_category: 'Literasi',
        category: 'Analisis Unsur Cerpen',
        question: `Dalam sebuah cerpen, tokoh utama bernama Ardi adalah seorang pemuda desa yang jujur namun sering diremehkan. Cerita berakhir dengan Ardi berhasil menyelamatkan desanya dari penipuan berkedok investasi berkat kejujurannya. Sudut pandang yang digunakan adalah orang ketiga serbatahu.\n\nJika penulis mengubah sudut pandang menjadi **orang pertama (Aku-Ardi)**, dampak paling signifikan terhadap penceritaan adalah...`,
        options: [
            'Alur cerita akan berubah total dari awal hingga akhir.',
            'Pembaca tidak akan mengetahui latar tempat dan waktu cerita.',
            'Latar belakang penulis akan menjadi lebih jelas.',
            'Pembaca akan merasakan konflik batin, keraguan, dan perasaan Ardi secara lebih intim dan mendalam, namun pandangan terhadap tokoh lain menjadi terbatas.'
        ],
        correctAnswer: 'd'
    },
    {
        id: 11,
        main_category: 'Literasi',
        category: 'Analisis Teks Persuasi',
        question: `Perhatikan slogan berikut:\n(1) "Apapun makanannya, minumnya Teh Botol Sosro."\n(2) "Mari Lestarikan Hutan, Paru-paru Dunia Kita."\n\nDari perspektif tujuan komunikasinya, perbedaan fundamental antara kedua slogan tersebut adalah...`,
        options: [
            'Slogan (1) bersifat komersial untuk membangun citra merek, sedangkan slogan (2) bersifat sosial untuk membangun kesadaran publik.',
            'Slogan (1) menggunakan kalimat ajakan, sedangkan slogan (2) tidak.',
            'Slogan (1) lebih mudah diingat daripada slogan (2).',
            'Slogan (1) ditujukan untuk semua kalangan, sedangkan slogan (2) hanya untuk aktivis lingkungan.'
        ],
        correctAnswer: 'a'
    },
    {
        id: 12,
        main_category: 'Literasi',
        category: 'Analisis Teks Eksplanasi',
        question: `Teks Eksplanasi yang menjelaskan proses terjadinya gerhana matahari akan dominan menggunakan konjungsi kausalitas (sebab-akibat). Manakah di antara kalimat berikut yang **PALING TIDAK RELEVAN** untuk dimasukkan ke dalam teks tersebut?`,
        options: [
            'Posisi bulan berada di antara bumi dan matahari, **akibatnya** cahaya matahari ke bumi terhalang oleh bulan.',
            'Gerhana matahari total adalah fenomena alam yang sangat indah, **oleh karena itu** banyak wisatawan asing datang untuk menyaksikannya.',
            '**Karena** diameter bulan jauh lebih kecil dari matahari, gerhana hanya terjadi jika jarak bumi-bulan tepat.',
            'Bayangan inti bulan yang jatuh ke permukaan bumi **menyebabkan** terjadinya gerhana total di area tersebut.'
        ],
        correctAnswer: 'b'
    },
    {
        id: 13,
        main_category: 'Literasi',
        category: 'Kaidah Bahasa Surat Dinas',
        question: `Surat dinas dari OSIS kepada Kepala Sekolah berisi permohonan izin penggunaan aula untuk acara pentas seni. Manakah kalimat isi surat yang paling tepat, efektif, dan sesuai kaidah bahasa surat dinas?`,
        options: [
            'Kami mohon Bapak ngasih izin buat pakai aula, soalnya kita mau ada pensi.',
            'Dengan ini, kami selaku panitia memohon izin dari Bapak untuk peminjaman dan penggunaan aula sekolah pada hari dan tanggal yang telah kami tetapkan.',
            'Sehubungan dengan akan diselenggarakannya acara pentas seni, kami memohon izin Bapak untuk dapat menggunakan aula sekolah pada hari Sabtu, 15 November 2023.',
            'Bapak Kepala Sekolah yang terhormat, kami anak-anak OSIS mau pinjam aula buat acara hari Sabtu. Boleh ya, Pak?'
        ],
        correctAnswer: 'c'
    },
    {
        id: 14,
        main_category: 'Literasi',
        category: 'Analisis Cerita Imajinasi',
        question: `Cerita imajinasi tentang seorang anak yang menemukan pintu ajaib di belakang lemari tuanya, yang membawanya ke kerajaan awan, tergolong jenis cerita imajinasi total. Jika pengarang ingin mengubahnya menjadi **cerita imajinasi irisan**, perubahan yang paling logis adalah...`,
        options: [
            'Mengubah tokoh utama menjadi seekor hewan yang bisa berbicara.',
            'Menghilangkan unsur pintu ajaib dan kerajaan awan sepenuhnya.',
            'Tetap menggunakan latar dunia nyata (rumah dan sekolah si anak), namun memunculkan satu unsur ajaib, misalnya teman sebangkunya ternyata seorang peri.',
            'Membuat seluruh kejadian ternyata hanya mimpi si anak.'
        ],
        correctAnswer: 'c'
    },
    {
        id: 15,
        main_category: 'Literasi',
        category: 'Analisis Teks Banding',
        question: `Perbedaan fokus utama antara **Teks Laporan Percobaan** dan **Teks Prosedur** adalah...`,
        options: [
            'Laporan Percobaan berorientasi pada proses dan hasil pembuktian hipotesis, sedangkan Teks Prosedur berorientasi pada panduan untuk mencapai hasil yang sudah pasti.',
            'Teks Prosedur selalu menggunakan gambar, sedangkan Laporan Percobaan tidak.',
            'Laporan Percobaan menggunakan bahasa yang rumit, sedangkan Teks Prosedur bahasanya sederhana.',
            'Teks Prosedur tidak memiliki bagian tujuan, sedangkan Laporan Percobaan memilikinya.'
        ],
        correctAnswer: 'a'
    },
    // ===================================
    // == BAGIAN NUMERASI (15 SOAL) ==
    // ===================================
    {
        id: 16,
        main_category: 'Numerasi',
        category: 'Aritmetika Sosial (HOTS)',
        question: `Toko A menjual kemeja seharga Rp200.000 dengan diskon 30%. Toko B menjual kemeja yang sama seharga Rp225.000 dengan diskon "Beli 2 Gratis 1". Budi ingin membeli 3 kemeja. Untuk mendapatkan total biaya yang paling murah, strategi yang harus dipilih Budi adalah...`,
        options: [
            'Membeli 3 kemeja di Toko A.',
            'Membeli 3 kemeja di Toko B.',
            'Membeli 2 kemeja di Toko B dan 1 kemeja di Toko A.',
            'Membeli 2 kemeja di Toko A dan 1 kemeja di Toko B.'
        ],
        correctAnswer: 'a'
    },
    {
        id: 17,
        main_category: 'Numerasi',
        category: 'Perbandingan Berbalik Nilai',
        question: `Sebuah proyek perbaikan jalan dijadwalkan selesai dalam 40 hari oleh 21 pekerja. Setelah 8 hari bekerja, proyek dihentikan selama 4 hari karena cuaca buruk. Agar proyek selesai tepat waktu, berapa banyak tambahan pekerja yang diperlukan?`,
        options: ['3 pekerja', '6 pekerja', '7 pekerja', '9 pekerja'],
        correctAnswer: 'a'
    },
    {
        id: 18,
        main_category: 'Numerasi',
        category: 'Optimisasi Geometri',
        question: `Pak Budi memiliki sebidang tanah berbentuk persegi panjang dengan keliling 60 meter. Ia ingin membuat taman bunga di tanah tersebut. Agar luas taman bunga yang ia buat maksimal, berapakah selisih antara panjang dan lebar tanah tersebut?`,
        options: ['0 meter', '5 meter', '10 meter', '15 meter'],
        correctAnswer: 'a'
    },
    {
        id: 19,
        main_category: 'Numerasi',
        category: 'Analisis Data Kritis',
        question: `Pola susunan kursi pada sebuah gedung pertunjukan membentuk barisan aritmetika. Terdapat 10 kursi di baris pertama, 14 kursi di baris kedua, 18 kursi di baris ketiga, dan seterusnya. Harga tiket untuk 5 baris pertama adalah Rp100.000, sedangkan untuk baris-baris berikutnya adalah Rp75.000. Jika total pendapatan dari seluruh kursi yang terisi penuh pada baris ke-12 adalah Rp2.250.000, maka pernyataan yang paling tepat adalah...`,
        options: [
            'Pendapatan dari 5 baris pertama lebih besar dari baris sisanya.',
            'Jumlah kursi di gedung tersebut lebih dari 350.',
            'Harga tiket rata-rata untuk seluruh kursi adalah Rp80.000.',
            'Terdapat kesalahan data karena total pendapatan seharusnya tidak sebesar itu.'
        ],
        correctAnswer: 'd'
    },
    {
        id: 20,
        main_category: 'Numerasi',
        category: 'Transformasi Geometri',
        question: `Titik A(6, -4) dicerminkan terhadap garis y = x, kemudian hasilnya dirotasikan 90° berlawanan arah jarum jam dengan pusat O(0,0). Di manakah posisi akhir titik A?`,
        options: ['Kuadran I', 'Kuadran II', 'Kuadran III', 'Kuadran IV'],
        correctAnswer: 'c'
    },
    {
        id: 21,
        main_category: 'Numerasi',
        category: 'Kesebangunan',
        question: `Sebuah foto berukuran 10 cm (lebar) x 15 cm (tinggi) diletakkan di atas selembar karton. Di sisi kiri, kanan, dan atas foto masih tersisa karton selebar 2 cm. Jika foto dan karton sebangun, berapa lebar karton yang tersisa di bagian bawah foto?`,
        options: ['2 cm', '3 cm', '4 cm', '5 cm'],
        correctAnswer: 'c'
    },
    {
        id: 22,
        main_category: 'Numerasi',
        category: 'Peluang Kejadian Majemuk',
        question: `Sebuah dadu merah dan sebuah dadu biru dilempar bersamaan. Peluang munculnya mata dadu merah bernilai ganjil DAN jumlah mata kedua dadu adalah 8 adalah...`,
        options: ['1/36', '2/36', '3/36', '4/36'],
        correctAnswer: 'b'
    },
    {
        id: 23,
        main_category: 'Numerasi',
        category: 'Statistika (Rata-rata Gabungan)',
        question: `Rata-rata nilai ujian matematika 30 siswa adalah 78. Setelah 2 orang siswa yang nilainya 95 dan 98 keluar dari kelompok tersebut, dan 4 orang siswa baru dengan total nilai 320 masuk, bagaimana perubahan rata-rata nilai kelompok tersebut?`,
        options: [
            'Rata-rata nilai turun lebih dari 1 poin.',
            'Rata-rata nilai turun kurang dari 1 poin.',
            'Rata-rata nilai naik kurang dari 1 poin.',
            'Rata-rata nilai naik lebih dari 1 poin.'
        ],
        correctAnswer: 'b'
    },
    {
        id: 24,
        main_category: 'Numerasi',
        category: 'Fungsi Kuadrat (Aplikasi)',
        question: `Sebuah roket diluncurkan vertikal ke atas. Ketinggian roket (h) dalam meter setelah t detik dirumuskan dengan h(t) = 80t - 5t². Roket tersebut diprogram untuk melepaskan satelit kecil tepat 2 detik sebelum mencapai ketinggian maksimumnya. Pada ketinggian berapakah satelit tersebut dilepaskan?`,
        options: ['240 meter', '280 meter', '300 meter', '320 meter'],
        correctAnswer: 'c'
    },
    {
        id: 25,
        main_category: 'Numerasi',
        category: 'Sistem Persamaan (Aritmetika Sosial)',
        question: `Pak Ali menabung di Bank A dengan bunga tunggal 10% per tahun. Pak Budi menabung di Bank B dengan bunga tunggal 6% per tahun. Pada awal tahun, jumlah tabungan Pak Budi Rp500.000 lebih banyak dari tabungan Pak Ali. Setelah tepat satu tahun, jumlah tabungan mereka menjadi sama besar. Berapa tabungan awal Pak Ali? (Catatan: Angka dalam soal ini menghasilkan jawaban yang tidak bulat, pilih jawaban yang paling mendekati secara logis jika perhitungan eksak tidak ada di pilihan).`,
        options: ['Rp 500.000', 'Rp 750.000', 'Rp 1.000.000', 'Rp 13.250.000'],
        correctAnswer: 'd' // Jawaban eksak dari perhitungan.
    },
    {
        id: 26,
        main_category: 'Numerasi',
        category: 'Aljabar Fungsi',
        question: `Suatu fungsi didefinisikan dengan f(x) = ax + b. Jika f(f(2)) = 19 dan f(0) = -1, maka nilai dari a - b adalah... (diasumsikan nilai a adalah bilangan bulat)`,
        options: ['-5', '-3', '4', '5'],
        correctAnswer: 'd'
    },
    {
        id: 27,
        main_category: 'Numerasi',
        category: 'Geometri Ruang (HOTS)',
        question: `Sebuah bandul terbuat dari gabungan kerucut dan setengah bola yang jari-jarinya sama. Volume total bandul adalah 288π cm³. Jika tinggi kerucut sama dengan dua kali panjang jari-jarinya, maka luas permukaan setengah bola pada bandul tersebut adalah...`,
        options: ['36π cm²', '54π cm²', '72π cm²', '108π cm²'],
        correctAnswer: 'c'
    },
    {
        id: 28,
        main_category: 'Numerasi',
        category: 'Sistem Persamaan & Logika',
        question: `Harga 3 kg Apel dan 2 kg Jeruk adalah Rp 145.000. Harga 1 kg Apel dan 3 kg Jeruk adalah Rp 90.000. Ibu membeli 2 kg Apel dan membayar dengan dua lembar uang Rp 50.000. Uang kembalian yang seharusnya diterima Ibu adalah sekitar Rp 26.800. Manakah pernyataan yang paling mungkin benar mengenai harga buah per kg?`,
        options: ['Harga 1 kg Apel adalah Rp 36.500.', 'Harga 1 kg Jeruk adalah Rp 20.000.', 'Harga 1 kg Apel sama dengan harga 2 kg Jeruk.', 'Harga 1 kg Jeruk lebih mahal dari harga 1 kg Apel.'],
        correctAnswer: 'a'
    },
    {
        id: 29,
        main_category: 'Numerasi',
        category: 'Persamaan Kuadrat',
        question: `Diketahui x₁ dan x₂ adalah akar-akar dari persamaan kuadrat x² - (p+3)x + 12 = 0. Jika berlaku hubungan x₁ = 3x₂, dan p > 0, maka nilai p yang memenuhi adalah...`,
        options: ['1', '3', '5', '8'],
        correctAnswer: 'c'
    },
    {
        id: 30,
        main_category: 'Numerasi',
        category: 'Peluang & Himpunan',
        question: `Dari 40 siswa di sebuah kelas, 25 siswa gemar basket, dan 20 siswa gemar voli. Setiap siswa setidaknya gemar salah satu dari kedua olahraga tersebut. Jika seorang siswa dipilih secara acak untuk menjadi kapten tim gabungan, berapa peluang terpilihnya siswa yang hanya gemar basket?`,
        options: ['1/8', '3/8', '1/2', '5/8'],
        correctAnswer: 'c'
    },
];

// --- SCRIPT LOGIC (Tidak ada perubahan di bawah ini, sama seperti yang Anda berikan) ---
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
        case 'all': activeQuestions = allQuestions; totalTestTimeMinutes = 30; testTitle = "Ujian Lengkap TKA (HOTS)"; break;
        case 'literasi': activeQuestions = allQuestions.filter(q => q.main_category === 'Literasi'); totalTestTimeMinutes = 15; testTitle = "Ujian Kategori Literasi (HOTS)"; break;
        case 'numerasi': activeQuestions = allQuestions.filter(q => q.main_category === 'Numerasi'); totalTestTimeMinutes = 15; testTitle = "Ujian Kategori Numerasi (HOTS)"; break;
        // Opsi lain akan menghasilkan 0 soal, ini perilaku yang diharapkan jika tidak ada data
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
    
    // Menggunakan <pre> untuk mempertahankan format newline dari teks soal
    dom.questionText.innerHTML = `<pre>${q.question}</pre>`;
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
    document.getElementById('review-question-text').innerHTML = `<pre>${q.question}</pre>`;
    
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
