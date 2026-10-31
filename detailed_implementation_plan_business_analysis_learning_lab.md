# Detailed Implementation Plan

## Business Analysis Learning Lab --- Local Interactive Learning Web

-   **Document type:** Product and technical implementation plan
-   **Product:** Business Analysis Learning Lab
-   **Primary audience:** Mahasiswa Program Studi Bisnis Digital yang
    baru mempelajari analisis data bisnis
-   **Usage context:** Sesi belajar private antara satu pengajar dan
    satu mahasiswa
-   **Deployment target:** Berjalan pada komputer lokal, tanpa akun
    pengguna dan tanpa backend pada versi awal
-   **Language:** Bahasa Indonesia, dengan istilah teknis berbahasa
    Inggris disertai penjelasan

------------------------------------------------------------------------

# 1. Ringkasan Produk

Business Analysis Learning Lab adalah web pembelajaran interaktif untuk
membantu mahasiswa memahami konsep Business Analysis dan analisis data
bisnis dari dasar sampai mampu membaca hasil analisis dan menyusun
rekomendasi.

Web bukan sekadar kumpulan materi atau slide. Setiap topik harus
memiliki: 1. Masalah atau pertanyaan bisnis sebagai konteks. 2.
Penjelasan konsep dengan bahasa sederhana. 3. Visualisasi atau contoh
data. 4. Aktivitas yang dapat dicoba mahasiswa. 5. Interpretasi hasil
dalam konteks bisnis. 6. Latihan singkat dan umpan balik. 7. Ringkasan
materi.

## 1.1 Tujuan produk

Setelah menggunakan web, mahasiswa diharapkan mampu: - menjelaskan
hubungan masalah bisnis, data, analisis, insight, dan keputusan; -
mengenali struktur dataset serta tipe variabel; - melakukan eksplorasi
awal dan memahami alasan data perlu dipersiapkan; - memilih metode
berdasarkan pertanyaan bisnis; - membaca visualisasi dan metrik dasar; -
menjelaskan keterbatasan hasil analisis; - menyusun rekomendasi yang
terkait dengan temuan data.

## 1.2 Prinsip utama

**Masalah bisnis → pertanyaan analisis → data → eksplorasi → persiapan →
metode → hasil → insight → rekomendasi.**

Setiap halaman harus memperlihatkan posisi topik tersebut di dalam alur
besar ini.

------------------------------------------------------------------------

# 2. Ruang Lingkup Produk

## 2.1 Termasuk dalam versi awal

-   Dashboard dan navigasi materi.
-   Pengantar Business Analysis.
-   Data Fundamentals.
-   Data Exploration dengan dataset contoh.
-   Data Preparation dengan data bermasalah yang disengaja.
-   Method Explorer untuk membantu memilih metode.
-   Demo konsep Regression dan Classification.
-   Demo Clustering, Association Rules, ANN, dan Text Mining secara
    bertahap.
-   Kuis per topik dengan penjelasan jawaban.
-   Project Workspace untuk menyusun rencana analisis.
-   Progres belajar lokal opsional.
-   Mode cetak atau salin untuk ringkasan proyek.

## 2.2 Tidak termasuk dalam versi awal

-   Login dan manajemen akun.
-   Database server atau backend.
-   Sinkronisasi data antarperangkat.
-   Analisis dataset berukuran besar.
-   Pengganti penuh Python, Jupyter Notebook, atau perangkat yang
    diwajibkan pada praktikum.
-   Klaim bahwa semua model machine learning dilatih secara nyata.
-   Integrasi API eksternal yang membutuhkan internet.

Jika suatu metode hanya disimulasikan, antarmuka harus menyebutnya
sebagai **demo konseptual**. Jika hasil dihitung menggunakan kode,
antarmuka boleh menyebutnya sebagai **hasil perhitungan demo** dan
menjelaskan asumsi serta batasannya.

------------------------------------------------------------------------

# 3. Target Pengguna dan Skenario Pemakaian

## 3.1 Peran

### Mahasiswa

-   membaca materi;
-   melihat contoh visual;
-   mencoba interaksi;
-   menjawab latihan;
-   menyusun jawaban studi kasus;
-   mengisi Project Workspace.

### Pengajar

-   menentukan topik untuk sesi hari itu;
-   menjelaskan konsep menggunakan visual yang sama;
-   meminta mahasiswa memprediksi hasil sebelum membuka jawaban;
-   membahas kesalahan pemahaman;
-   menilai apakah mahasiswa dapat menjelaskan alasan pemilihan metode.

Tidak diperlukan sistem akun atau perbedaan hak akses pada versi awal.
Pengajar dan mahasiswa menggunakan halaman yang sama.

## 3.2 Skenario sesi belajar

1.  Pengajar membuka Dashboard.
2.  Pengajar meminta mahasiswa menjelaskan masalah bisnis pada contoh.
3.  Mahasiswa membuka Data Fundamentals dan mengidentifikasi variabel.
4.  Mahasiswa mengamati dataset di Data Exploration.
5.  Mahasiswa memilih metode melalui Method Explorer.
6.  Mahasiswa mencoba demo dan membaca hasil.
7.  Mahasiswa menjawab kuis.
8.  Pengajar meminta mahasiswa menjelaskan hasil dengan kalimat sendiri.
9.  Mahasiswa menulis insight dan rekomendasi di Project Workspace.

------------------------------------------------------------------------

# 4. Arsitektur Informasi dan Navigasi

Gunakan navigasi utama berikut:

``` text
Dashboard
├── Mulai dari Sini
│   ├── Apa itu Business Analysis?
│   ├── Alur Analisis Bisnis
│   └── Studi Kasus: Kedai Kopi Senja
├── Dasar Data
│   ├── Data Fundamentals
│   ├── Data Exploration
│   └── Data Preparation
├── Metode Analisis
│   ├── Method Explorer
│   ├── Regression Lab
│   ├── Classification Lab
│   ├── Clustering Lab
│   ├── Association Rules Lab
│   ├── ANN Visualizer
│   └── Text Mining Lab
├── Project Workspace
└── Kuis & Review
```

