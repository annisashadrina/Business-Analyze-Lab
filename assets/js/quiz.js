/**
 * Business Analysis Learning Lab - Comprehensive Quiz & Review Logic
 * 15 interactive questions, instant feedback, scoring and topic review recommendations
 */

document.addEventListener("DOMContentLoaded", () => {
  const quizBank = [
    {
      id: 1,
      topic: "Pengantar Business Analysis",
      topicUrl: "intro.html",
      question: "Manakah pernyataan di bawah ini yang paling tepat menggambarkan perbedaan antara 'Masalah Bisnis' dan 'Pertanyaan Analisis'?",
      options: [
        { text: "Masalah bisnis berupa angka statistik, sedangkan pertanyaan analisis berupa teks.", isCorrect: false },
        { text: "Masalah bisnis adalah kondisi kerugian/kendala yang dihadapi perusahaan, sedangkan pertanyaan analisis adalah pertanyaan terarah untuk membedah data.", isCorrect: true },
        { text: "Pertanyaan analisis selalu dijawab dengan algoritma machine learning, masalah bisnis tidak butuh data.", isCorrect: false },
        { text: "Keduanya memiliki arti yang sama dan dapat saling menggantikan.", isCorrect: false }
      ],
      explanation: "Masalah bisnis adalah kesenjangan antara kenyataan dan target (misal: 'omset turun 30%'), sedangkan pertanyaan analisis adalah instrumen penyelidikan data (misal: 'apakah penurunan terjadi di hari tertentu?')."
    },
    {
      id: 2,
      topic: "Data Fundamentals",
      topicUrl: "fundamentals.html",
      question: "Jika manajemen cafe ingin memprediksi total cup kopi yang terjual berdasarkan anggaran iklan dan promo aktif, manakah yang merupakan 'Variabel Target (Y)'?",
      options: [
        { text: "Biaya iklan", isCorrect: false },
        { text: "Status promo aktif", isCorrect: false },
        { text: "Produk terjual (cup)", isCorrect: true },
        { text: "ID Transaksi kasir", isCorrect: false }
      ],
      explanation: "Variabel Target (Y) adalah nilai akhir yang ingin diprediksi atau diestimasi oleh model (dalam kasus ini adalah jumlah produk yang terjual)."
    },
    {
      id: 3,
      topic: "Data Preparation",
      topicUrl: "preparation.html",
      question: "Mengapa seorang Business Analyst sebaiknya TIDAK terburu-buru langsung menghapus semua baris data yang memiliki nilai kosong (missing values)?",
      options: [
        { text: "Karena baris kosong pasti menghasilkan prediksi yang selalu akurat 100%.", isCorrect: false },
        { text: "Karena penghapusan sembarangan dapat menghilangkan data berharga dan berisiko menimbulkan bias seleksi dalam analisis.", isCorrect: true },
        { text: "Karena komputer tidak mengizinkan penghapusan data sama sekali.", isCorrect: false },
        { text: "Karena nilai kosong otomatis bernilai nol.", isCorrect: false }
      ],
      explanation: "Menghapus baris missing secara membabi buta dapat memangkas ukuran sampel secara drastis dan berpotensi membuang segmen pelanggan tertentu secara tidak sengaja (selection bias)."
    },
    {
      id: 4,
      topic: "Data Preparation",
      topicUrl: "preparation.html",
      question: "Dalam tabel tercatat cabang kota: 'Surabaya', 'surabaya', dan 'SURABAYA'. Masalah kualitas data apakah ini dan apa solusinya?",
      options: [
        { text: "Outlier data angka; solusinya menghapus seluruh baris kota.", isCorrect: false },
        { text: "Inkonsistensi penulisan kategori teks; solusinya standarisasi huruf (casing) menjadi seragam.", isCorrect: true },
        { text: "Duplikasi data transaksi; solusinya membagi angka dengan dua.", isCorrect: false },
        { text: "Missing value; solusinya mengisi dengan nilai median.", isCorrect: false }
      ],
      explanation: "Perbedaan kapitalisasi huruf akan menyebabkan komputer menganggap ketiga kota tersebut sebagai 3 entitas yang berbeda. Solusinya adalah standardisasi string (misal: Title Case atau Lowercase)."
    },
    {
      id: 5,
      topic: "Data Exploration",
      topicUrl: "exploration.html",
      question: "Dalam praktikum Python pandas, perintah apakah yang paling tepat digunakan untuk melihat ringkasan statistik (rata-rata, nilai min, max, standar deviasi) kolom numerik?",
      options: [
        { text: "df.head()", isCorrect: false },
        { text: "df.shape", isCorrect: false },
        { text: "df.describe()", isCorrect: true },
        { text: "df.columns", isCorrect: false }
      ],
      explanation: "df.describe() menghasilkan ringkasan statistik deskriptif numerik seperti count, mean, std, min, 25%, 50%, 75%, dan max."
    },
    {
      id: 6,
      topic: "Method Explorer",
      topicUrl: "method-explorer.html",
      question: "Kapan Anda harus memilih metode Regresi Linier dibandingkan Klasifikasi (Decision Tree)?",
      options: [
        { text: "Ketika variabel target yang ingin diprediksi bertipe angka kontinu, bukan kategori kelas.", isCorrect: true },
        { text: "Ketika dataset tidak memiliki variabel target sama sekali.", isCorrect: false },
        { text: "Ketika data berupa dokumen teks artikel ilmiah.", isCorrect: false },
        { text: "Ketika ingin mencari asosiasi keranjang belanja.", isCorrect: false }
      ],
      explanation: "Regresi digunakan untuk memprediksi angka kontinu (seperti rupiah, suhu, atau kuantitas terjual), sedangkan Klasifikasi digunakan untuk label kategori (seperti Ya/Tidak atau Kategori A/B)."
    },
    {
      id: 7,
      topic: "Regression Lab",
      topicUrl: "regression.html",
      question: "Pada persamaan regresi ŷ = 0.95x + 10.5, apa makna bisnis dari angka kemiringan (slope) 0.95 jika x adalah biaya iklan (ribu Rp) dan y adalah cup terjual?",
      options: [
        { text: "Pasti ada 0.95 orang yang datang ke cafe setiap hari.", isCorrect: false },
        { text: "Setiap penambahan biaya iklan sebesar Rp 1.000, perkiraan produk yang terjual bertambah sekitar 0.95 cup.", isCorrect: true },
        { text: "Biaya iklan menyumbang 95% dari seluruh kerugian cafe.", isCorrect: false },
        { text: "Cafe selalu menjual 10.5 cup terlepas dari kualitas produk.", isCorrect: false }
      ],
      explanation: "Slope (m) mengukur perubahan rata-rata pada target Y untuk setiap peningkatan 1 unit pada variabel prediktor X."
    },
    {
      id: 8,
      topic: "Regression Lab",
      topicUrl: "regression.html",
      question: "Mengapa tingginya nilai R² (misal 95%) antara biaya iklan dan penjualan kopi belum membuktikan bahwa iklan adalah satu-satunya penyebab kenaikan penjualan?",
      options: [
        { text: "Karena R² di atas 90% selalu merupakan indikasi kesalahan program komputer.", isCorrect: false },
        { text: "Karena korelasi statistik yang kuat tidak secara otomatis membuktikan hubungan kausalitas murni (bisa ada faktor perancu seperti akhir pekan atau promo).", isCorrect: true },
        { text: "Karena regresi linier hanya dapat digunakan pada data biner.", isCorrect: false },
        { text: "Karena nilai MAE harus selalu lebih besar dari MSE.", isCorrect: false }
      ],
      explanation: "Prinsip fundamental data: 'Correlation does not imply causation'. Kenaikan penjualan bisa bersamaan dengan hari libur atau tren viral yang kebetulan bertepatan dengan jadwal pasang iklan."
    },
    {
      id: 9,
      topic: "Classification Lab",
      topicUrl: "classification.html",
      question: "Dalam Confusion Matrix evaluasi prediksi Churn pelanggan, apa arti dari 'False Negative (FN)'?",
      options: [
        { text: "Pelanggan sebenarnya berhenti (churn), namun model salah menduganya sebagai tetap langganan.", isCorrect: true },
        { text: "Pelanggan tetap langganan, dan model memprediksi tetap langganan dengan benar.", isCorrect: false },
        { text: "Pelanggan tetap langganan, namun model keliru menduganya akan churn.", isCorrect: false },
        { text: "Pelanggan yang tidak pernah bertransaksi sama sekali.", isCorrect: false }
      ],
      explanation: "False Negative terjadi ketika kasus positif (churn) luput dan keliru diklasifikasikan sebagai negatif (tetap aman), sehingga tim bisnis kehilangan kesempatan untuk menyelamatkan pelanggan tersebut."
    },
    {
      id: 10,
      topic: "Classification Lab",
      topicUrl: "classification.html",
      question: "Jika biaya mempertahankan pelanggan lama jauh lebih murah daripada mencari pelanggan baru, metrik manakah yang paling diutamakan untuk meminimalkan pelanggan churn yang lolos?",
      options: [
        { text: "Recall (Sensitivitas)", isCorrect: true },
        { text: "Waktu eksekusi CPU", isCorrect: false },
        { text: "Jumlah baris duplikat", isCorrect: false },
        { text: "Nilai Intercept regresi", isCorrect: false }
      ],
      explanation: "Recall memprioritaskan kemampuan model untuk menangkap sebanyak mungkin kasus positif yang sebenarnya (memperkecil False Negative)."
    },
    {
      id: 11,
      topic: "Clustering Lab",
      topicUrl: "clustering.html",
      question: "Manakah pernyataan yang BENAR mengenai algoritma K-Means Clustering?",
      options: [
        { text: "Algoritma K-Means memerlukan data berlabel seperti nilai lulus/gagal di awal.", isCorrect: false },
        { text: "Pemberian nama segmen (seperti 'Sultan Loyal') merupakan interpretasi analisis bisnis oleh manusia atas karakteristik sebaran data cluster.", isCorrect: true },
        { text: "Jumlah cluster K yang optimal selalu bernilai 10 di semua industri.", isCorrect: false },
        { text: "K-Means hanya bekerja pada variabel teks bahasa Inggris.", isCorrect: false }
      ],
      explanation: "K-Means mengelompokkan data berdasarkan jarak geometris semata. Pelabelan makna bisnis profil cluster merupakan peran penting business analyst."
    },
    {
      id: 12,
      topic: "Association Rules Lab",
      topicUrl: "association-rules.html",
      question: "Jika aturan asosiasi {Croissant Mentega} → {Kopi Susu Senja} memiliki nilai Lift Ratio = 1.65, apa maknanya?",
      options: [
        { text: "Pembelian kedua produk tersebut bersifat acak dan tidak saling mempengaruhi.", isCorrect: false },
        { text: "Pelanggan yang membeli Croissant memiliki kecenderungan 1.65 kali lebih besar untuk membeli Kopi Susu dibandingkan pelanggan umum.", isCorrect: true },
        { text: "Harga Croissant harus dinaikkan sebesar 165%.", isCorrect: false },
        { text: "Hanya ada 1.65 transaksi kasir di cafe tersebut.", isCorrect: false }
      ],
      explanation: "Lift > 1 mengindikasikan adanya asosiasi positif yang kuat, menjadikannya kandidat sempurna untuk paket bundling promosi."
    },
    {
      id: 13,
      topic: "ANN Visualizer",
      topicUrl: "ann.html",
      question: "Apa fungsi dari 'Fungsi Aktivasi' (seperti ReLU atau Sigmoid) di dalam neuron jaringan saraf tiruan (ANN)?",
      options: [
        { text: "Menghapus dataset yang tidak memiliki label.", isCorrect: false },
        { text: "Memasukkan sifat non-linearitas agar jaringan mampu memodelkan pola data yang kompleks.", isCorrect: true },
        { text: "Mengganti peran koneksi internet pada server lokal.", isCorrect: false },
        { text: "Menghitung nilai mean dan standar deviasi tabel.", isCorrect: false }
      ],
      explanation: "Tanpa fungsi aktivasi non-linear, berapapun banyaknya lapisan (layer) dalam ANN hanya akan menjadi operasi transformasi linier biasa."
    },
    {
      id: 14,
      topic: "Text Mining Lab",
      topicUrl: "text-mining.html",
      question: "Mengapa modul VADER standar tidak disarankan langsung dipakai untuk ulasan bahasa Indonesia gaul/slang tanpa modifikasi leksikon?",
      options: [
        { text: "Karena kamus leksikon bawaan VADER dirancang dan divalidasi spesifik untuk kosakata dan idiom bahasa Inggris.", isCorrect: true },
        { text: "Karena bahasa Indonesia tidak memiliki emosi positif atau negatif.", isCorrect: false },
        { text: "Karena VADER hanya boleh dijalankan di cloud server berbayar.", isCorrect: false },
        { text: "Karena VADER tidak mampu menghitung angka desimal.", isCorrect: false }
      ],
      explanation: "VADER mengandalkan daftar kata (lexicon) bahasa Inggris. Kata bahasa Indonesia seperti 'enak pol' atau 'amburadul' tidak akan dikenali tanpa adaptasi leksikon."
    },
    {
      id: 15,
      topic: "Project Workspace",
      topicUrl: "project-workspace.html",
      question: "Dalam menyusun kanvas proyek analisis bisnis, mengapa bagian 'Keterbatasan Analisis' wajib dicantumkan?",
      options: [
        { text: "Agar proyek dinyatakan otomatis tidak valid oleh pengajar.", isCorrect: false },
        { text: "Untuk memberikan transparansi kepada manajemen mengenai asumsi, potensi risiko, dan batasan cakupan data sebelum keputusan bisnis dieksekusi.", isCorrect: true },
        { text: "Sebagai formalitas untuk memperpanjang laporan tertulis.", isCorrect: false },
        { text: "Agar biaya implementasi promosi dapat dinaikkan dua kali lipat.", isCorrect: false }
      ],
      explanation: "Transparansi atas batasan metodologi dan data (misal: ukuran sampel kecil atau faktor eksternal tak terukur) melindungi manajemen dari keputusan berisiko tinggi."
    }
  ];

  let currentIdx = 0;
  let userAnswers = {}; // { qIndex: selectedOptionIndex }
  let score = 0;

  const qCard = document.getElementById("quiz-card-container");
  const resultCard = document.getElementById("quiz-result-container");
  const progFill = document.getElementById("quiz-progress-fill");
  const progText = document.getElementById("quiz-progress-text");

  function renderQuestion(index) {
    if (!qCard) return;
    const q = quizBank[index];
    currentIdx = index;

    // Update progress bar
    if (progFill) progFill.style.width = `${Math.round(((index) / quizBank.length) * 100)}%`;
    if (progText) progText.textContent = `Pertanyaan ${index + 1} dari ${quizBank.length} (${q.topic})`;

    qCard.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <span class="badge badge-brand">${q.topic}</span>
        <span style="font-size: var(--font-size-xs); color: var(--text-subtle);">Soal #${index + 1}</span>
      </div>

      <div class="quiz-question-text">${q.question}</div>

      <div class="quiz-options-list">
        ${q.options.map((opt, oIdx) => `
          <button class="quiz-option-btn" data-opt-idx="${oIdx}">
            <span style="font-weight: 700; width: 24px; height: 24px; border-radius: 50%; background: rgba(255,255,255,0.08); display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;">
              ${String.fromCharCode(65 + oIdx)}
            </span>
            <span>${opt.text}</span>
          </button>
        `).join("")}
      </div>

      <div id="quiz-feedback-box" class="feedback-box"></div>

      <div style="margin-top: var(--space-6); display: flex; justify-content: flex-end;">
        <button id="btn-quiz-next" class="btn btn-primary" style="display: none;">
          ${index === quizBank.length - 1 ? 'Lihat Hasil Akhir Review 🏁' : 'Soal Berikutnya →'}
        </button>
      </div>
    `;

    // Attach option click listeners
    const optButtons = qCard.querySelectorAll(".quiz-option-btn");
    const feedbackBox = document.getElementById("quiz-feedback-box");
    const nextBtn = document.getElementById("btn-quiz-next");

    optButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const oIdx = Number(btn.dataset.optIdx);
        userAnswers[index] = oIdx;

        // Disable all options
        optButtons.forEach(b => b.disabled = true);

        const isCorrect = q.options[oIdx].isCorrect;
        if (isCorrect) {
          btn.classList.add("selected-correct");
          feedbackBox.className = "feedback-box correct";
          feedbackBox.innerHTML = `<strong>✓ Jawaban Anda Benar!</strong><br>${q.explanation}`;
          score++;
        } else {
          btn.classList.add("selected-wrong");
          // highlight the right one
          const correctIdx = q.options.findIndex(o => o.isCorrect);
          if (correctIdx > -1) {
            optButtons[correctIdx].classList.add("selected-correct");
          }
          feedbackBox.className = "feedback-box incorrect";
          feedbackBox.innerHTML = `<strong>✗ Jawaban Belum Tepat.</strong><br>${q.explanation}`;
        }

        if (nextBtn) nextBtn.style.display = "inline-flex";
      });
    });

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (currentIdx < quizBank.length - 1) {
          renderQuestion(currentIdx + 1);
        } else {
          showResults();
        }
      });
    }
  }

  function showResults() {
    if (!qCard || !resultCard) return;
    qCard.style.display = "none";
    resultCard.style.display = "block";

    const percent = Math.round((score / quizBank.length) * 100);
    const passed = percent >= 70;

    let badgeText = passed ? "Lulus dengan Baik 🎉" : "Perlu Belajar Ulang 📚";
    let badgeClass = passed ? "badge-verified" : "badge-demo";

    // Analyze weak topics
    const weakTopics = [];
    quizBank.forEach((q, idx) => {
      const selected = userAnswers[idx];
      if (selected === undefined || !q.options[selected]?.isCorrect) {
        if (!weakTopics.some(w => w.topic === q.topic)) {
          weakTopics.push({ topic: q.topic, url: q.topicUrl });
        }
      }
    });

    resultCard.innerHTML = `
      <div style="text-align: center; margin-bottom: var(--space-8);">
        <span class="badge ${badgeClass}" style="font-size: var(--font-size-sm); padding: 6px 16px;">${badgeText}</span>
        <h2 style="font-family: var(--font-family-heading); font-size: var(--font-size-4xl); color: #ffffff; margin-top: var(--space-3);">
          Skor Anda: ${percent}%
        </h2>
        <p style="color: var(--text-muted); font-size: var(--font-size-base); margin-top: var(--space-2);">
          Anda menjawab benar <strong>${score}</strong> dari <strong>${quizBank.length}</strong> pertanyaan konsep business analysis.
        </p>
      </div>

      <div class="card" style="margin-bottom: var(--space-8);">
        <h3 class="card-title">📋 Rekomendasi Review Berdasarkan Hasil Kuis</h3>
        ${weakTopics.length === 0 ? `
          <div style="color: var(--color-success); font-weight: 600; font-size: var(--font-size-sm);">
            🎉 Luar biasa! Anda menguasai seluruh konsep materi tanpa ada topik yang perlu diulang.
          </div>
        ` : `
          <p style="font-size: var(--font-size-sm); color: var(--text-muted); margin-bottom: var(--space-4);">
            Berdasarkan jawaban Anda, berikut adalah modul yang disarankan untuk dibuka dan dipelajari kembali sebelum sesi ujian:
          </p>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: var(--space-2);">
            ${weakTopics.map(w => `
              <li style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface); padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <span style="font-weight: 600; color: #ffffff;">📖 ${w.topic}</span>
                <a href="${w.url}" class="btn btn-outline btn-sm">Buka Materi Lab →</a>
              </li>
            `).join("")}
          </ul>
        `}
      </div>

      <div style="display: flex; gap: var(--space-4); justify-content: center; flex-wrap: wrap;">
        <button id="btn-restart-quiz" class="btn btn-primary">Ulangi Kuis 🔄</button>
        <a href="project-workspace.html" class="btn btn-secondary">Buka Project Workspace 📝</a>
        <a href="../index.html" class="btn btn-outline">Kembali ke Dashboard 🏠</a>
      </div>
    `;

    document.getElementById("btn-restart-quiz")?.addEventListener("click", () => {
      score = 0;
      userAnswers = {};
      resultCard.style.display = "none";
      qCard.style.display = "block";
      renderQuestion(0);
    });

    if (window.ProgressManager) {
      window.ProgressManager.saveQuizResult(score, quizBank.length);
    }
  }

  renderQuestion(0);
});
