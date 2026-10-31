# Business Analysis Learning Lab 🎓📊

> **Platform Web Pembelajaran Interaktif Analisis Data Bisnis untuk Mahasiswa Program Studi Bisnis Digital**

Business Analysis Learning Lab dirancang khusus untuk memandu mahasiswa memahami proses analisis data bisnis secara komprehensif — mulai dari merumuskan masalah nyata bisnis, membersihkan data, memilih metode yang tepat, membaca metrik evaluasi matematis, hingga menyusun rekomendasi keputusan bernilai strategis.

---

## 🚀 Prinsip Utama Pembelajaran
```text
Masalah Bisnis ➔ Pertanyaan Analisis ➔ Data ➔ Eksplorasi ➔ Persiapan ➔ Metode ➔ Hasil ➔ Insight ➔ Rekomendasi
```

Setiap modul di laboratorium ini menggunakan studi kasus terpadu: **Kedai Kopi Senja** (penurunan omset sore hari, optimasi biaya promosi, segmentasi pelanggan, kombinasi menu kasir, dan ulasan kepuasan konsumen).

---

## ⚡ Cara Menjalankan Aplikasi Secara Lokal (100% Offline Ready)

Aplikasi ini tidak memerlukan instalasi database, akun login, maupun koneksi internet (semua aset CSS, JavaScript, font fallback, pustaka Chart.js, dan dataset tersedia secara lokal).

### Opsi 1: Menggunakan Node.js (Disarankan)
Pastikan Node.js telah terpasang di komputer Anda:
```bash
# Jalankan server lokal
npm start
# atau
node server.js
```
Buka peramban (browser) di alamat: **`http://localhost:3000`**

### Opsi 2: Menggunakan Python
```bash
python -m http.server 3000
```
Buka peramban di: **`http://localhost:3000`**

### Opsi 3: Membuka Langsung File HTML
Buka file `index.html` langsung di peramban favorit Anda (Chrome, Edge, Firefox). Berkat sistem **Embedded Fallback Dataset**, seluruh visualisasi dan perhitungan interaktif tetap berfungsi mulus tanpa kendala CORS.

---

## 📂 Struktur Direktori Proyek

```text
bisnisanalis/
├── index.html                   # Dashboard Utama & Diagram Alur Analisis Bisnis
├── pages/
│   ├── intro.html               # Modul 01: Pengantar BA, Piramida Data-Keputusan & Latihan
│   ├── fundamentals.html        # Modul 02: Data Fundamentals, Column Inspector & X vs Y
│   ├── exploration.html         # Modul 03: Data Exploration (EDA), Chart.js & Panduan Python
│   ├── preparation.html         # Modul 04: Data Preparation, Side-by-Side Pembersihan Data
│   ├── method-explorer.html     # Modul 05: Method Explorer & Wizard Pohon Keputusan
│   ├── regression.html          # Modul 06: Regression Lab (OLS, Slider Prediksi, MAE, R²)
│   ├── classification.html      # Modul 07: Classification Lab (Decision Tree, Confusion Matrix)
│   ├── clustering.html          # Modul 08: Clustering Lab (K-Means 2D & Profil Persona)
│   ├── association-rules.html   # Modul 09: Association Rules Lab (Apriori, Support, Lift)
│   ├── ann.html                 # Modul 10: ANN Visualizer (Interactive Canvas & Forward Pass)
│   ├── text-mining.html         # Modul 11: Text Mining Lab (Pipeline NLP & Batasan VADER)
│   ├── project-workspace.html   # Modul 12: Project Workspace (Kanvas 11-Bagian, Auto-save & Print)
│   └── quiz.html                # Modul 13: Kuis Komprehensif 15 Soal & Analisis Review
├── assets/
│   ├── css/
│   │   ├── tokens.css           # Variabel desain, palet warna modern, dark/light theme
│   │   ├── layout.css           # App shell, responsive sidebar, breadcrumbs, drawer mobile
│   │   ├── components.css       # Cards, buttons, tables, badges, alert callouts, feedback
│   │   └── pages.css            # Gaya visual khusus lab, confusion matrix, canvas ANN
│   ├── js/
│   │   ├── app.js               # Inisialisasi tema, sistem toast, format mata uang Rupiah
│   │   ├── navigation.js        # Active state sidebar, mobile drawer, urutan modul
│   │   ├── progress.js          # Pelacak progres belajar & sinkronisasi LocalStorage
│   │   ├── data-loader.js       # Pemuat dataset lokal + embedded offline fallback
│   │   ├── intro.js             # Logika kartu accordion & latihan matching kategori
│   │   ├── fundamentals.js      # Table column inspector & latihan variabel input-target
│   │   ├── exploration.js       # Grafik Chart.js dinamis & ringkasan statistik
│   │   ├── preparation.js       # Transformasi pembersihan sebelum vs sesudah
│   │   ├── method-explorer.js   # Wizard pohon keputusan interaktif & filter katalog
│   │   ├── regression.js        # Rumus matematis regresi OLS & simulator slider iklan
│   │   ├── classification.js    # Pohon churn, live Confusion Matrix & tradeoff FP vs FN
│   │   ├── clustering.js        # Algoritma K-Means, pembaruan centroid & persona segmen
│   │   ├── association-rules.js # Perhitungan Support, Confidence, Lift ratio Apriori
│   │   ├── ann.js               # Canvas neural network, animasi denyut sinyal forward pass
│   │   ├── text-mining.js       # Pipeline NLP tahapan tokenisasi & visualisasi sentimen
│   │   ├── project-workspace.js # Auto-save draft, pemuat sampel kasus, salin & cetak PDF
│   │   └── quiz.js              # Kuis 15 pertanyaan, penilaian instan & rekomendasi review
│   └── vendor/
│       └── chart.umd.js         # Library Chart.js lokal (bebas ketergantungan CDN internet)
├── data/
│   ├── coffee_sales.csv         # Dataset penjualan harian Kedai Kopi Senja (14 baris)
│   ├── dirty_coffee_data.csv    # Dataset kotor untuk latihan pembersihan data
│   ├── customer_churn.csv       # Dataset langganan & churn untuk klasifikasi
│   ├── customer_clustering.csv  # Dataset perilaku frekuensi & belanja untuk segmentasi
│   ├── transactions.json        # Data struk kasir untuk Market Basket Analysis
│   └── customer_reviews.json    # Ulasan pelanggan dwibahasa untuk Text Mining
├── server.js                    # Web server lokal ringan tanpa dependensi eksternal
├── package.json                 # Konfigurasi proyek
└── README.md                    # Dokumentasi lengkap
```