## 4.1 Pola navigasi

-   Sidebar pada layar desktop.
-   Menu ringkas atau drawer pada layar kecil.
-   Tombol **Sebelumnya** dan **Lanjutkan** di bawah materi.
-   Breadcrumb untuk menunjukkan posisi halaman.
-   Status "Belum dimulai", "Sedang dipelajari", atau "Selesai" jika
    progres lokal diimplementasikan.
-   Setiap halaman memiliki tombol kembali ke daftar materi.

## 4.2 Dashboard

Elemen wajib: 1. Nama produk dan deskripsi satu kalimat. 2. Tombol
"Mulai Belajar". 3. Diagram alur analisis bisnis. 4. Bagian "Lanjutkan
Belajar". 5. Kartu topik yang dapat dibuka. 6. Studi kasus utama. 7.
Akses ke kuis dan Project Workspace.

Jangan menampilkan terlalu banyak metrik progres di versi pertama.
Prioritaskan arah belajar yang jelas.

------------------------------------------------------------------------

# 5. Spesifikasi Halaman Secara Detail

## 5.1 Halaman: Pengantar Business Analysis

**Tujuan belajar:** mahasiswa dapat membedakan masalah bisnis,
pertanyaan analisis, temuan data, insight, dan rekomendasi.

### Konten

-   Definisi Business Analysis dalam bahasa sederhana.
-   Mengapa bisnis menggunakan data.
-   Diagram proses analisis bisnis.
-   Contoh masalah penjualan menurun.
-   Perbedaan data, informasi, insight, dan keputusan.

### Interaksi

Tampilkan lima kartu yang dapat dibuka satu per satu: 1. **Masalah:**
Penjualan kedai kopi menurun. 2. **Pertanyaan:** Kapan penjualan menurun
dan faktor apa yang mungkin berkaitan? 3. **Data:** Tanggal, produk,
jumlah terjual, harga, promosi, dan kanal penjualan. 4. **Insight:**
Pola yang ditemukan setelah data dianalisis. 5. **Rekomendasi:**
Tindakan yang akan diuji berdasarkan insight.

Sediakan latihan mencocokkan kalimat ke kategori yang benar. Setelah
mahasiswa memilih, tampilkan penjelasan singkat.

### Kriteria selesai

Mahasiswa dapat menjelaskan mengapa "penjualan turun" adalah masalah,
sedangkan "apakah penjualan turun pada hari tertentu?" adalah pertanyaan
analisis.

## 5.2 Halaman: Data Fundamentals

**Tujuan belajar:** mahasiswa dapat membaca dataset dan mengidentifikasi
variabel.

### Konten

-   Dataset, baris/record, kolom/field, variabel, nilai, dan target.
-   Variabel numerik dan kategorikal.
-   Variabel input (fitur) dan target.
-   Contoh hubungan antara data dan pertanyaan bisnis.

### Visual

Gunakan tabel yang menampilkan data penjualan kedai kopi. Saat pengguna
memilih kolom, tampilkan panel penjelasan: - nama kolom; - makna
bisnis; - tipe data; - contoh nilai; - apakah kolom dapat menjadi input
atau target pada contoh tertentu.

### Interaksi

-   Klik nama kolom untuk melihat penjelasan.
-   Pilih satu kolom sebagai target.
-   Pilih kolom yang dapat menjadi input.
-   Tampilkan umpan balik dan alasan.

### Kriteria selesai

Mahasiswa mampu menjelaskan perbedaan baris dan kolom serta memberi
contoh input dan target pada satu kasus.

## 5.3 Halaman: Data Exploration

**Tujuan belajar:** mahasiswa dapat memeriksa struktur data, ringkasan
statistik, dan pola awal.

### Layout

-   Panel dataset.
-   Kartu ringkasan.
-   Grafik.
-   Pertanyaan eksplorasi.
-   Ringkasan temuan.

### Kartu ringkasan

-   Jumlah baris.
-   Jumlah kolom.
-   Jumlah nilai kosong.
-   Nilai rata-rata untuk kolom numerik terpilih.
-   Nilai minimum dan maksimum.

### Grafik

-   Bar chart untuk membandingkan penjualan per hari.
-   Line chart bila data memiliki urutan waktu.
-   Histogram sederhana bila jumlah data memadai.
-   Scatter plot untuk membandingkan dua variabel numerik.

### Interaksi

-   Pilih kolom yang ingin ditampilkan.
-   Pilih jenis grafik yang sesuai.
-   Klik titik/bar untuk melihat nilai.
-   Jawab pertanyaan seperti "Hari mana penjualan tertinggi?"
-   Tampilkan petunjuk bila jawaban salah.

### Catatan pembelajaran

Jelaskan bahwa `head()`, `shape`, `info()`, dan `describe()` adalah
contoh perintah Python yang digunakan saat praktikum. Web dapat
menampilkan padanan visualnya, tetapi tidak perlu berpura-pura
menjalankan Python jika hanya menampilkan hasil statis.

### Kriteria selesai

Mahasiswa dapat menjelaskan apa yang diketahui setelah eksplorasi dan
pertanyaan apa yang masih belum dapat dijawab.

## 5.4 Halaman: Data Preparation

**Tujuan belajar:** mahasiswa memahami bahwa data mentah mungkin belum
siap untuk analisis.

### Dataset latihan

Siapkan data kecil yang sengaja memuat: - satu nilai kosong; - satu
baris duplikat; - satu kategori dengan variasi penulisan, misalnya
"Surabaya" dan "surabaya"; - satu nilai numerik yang perlu diperiksa
kewajarannya.

### Layout

Dua panel berdampingan: - Data sebelum diproses. - Data setelah aturan
pembersihan dipilih.

### Interaksi

Pengguna memilih tindakan: - tandai nilai kosong; - hapus baris
duplikat; - seragamkan huruf kategori; - biarkan nilai yang masih perlu
investigasi.

Setelah memilih tindakan, tampilkan perubahan jumlah baris dan nilai
yang berubah. Untuk versi pertama, perubahan boleh diterapkan pada
dataset lokal kecil menggunakan JavaScript.

### Catatan penting

Jangan otomatis menghapus semua baris dengan nilai kosong. Tampilkan
alasan dan konsekuensi setiap opsi, misalnya kehilangan data atau
potensi bias.

### Kriteria selesai

Mahasiswa dapat menyebutkan masalah data yang ditemukan dan menjelaskan
alasan tindakan pembersihannya.

## 5.5 Halaman: Method Explorer

**Tujuan belajar:** mahasiswa memilih metode berdasarkan tujuan
analisis.

### Tampilan utama

Gunakan pertanyaan bercabang:

1.  Apakah tujuan utamanya memahami data yang tersedia? → Data
    Exploration.
2.  Apakah ingin memprediksi nilai angka? → Regression.
3.  Apakah ingin memprediksi kategori? → Classification.
4.  Apakah ingin menemukan kelompok tanpa label awal? → Clustering.
5.  Apakah ingin mencari item yang sering muncul bersama? → Association
    Rules.
6.  Apakah ingin menganalisis ulasan atau dokumen teks? → Text Mining.
7.  Apakah ingin memahami konsep jaringan saraf untuk pemodelan? → ANN.

### Hasil pilihan

Tampilkan: - nama metode; - tujuan; - contoh pertanyaan bisnis; - bentuk
target atau data yang diperlukan; - contoh visual; - kesalahan umum; -
tautan ke halaman lab.

### Kriteria selesai

Mahasiswa mampu menjelaskan *mengapa* metode tertentu cocok, bukan hanya
menyebut namanya.

## 5.6 Halaman: Regression Lab

**Tujuan belajar:** mahasiswa memahami prediksi angka dan interpretasi
regresi.

### Kasus

Memperkirakan jumlah produk terjual berdasarkan biaya iklan pada contoh
sederhana.

### Komponen

-   Scatter plot.
-   Garis regresi.
-   Keterangan variabel input dan target.
-   Panel untuk memasukkan nilai input pada rentang yang ditentukan.
-   Hasil prediksi demo.
-   Penjelasan koefisien dan intercept.
-   Kartu metrik MAE, MSE, RMSE, dan R².

### Perilaku

Jika model sungguhan belum dihitung, tampilkan **simulasi konseptual**
dan jangan menyebut nilai sebagai hasil model terlatih. Jika prediksi
dihitung dari rumus demo yang jelas, jelaskan bahwa rumus tersebut hanya
ilustrasi.

Metrik harus berasal dari prediksi dan target yang konsisten jika
disebut sebagai metrik model. Jangan mengarang angka metrik atau
menampilkan angka acak.

### Pertanyaan latihan

-   Apa yang menjadi input?
-   Apa yang diprediksi?
-   Apa arti selisih prediksi dan nilai aktual?
-   Mengapa hubungan biaya iklan dan penjualan belum membuktikan
    sebab-akibat?

### Kriteria selesai

Mahasiswa dapat menjelaskan kapan regresi cocok digunakan dan
menyampaikan batasan hasilnya.

## 5.7 Halaman: Classification Lab

**Tujuan belajar:** mahasiswa memahami prediksi kategori dan cara
mengevaluasi kesalahan klasifikasi.

### Kasus

Memprediksi apakah pelanggan akan berhenti berlangganan: "Ya" atau
"Tidak".

### Komponen

-   Dataset kecil dengan label kelas.
-   Diagram alur input → model → prediksi kelas.
-   Decision Tree interaktif sederhana.
-   Penjelasan konsep Naive Bayes.
-   Confusion matrix.
-   Accuracy, precision, recall, dan F1-score.

### Interaksi

Pengguna memilih hasil prediksi pada beberapa contoh pelanggan, lalu
melihat apakah prediksi benar atau salah. Confusion matrix diperbarui
hanya jika sistem benar-benar menghitung hasil dari data latihan yang
disediakan.

### Interpretasi

Jelaskan bahwa metrik yang penting bergantung pada konsekuensi
kesalahan. Dalam kasus pelanggan berhenti berlangganan, melewatkan
pelanggan yang benar-benar akan berhenti mungkin memiliki biaya bisnis
yang berbeda dari memberi peringatan pada pelanggan yang sebenarnya
tetap bertahan.

### Kriteria selesai

Mahasiswa dapat membedakan klasifikasi dari regresi dan menjelaskan
makna confusion matrix secara sederhana.

## 5.8 Halaman: Clustering Lab

**Tujuan belajar:** mahasiswa memahami pengelompokan berdasarkan
kemiripan tanpa label kelas awal.

### Kasus

Mengelompokkan pelanggan berdasarkan frekuensi belanja dan total
pengeluaran.

### Komponen

-   Scatter plot.
-   Pilihan dua fitur.
-   Kontrol jumlah cluster pada rentang demo.
-   Profil ringkas setiap cluster.
-   Penjelasan konsep K-Means, Elbow Method, dan Silhouette Score.

### Perilaku

Jika titik hanya diberi warna berdasarkan contoh yang sudah ditentukan,
beri label "visualisasi ilustratif". Jika K-Means benar-benar
dijalankan, jelaskan fitur yang digunakan, jumlah cluster, dan metode
yang dipakai.

### Latihan

Mahasiswa memilih profil pelanggan yang sesuai dengan cluster dan
mengusulkan strategi bisnis. Jelaskan bahwa label seperti "pelanggan
loyal" adalah interpretasi manusia atas pola, bukan label otomatis yang
selalu benar.

### Kriteria selesai

Mahasiswa dapat menjelaskan tujuan clustering serta perbedaannya dari
classification.

## 5.9 Halaman: Association Rules Lab

**Tujuan belajar:** mahasiswa memahami pola item yang sering muncul
bersama.

### Kasus

Transaksi pembelian produk pada toko atau kedai.

### Komponen