---

## 🎯 Fitur & Kepatuhan Terhadap Rencana Detail

1. **Kejujuran Ilmiah & Label Transparan**:
   - Simulasi grafis diberi label **Demo Konseptual**.
   - Model yang dihitung dari rumus riil (Regresi OLS, Confusion Matrix, K-Means, Apriori) diberi label **Hasil Perhitungan Riil** disertai catatan batasan kausalitas.
2. **Kemandirian Offline (Offline Readiness)**:
   - Chart.js disimpan di `assets/vendor/chart.umd.js`.
   - Data memiliki fallback tertanam di `data-loader.js` jika protokol `file://` memblokir pembacaan lokal.
3. **Penyimpanan Progres Lokal**:
   - Status topik yang selesai dan draf kanvas di `Project Workspace` otomatis tersimpan aman di `localStorage` peramban.
4. **Desain Visual Modern & Responsif**:
   - Palet warna dark mode bertema slate & indigo neon yang elegan.
   - Tersedia toggle **Mode Terang / Mode Gelap**.
   - Responsif untuk layar desktop, tablet, maupun ponsel dengan drawer menu.
   - Dukungan cetak rapi (`@media print`) untuk lembar kerja proyek mahasiswa.

---

## 👩‍🏫 Panduan Pengajar dalam Sesi Tutoring 1-on-1

1. **Buka Dashboard**: Mulai dengan meninjau diagram 9-tahap Alur Analisis Bisnis.
2. **Sajikan Studi Kasus**: Minta mahasiswa menjelaskan masalah Kedai Kopi Senja dengan kalimatnya sendiri.
3. **Eksplorasi Bersama**: Minta mahasiswa mengidentifikasi kolom mana yang menjadi target sebelum membuka tab solusi.
4. **Tantang Pemahaman Konsep**: Pada modul regresi atau klasifikasi, ajukan pertanyaan: *"Mengapa korelasi 97% belum membuktikan iklan sebagai satu-satunya penyebab kenaikan penjualan?"*
5. **Praktik Mandiri**: Minta mahasiswa mengisi `Project Workspace` atau mencoba kuis komprehensif untuk mengukur retensi konsep.

---
*Dikembangkan dengan standar akademik Program Studi Bisnis Digital.*