-   Tabel transaksi.
-   Daftar item yang sering muncul bersama.
-   Contoh aturan, misalnya `{roti} → {susu}`.
-   Nilai support dan confidence.
-   Penjelasan konsep Apriori, termasuk kandidat dan pruning secara
    visual.

### Interaksi

Pengguna memilih aturan untuk melihat: - berapa transaksi yang
mengandung item di sisi kiri; - berapa transaksi yang mengandung item di
kedua sisi; - cara menghitung support dan confidence dari data contoh.

### Kriteria selesai

Mahasiswa dapat menjelaskan arti aturan asosiasi dan mengapa asosiasi
tidak otomatis menunjukkan hubungan sebab-akibat.

## 5.10 Halaman: ANN Visualizer

**Tujuan belajar:** mahasiswa memahami struktur dasar artificial neural
network.

### Komponen

-   Diagram input layer, hidden layer, dan output layer.
-   Label neuron, bobot, bias, activation function, dan output.
-   Panel penjelasan yang berubah ketika bagian jaringan dipilih.
-   Ilustrasi aliran data dari input ke output.
-   Ilustrasi training sebagai proses penyesuaian parameter.

### Batasan

Visualisasi animasi tidak sama dengan pelatihan neural network. Beri
label jelas jika nilai atau animasi hanya ilustrasi.

### Kriteria selesai

Mahasiswa dapat menjelaskan fungsi setiap lapisan secara garis besar dan
menyebutkan bahwa bobot dipelajari melalui proses training.

## 5.11 Halaman: Text Mining Lab

**Tujuan belajar:** mahasiswa memahami alur analisis teks dan
interpretasi sentimen.

### Kasus

Ulasan pelanggan tentang produk atau layanan.

### Komponen

-   Daftar ulasan.
-   Teks asli dan teks setelah preprocessing yang relevan.
-   Label sentimen.
-   Grafik distribusi sentimen.
-   Penjelasan skor VADER bila perhitungan tersedia.
-   Pengantar VOSviewer untuk visualisasi jaringan atau topik.

### Catatan bahasa

VADER terutama ditujukan untuk teks bahasa Inggris. Jika contoh ulasan
berbahasa Indonesia digunakan, jelaskan bahwa skor VADER mungkin tidak
dapat diandalkan tanpa metode atau kamus yang sesuai. Jangan mengklaim
akurasi untuk bahasa Indonesia tanpa evaluasi.

### Kriteria selesai

Mahasiswa dapat menjelaskan tahapan text mining dan keterbatasan
analisis sentimen otomatis.

## 5.12 Halaman: Project Workspace

**Tujuan belajar:** mahasiswa dapat mengubah masalah bisnis menjadi
rencana analisis.

### Form yang disediakan

1.  Judul proyek.
2.  Latar belakang atau masalah bisnis.
3.  Pertanyaan analisis.
4.  Tujuan analisis.
5.  Data yang diperlukan.
6.  Variabel penting.
7.  Metode yang dipilih.
8.  Alasan pemilihan metode.
9.  Hasil atau insight.
10. Rekomendasi bisnis.
11. Keterbatasan analisis.

### Perilaku

-   Simpan draf di LocalStorage jika fitur penyimpanan diaktifkan.
-   Sediakan tombol "Salin ringkasan".
-   Sediakan tampilan cetak.
-   Berikan peringatan jika bagian inti belum diisi.
-   Jangan menyatakan proyek valid hanya karena semua kolom terisi.

### Kriteria selesai

Mahasiswa dapat menjelaskan hubungan masalah, data, metode, temuan, dan
rekomendasi secara konsisten.

## 5.13 Halaman: Kuis dan Review

### Jenis latihan

-   Pilihan ganda untuk konsep dasar.
-   Mencocokkan pertanyaan bisnis dengan metode.
-   Membaca grafik.
-   Menginterpretasikan metrik.
-   Mini studi kasus.

### Perilaku

-   Tampilkan satu pertanyaan dalam satu waktu.
-   Setelah menjawab, tampilkan benar/salah dan alasan.
-   Sediakan tombol lanjut dan ulangi.
-   Simpan skor di memori halaman atau LocalStorage jika dipilih.
-   Jangan hanya menampilkan skor akhir; tunjukkan konsep yang perlu
    dipelajari ulang.

------------------------------------------------------------------------

# 6. Data Contoh dan Spesifikasi Dataset

Gunakan dataset kecil, transparan, dan sesuai dengan tujuan tiap metode.

## 6.1 Dataset penjualan kedai kopi

  Hari       Biaya iklan (ribu rupiah)   Produk terjual
  -------- --------------------------- ----------------
  Senin                             20               30
  Selasa                            30               40
  Rabu                              10               20
  Kamis                             40               55
  Jumat                             50               60

Dataset ini dipakai untuk demonstrasi awal eksplorasi dan hubungan dua
variabel numerik. Ukurannya terlalu kecil untuk menyimpulkan hubungan
bisnis yang kuat atau mengukur performa model secara meyakinkan.

File yang disarankan: `data/coffee_sales.csv`.

## 6.2 Dataset pelanggan

Kolom yang disarankan: - `customer_id` --- ID contoh, bukan identitas
nyata. - `purchase_frequency` --- frekuensi pembelian. -
`total_spending` --- total pengeluaran. - `subscription_status` ---
status berlangganan bila diperlukan. - `churn` --- label berhenti
berlangganan untuk demo classification.

Gunakan data fiktif. Pisahkan dataset clustering dari dataset
classification jika kebutuhan kolom atau label berbeda.

## 6.3 Dataset transaksi

Format yang disarankan berupa JSON atau CSV dengan satu transaksi dan
daftar item. Contoh sederhana:

``` json
[
  {"transaction_id": "T001", "items": ["roti", "susu"]},
  {"transaction_id": "T002", "items": ["roti", "kopi"]},
  {"transaction_id": "T003", "items": ["susu", "kopi"]},
  {"transaction_id": "T004", "items": ["roti", "susu", "kopi"]}
]
```

Data ini hanya contoh untuk menjelaskan support dan confidence, bukan
bukti pola penjualan nyata.

## 6.4 Dataset ulasan

Kolom yang disarankan: - `review_id`; - `review_text`; - `language`; -
`sentiment_label` untuk contoh yang sudah diberi label manual.

Sediakan ulasan bahasa Inggris jika demo VADER benar-benar digunakan.
Jika menggunakan bahasa Indonesia, beri label sebagai contoh
keterbatasan bahasa atau gunakan pendekatan yang sesuai dan telah
dievaluasi.

------------------------------------------------------------------------

# 7. Rekomendasi Stack dan Arsitektur Teknis

## 7.1 Pilihan stack utama

Untuk implementasi awal yang sederhana: - HTML5; - CSS3; - JavaScript
modular; - Chart.js lokal untuk grafik bila diperlukan; - CSV/JSON lokal
untuk data; - LocalStorage opsional untuk progres dan draf proyek.

Jika aplikasi berkembang menjadi banyak halaman dan komponen, gunakan
Vite + React. Jangan memakai framework hanya demi terlihat modern; pilih
sesuai kemampuan pengembang dan kebutuhan interaksi.

## 7.2 Struktur folder

``` text
business-analysis-learning-lab/
├── index.html
├── pages/
│   ├── fundamentals.html
│   ├── exploration.html
│   ├── preparation.html
│   ├── method-explorer.html
│   ├── regression.html
│   ├── classification.html
│   ├── clustering.html
│   ├── association-rules.html
│   ├── ann.html
│   ├── text-mining.html
│   ├── project-workspace.html
│   └── quiz.html
├── assets/
│   ├── css/
│   │   ├── tokens.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   └── pages.css
│   ├── js/
│   │   ├── app.js
│   │   ├── navigation.js
│   │   ├── data-loader.js
│   │   ├── exploration.js
│   │   ├── preparation.js
│   │   ├── method-explorer.js
│   │   ├── regression.js
│   │   ├── classification.js
│   │   ├── clustering.js
│   │   ├── association-rules.js
│   │   ├── ann.js
│   │   ├── text-mining.js
│   │   ├── project-workspace.js
│   │   ├── quiz.js
│   │   └── progress.js
│   ├── vendor/
│   │   └── chart.umd.js
│   └── images/
├── data/
│   ├── coffee_sales.csv
│   ├── customer_data.csv
│   ├── transactions.json
│   └── customer_reviews.csv
├── README.md
└── package.json  # hanya jika memakai tooling seperti Vite
```

File vendor harus benar-benar disediakan secara lokal jika web harus
berjalan offline. Nama file pada struktur di atas adalah usulan;
sesuaikan dengan pustaka yang benar-benar dipakai.

## 7.3 Pemisahan tanggung jawab kode

-   **HTML:** struktur halaman dan konten.
-   **CSS:** warna, tipografi, layout, responsivitas, dan status
    interaksi.
-   **Data loader:** memuat dan memvalidasi dataset.
-   **Logic modul:** logika interaksi setiap topik.
-   **Chart layer:** menggambar grafik dan memperbarui visual.
-   **Storage layer:** membaca/menulis progres atau draf lokal.
-   **Content layer:** materi, pertanyaan, pilihan jawaban, dan
    penjelasan.

Hindari menaruh seluruh kode semua fitur ke dalam satu file JavaScript
besar.

## 7.4 Cara menjalankan lokal

Jika menggunakan file statis sederhana, gunakan server lokal ringan
untuk menghindari masalah pemuatan CSV atau modul JavaScript dari
`file://`.

Jika menggunakan Vite: 1. Instal Node.js sesuai kebutuhan tooling. 2.
Buat proyek lokal. 3. Letakkan aset dan dataset dalam folder proyek. 4.
Jalankan instalasi dependensi. 5. Jalankan development server. 6. Buka
alamat localhost yang ditampilkan terminal.

Aplikasi tidak perlu diunggah ke internet. Untuk mode offline, semua
pustaka dan aset yang dibutuhkan harus tersedia secara lokal.
Development server tetap merupakan server lokal, bukan hosting publik.

------------------------------------------------------------------------

# 8. Kontrak Interaksi dan Perilaku UI

Setiap kontrol yang tampak interaktif harus benar-benar melakukan
sesuatu.

  -----------------------------------------------------------------------
  Kontrol                             Perilaku yang diharapkan
  ----------------------------------- -----------------------------------
  Kartu materi                        Membuka halaman atau bagian materi
                                      terkait

  Pemilih kolom                       Memperbarui informasi atau grafik
                                      berdasarkan kolom

  Pemilih grafik                      Mengganti visual sesuai jenis
                                      grafik yang dipilih

  Tombol pembersihan                  Mengubah data demo dan memperbarui
                                      ringkasan

  Pilihan metode                      Menampilkan alasan, kebutuhan data,
                                      dan tautan lab

  Slider/input demo                   Memperbarui prediksi hanya jika
                                      fungsi prediksi tersedia

  Jawaban kuis                        Menampilkan umpan balik dan
                                      penjelasan

  Simpan proyek                       Menyimpan draf secara lokal jika
                                      diimplementasikan

  Salin ringkasan                     Menyalin ringkasan yang terlihat
                                      dan memberi umpan balik

  Cetak                               Membuka tampilan cetak yang rapi
  -----------------------------------------------------------------------

Jangan menampilkan tombol yang belum berfungsi. Jika fitur belum
diimplementasikan, sembunyikan tombol tersebut atau tampilkan status
"Belum tersedia" secara jelas.

------------------------------------------------------------------------

# 9. Desain Visual dan Design System

## 9.1 Arahan tampilan

-   Tampilan bersih dan fokus pada pembelajaran.
-   Gunakan latar netral dengan satu warna utama dan satu warna aksen.
-   Batasi jumlah warna pada grafik; gunakan label dan legenda yang
    jelas.
-   Gunakan kartu untuk tujuan belajar, dataset, metrik, dan latihan.
-   Berikan ruang yang cukup antara penjelasan dan grafik.
-   Hindari dekorasi yang mengalihkan perhatian dari data.

## 9.2 Komponen yang dapat digunakan ulang

-   `AppShell`: sidebar, header, dan area konten.
-   `PageHeader`: judul, deskripsi, breadcrumb.
-   `LearningObjective`: tujuan belajar.
-   `BusinessCaseCard`: konteks kasus bisnis.
-   `ConceptCard`: definisi dan analogi.
-   `DatasetTable`: tabel dataset.
-   `MetricCard`: nilai dan interpretasi metrik.
-   `ChartPanel`: grafik dan keterangannya.
-   `TryItPanel`: kontrol interaktif.
-   `FeedbackPanel`: jawaban dan penjelasan.
-   `SummaryPanel`: ringkasan.
-   `NextLesson`: navigasi ke materi berikutnya.

Nama komponen di atas merupakan konsep; jika memakai HTML biasa,
implementasikan sebagai pola markup dan class CSS.

## 9.3 Responsivitas

-   Desktop: sidebar tetap dan area konten utama.
-   Tablet: sidebar dapat diperkecil atau dibuka melalui menu.
-   Layar kecil: panel disusun vertikal dan tabel dapat digulir
    horizontal.
-   Grafik tidak boleh terpotong dan tetap memiliki label yang dapat
    dibaca.

------------------------------------------------------------------------

# 10. Rencana Implementasi Berurutan

## Sprint 0 --- Persiapan

**Hasil:** fondasi proyek siap dikembangkan.

Tugas: - \[ \] Tentukan stack: HTML/CSS/JavaScript atau Vite + React. -
\[ \] Buat repository dan struktur folder. - \[ \] Siapkan dataset
contoh yang fiktif. - \[ \] Buat wireframe Dashboard dan halaman
materi. - \[ \] Tetapkan aturan visual dan komponen. - \[ \] Tentukan
halaman mana yang menggunakan simulasi dan mana yang menghitung hasil.

**Selesai jika:** struktur proyek dapat dijalankan lokal dan keputusan
teknologi sudah terdokumentasi.

## Sprint 1 --- Shell dan navigasi

**Hasil:** kerangka aplikasi.

Tugas: - \[ \] Buat Dashboard. - \[ \] Buat sidebar/header. - \[ \] Buat
navigasi antarmateri. - \[ \] Buat layout responsif. - \[ \] Buat
halaman 404 atau fallback untuk rute yang tidak dikenal jika memakai
routing. - \[ \] Uji seluruh tautan.

**Selesai jika:** semua halaman dapat diakses dan pengguna tidak menemui
tautan mati.

## Sprint 2 --- Materi dasar

**Hasil:** web sudah dapat dipakai untuk sesi pengantar.

Tugas: - \[ \] Bangun Pengantar Business Analysis. - \[ \] Bangun Data
Fundamentals. - \[ \] Tambahkan alur visual masalah → data → insight. -
\[ \] Tambahkan interaksi identifikasi variabel. - \[ \] Tambahkan kuis
dasar dan umpan balik. - \[ \] Tambahkan ringkasan tiap halaman.

**Selesai jika:** mahasiswa dapat mengikuti materi dasar tanpa perlu
membaca dokumentasi kode.

## Sprint 3 --- Data Exploration dan Preparation

**Hasil:** mahasiswa dapat mengeksplorasi dan memahami pembersihan
dataset contoh.

Tugas: - \[ \] Siapkan parser CSV atau data JSON lokal. - \[ \]
Tampilkan tabel dataset. - \[ \] Hitung jumlah baris/kolom dan ringkasan
numerik yang diperlukan. - \[ \] Buat grafik penjualan. - \[ \] Buat
dataset dengan masalah yang disengaja. - \[ \] Implementasikan tindakan
pembersihan yang dipilih. - \[ \] Tampilkan perbandingan
sebelum/sesudah.

**Selesai jika:** nilai tabel, kartu ringkasan, dan grafik konsisten
dengan dataset yang sedang ditampilkan.

## Sprint 4 --- Method Explorer dan Regression

**Hasil:** mahasiswa dapat memilih metode dan memahami regresi dasar.

Tugas: - \[ \] Buat decision tree pemilihan metode. - \[ \] Tampilkan
penjelasan dan kebutuhan data setiap metode. - \[ \] Buat scatter plot
untuk dataset penjualan. - \[ \] Implementasikan rumus prediksi demo
atau model perhitungan sederhana yang dijelaskan. - \[ \] Tampilkan
prediksi dan batasan. - \[ \] Tambahkan latihan interpretasi.

**Selesai jika:** pengguna dapat membedakan prediksi angka dari
klasifikasi kategori.

## Sprint 5 --- Classification

**Hasil:** mahasiswa memahami prediksi kelas dan evaluasi.

Tugas: - \[ \] Siapkan dataset pelanggan fiktif. - \[ \] Tampilkan
contoh pohon keputusan. - \[ \] Jelaskan Naive Bayes secara
konseptual. - \[ \] Implementasikan contoh confusion matrix yang
konsisten. - \[ \] Hitung metrik dari contoh hasil jika fitur ini dibuat
sebagai perhitungan nyata. - \[ \] Tambahkan latihan tentang konsekuensi
false positive dan false negative.

**Selesai jika:** angka pada confusion matrix dan metrik saling
konsisten.

## Sprint 6 --- Clustering dan Association Rules

**Hasil:** mahasiswa memahami dua metode unsupervised/pencarian pola.

Tugas: - \[ \] Buat visualisasi pelanggan dan profil cluster. - \[ \]
Jelaskan K-Means, Elbow, dan Silhouette. - \[ \] Buat dataset
transaksi. - \[ \] Implementasikan perhitungan support dan confidence
untuk aturan sederhana. - \[ \] Tampilkan cara menghitung aturan dari
transaksi. - \[ \] Tambahkan latihan interpretasi bisnis.

**Selesai jika:** pengguna dapat menjelaskan perbedaan pengelompokan
pelanggan dan aturan item yang muncul bersama.

## Sprint 7 --- ANN dan Text Mining

**Hasil:** mahasiswa memahami konsep neural network dan alur analisis
teks.

Tugas: - \[ \] Buat diagram layer ANN yang dapat dipilih. - \[ \]
Tampilkan istilah dan fungsi setiap komponen. - \[ \] Siapkan dataset
ulasan dengan bahasa yang ditandai. - \[ \] Buat tampilan preprocessing
dan distribusi sentimen. - \[ \] Jika VADER dipakai, jalankan hanya pada
lingkungan yang benar-benar mendukungnya atau sediakan hasil demo yang
jelas berlabel. - \[ \] Jelaskan batasan bahasa dan pendekatan
analisis. - \[ \] Tambahkan pengantar VOSviewer.

**Selesai jika:** visualisasi dibedakan secara jelas dari proses
training atau analisis yang benar-benar dijalankan.

## Sprint 8 --- Project Workspace dan review

**Hasil:** mahasiswa dapat menyusun rencana analisis dan mengevaluasi
pemahaman.

Tugas: - \[ \] Buat form rencana proyek. - \[ \] Buat validasi field
inti. - \[ \] Tambahkan simpan lokal opsional. - \[ \] Tambahkan salin
dan cetak ringkasan. - \[ \] Buat kuis akhir berbasis studi kasus. - \[
\] Tampilkan topik yang perlu diulang. - \[ \] Uji alur dari Dashboard
sampai proyek.

**Selesai jika:** mahasiswa dapat menghasilkan ringkasan proyek yang
berisi masalah, tujuan, data, metode, insight, rekomendasi, dan
keterbatasan.

------------------------------------------------------------------------

# 11. Backlog Fitur Berdasarkan Prioritas

## Must-have --- wajib untuk versi pertama

-   Dashboard.
-   Pengantar Business Analysis.
-   Data Fundamentals.
-   Data Exploration.
-   Method Explorer.
-   Kuis dasar.
-   Navigasi yang berfungsi.
-   Dataset dan grafik yang konsisten.
-   Penjelasan interpretasi hasil.

## Should-have --- setelah fondasi stabil

-   Data Preparation interaktif.
-   Regression Lab.
-   Classification Lab.
-   Project Workspace.
-   Penyimpanan progres lokal.
-   Salin/cetak ringkasan.

## Could-have --- pengembangan lanjutan

-   Clustering Lab dengan perhitungan nyata.
-   Association Rules dengan perhitungan nyata.
-   ANN Visualizer yang lebih detail.
-   Text Mining dengan proses analisis nyata.
-   Unggah dataset CSV oleh pengguna dengan validasi.
-   Ekspor hasil latihan.

## Won't-have --- tidak dikerjakan pada MVP

-   Login pengguna.
-   Sinkronisasi cloud.
-   Dashboard admin.
-   Pengumpulan data mahasiswa ke server.
-   Pelatihan model berat di browser.
-   Integrasi ke layanan berbayar.

------------------------------------------------------------------------

# 12. Kebutuhan Fungsional

  -----------------------------------------------------------------------
  ID                Kebutuhan         Prioritas         Cara menguji
  ----------------- ----------------- ----------------- -----------------
  FR-01             Pengguna dapat    Must              Klik seluruh menu
                    membuka semua                       
                    halaman materi                      

  FR-02             Pengguna dapat    Must              Periksa setiap
                    melihat diagram                     tahap dan label
                    alur analisis                       

  FR-03             Pengguna dapat    Must              Bandingkan tabel
                    melihat dataset                     dengan file
                    contoh                              sumber

  FR-04             Pengguna dapat    Must              Hitung ulang
                    melihat ringkasan                   jumlah
                    data                                baris/kolom dan
                                                        statistik

  FR-05             Pengguna dapat    Must              Uji semua cabang
                    memilih metode                      pilihan
                    dari pertanyaan                     
                    bisnis                              

  FR-06             Kuis memberikan   Must              Uji jawaban benar
                    umpan balik                         dan salah

  FR-07             Pengguna dapat    Must              Periksa judul,
                    melihat grafik                      sumbu, satuan,
                    berlabel                            legenda

  FR-08             Pengguna dapat    Should            Bandingkan data
                    mencoba                             sebelum/sesudah
                    pembersihan data                    

  FR-09             Pengguna dapat    Should            Ubah input dan
                    mencoba demo                        cek hasil sesuai
                    regresi                             aturan demo

  FR-10             Pengguna dapat    Should            Verifikasi
                    membaca confusion                   hitungan dan
                    matrix                              metrik

  FR-11             Pengguna dapat    Should            Isi dan salin
                    menyusun rencana                    ringkasan
                    proyek                              

  FR-12             Progres tersimpan Could             Muat ulang
                    di browser                          halaman dan
                                                        periksa progres

  FR-13             Aplikasi dapat    Must              Matikan koneksi
                    digunakan offline                   dan uji fungsi
                    setelah aset                        inti
                    tersedia                            
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 13. Kebutuhan Nonfungsional

-   **Kemudahan penggunaan:** instruksi singkat dan kontrol mudah
    dipahami.
-   **Konsistensi:** istilah, warna, tombol, dan pola halaman seragam.
-   **Responsivitas:** layout menyesuaikan laptop dan tablet.
-   **Aksesibilitas:** label jelas, kontras cukup, dan navigasi
    keyboard.
-   **Privasi:** data latihan dan progres disimpan lokal jika
    penyimpanan digunakan.
-   **Keandalan:** halaman tidak gagal jika suatu grafik atau dataset
    belum tersedia; tampilkan pesan yang membantu.
-   **Offline:** tidak ada ketergantungan CDN untuk fungsi yang diklaim
    berjalan offline.
-   **Transparansi:** simulasi, contoh statis, dan hasil hitung nyata
    dibedakan.
-   **Pemeliharaan:** konten, data, tampilan, dan logika dipisahkan.

------------------------------------------------------------------------

# 14. Pengujian

## 14.1 Pengujian fungsional

-   Semua menu membuka halaman yang benar.
-   Tombol sebelumnya/berikutnya bekerja.
-   Kontrol grafik memperbarui visual dengan benar.
-   Kuis memberikan umpan balik yang sesuai.
-   Form proyek menerima input dan menampilkan ringkasan.
-   Tombol salin/cetak bekerja jika disediakan.

## 14.2 Pengujian data

-   Jumlah baris pada ringkasan sama dengan dataset.
-   Nilai grafik sesuai dengan data.
-   Penanganan nilai kosong tidak menghasilkan statistik yang salah.
-   Duplikasi hanya dihapus sesuai aturan yang dipilih.
-   Metrik evaluasi berasal dari angka yang konsisten.

## 14.3 Pengujian pembelajaran

Minta mahasiswa melakukan tanpa bantuan: 1. Menentukan masalah dan
pertanyaan bisnis. 2. Menandai variabel input dan target. 3. Memilih
metode yang sesuai. 4. Membaca grafik atau metrik. 5. Menyebutkan
keterbatasan. 6. Menulis insight dan rekomendasi.

Catat tahap mana yang masih membingungkan, lalu revisi konten dan
latihan.

## 14.4 Pengujian offline

-   Buka aplikasi melalui cara lokal yang didokumentasikan.
-   Pastikan CSS, JavaScript, ikon, pustaka grafik, dan dataset tersedia
    lokal.
-   Putuskan koneksi internet.
-   Uji navigasi, materi, grafik, kuis, dan fitur penyimpanan lokal.
-   Jika fitur tertentu membutuhkan internet, tandai dengan jelas dan
    jangan memasukkannya sebagai fungsi offline inti.

------------------------------------------------------------------------

# 15. Panduan Konten untuk Pengajar

Setiap topik sebaiknya dapat diajarkan dengan urutan 10--20 menit: 1.
Tanyakan masalah bisnis. 2. Minta mahasiswa menebak data yang
dibutuhkan. 3. Jelaskan konsep dengan analogi. 4. Buka visualisasi dan
minta mahasiswa mengamati. 5. Minta mahasiswa membuat interpretasi
sendiri. 6. Bandingkan interpretasi dengan penjelasan yang tersedia. 7.
Tutup dengan kuis singkat.

Jangan langsung memberi jawaban sebelum mahasiswa mencoba. Minta mereka
menjelaskan **alasan** pemilihan metode dan makna hasil dengan kalimat
sendiri.

------------------------------------------------------------------------

# 16. Indikator Keberhasilan Produk

Produk siap dipakai untuk sesi belajar jika: - semua fungsi Must-have
selesai; - tidak ada tautan utama yang rusak; - contoh data, grafik, dan
ringkasan konsisten; - kuis memberi umpan balik yang relevan; - konten
menjelaskan batasan metode; - fungsi inti berjalan tanpa internet
setelah aset tersedia lokal; - mahasiswa dapat menyelesaikan studi kasus
dasar dengan bantuan minimal.

Keberhasilan pembelajaran dinilai dari kemampuan mahasiswa, bukan
sekadar jumlah halaman atau animasi.

------------------------------------------------------------------------

# 17. Risiko dan Mitigasi

  -----------------------------------------------------------------------
  Risiko                  Dampak                  Mitigasi
  ----------------------- ----------------------- -----------------------
  Terlalu banyak fitur    MVP tidak selesai       Kerjakan sesuai sprint
  dibuat sekaligus                                dan backlog

  Materi menjadi terlalu  Mahasiswa pemula        Mulai dari kasus bisnis
  teknis                  kehilangan konteks      dan visual

  Grafik tidak sesuai     Salah pemahaman         Validasi nilai grafik
  dengan data                                     terhadap dataset

  Simulasi dianggap       Interpretasi keliru     Beri label dan jelaskan
  sebagai model nyata                             cara hasil dibuat

  VADER digunakan pada    Sentimen keliru         Jelaskan keterbatasan
  bahasa yang tidak                               bahasa dan evaluasi
  sesuai                                          metode

  Offline gagal karena    Materi tidak bisa       Simpan pustaka dan aset
  CDN                     digunakan               secara lokal

  Proyek terlalu panjang  Penyelesaian tertunda   Dahulukan dashboard,
  untuk satu pengembang                           dasar, exploration,
                                                  method explorer, dan
                                                  kuis
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 18. Checklist Rilis MVP

-   [ ] Aplikasi dapat dijalankan dari komputer lokal.
-   [ ] Dashboard menjelaskan tujuan web dan cara memulai.
-   [ ] Pengantar Business Analysis tersedia.
-   [ ] Data Fundamentals tersedia.
-   [ ] Dataset contoh dapat dibaca.
-   [ ] Data Exploration memiliki ringkasan dan grafik.
-   [ ] Method Explorer dapat membantu memilih metode.
-   [ ] Kuis dasar berfungsi.
-   [ ] Umpan balik jawaban jelas.
-   [ ] Tampilan responsif.
-   [ ] Tidak ada tombol mati atau tautan rusak.
-   [ ] Contoh statis dan simulasi diberi label yang jujur.
-   [ ] Fungsi inti telah diuji dalam kondisi offline.
-   [ ] README menjelaskan cara menjalankan aplikasi.

------------------------------------------------------------------------

# 19. Urutan Prioritas Akhir

**Bangun terlebih dahulu:** 1. Dashboard dan navigasi. 2. Pengantar
Business Analysis. 3. Data Fundamentals. 4. Data Exploration. 5. Method
Explorer. 6. Kuis dasar.

**Lanjutkan setelah fondasi stabil:** 7. Data Preparation. 8.
Regression. 9. Classification. 10. Clustering dan Association Rules. 11.
ANN dan Text Mining. 12. Project Workspace dan evaluasi akhir.

Prinsip keputusan: prioritaskan fitur yang membantu mahasiswa **memahami
dan menjelaskan** sebelum menambah fitur yang sekadar terlihat canggih.
Aplikasi baru dianggap efektif jika mahasiswa dapat menghubungkan
pertanyaan bisnis dengan data, metode, hasil, dan rekomendasi.
