/**
 * Business Analysis Learning Lab - Method Explorer Module Logic
 * Branching Decision Tree Wizard and Method Knowledge Catalog
 */

document.addEventListener("DOMContentLoaded", () => {
  const wizardContainer = document.getElementById("wizard-step-container");
  const resultContainer = document.getElementById("wizard-result-card");
  const resetBtn = document.getElementById("btn-reset-wizard");

  const methodDatabase = {
    regression: {
      name: "Regresi Linier (Linear Regression)",
      type: "Supervised Learning",
      targetType: "Numerik Kontinu (Angka)",
      icon: "📈",
      question: "Berapa perkiraan produk yang terjual jika kita menganggarkan iklan Rp 60.000?",
      summary: "Memodelkan hubungan matematis antara satu atau lebih variabel input (X) terhadap target numerik kontinu (Y).",
      pitfall: "Korelasi tinggi tidak membuktikan adanya hubungan sebab-akibat (kausalitas) secara otomatis.",
      url: "regression.html"
    },
    classification: {
      name: "Klasifikasi (Classification / Decision Tree / Naive Bayes)",
      type: "Supervised Learning",
      targetType: "Kategorikal (Kelas / Label)",
      icon: "🎯",
      question: "Apakah pelanggan CUST-104 memiliki risiko tinggi untuk berhenti berlangganan (Churn: Ya/Tidak)?",
      summary: "Memetakan fitur pelanggan ke dalam kategori diskrit (misal: Beli/Tidak Beli, Fraud/Normal, Churn/Tetap).",
      pitfall: "Hanya melihat metrik Akurasi pada dataset yang tidak seimbang (imbalanced data) bisa sangat menyesatkan.",
      url: "classification.html"
    },
    clustering: {
      name: "Clustering (K-Means Clustering)",
      type: "Unsupervised Learning",
      targetType: "Tanpa Target (Unlabeled)",
      icon: "👥",
      question: "Bagaimana cara membagi pelanggan kedai kopi menjadi 3 segmen berdasarkan kebiasaan belanja?",
      summary: "Mengelompokkan observasi berdasarkan kemiripan jarak fitur numerik tanpa memerlukan label kebenaran sebelumnya.",
      pitfall: "Penamaan profil cluster (misal: 'Sultan Loyal') adalah interpretasi manusia, bukan kebenaran mutlak otomatis.",
      url: "clustering.html"
    },
    association_rules: {
      name: "Association Rules (Market Basket Analysis / Apriori)",
      type: "Unsupervised Learning / Pattern Mining",
      targetType: "Daftar Item Transaksi",
      icon: "🛒",
      question: "Jika pelanggan membeli Croissant, berapa kemungkinan besar mereka juga membeli Kopi Susu Senja?",
      summary: "Menemukan pola item yang sering dibeli bersamaan untuk strategi bundling produk dan tata letak rak toko.",
      pitfall: "Aturan dengan confidence tinggi belum tentu bernilai jika produk tersebut memang sangat populer secara umum (periksa Lift Ratio!).",
      url: "association-rules.html"
    },
    ann: {
      name: "Artificial Neural Network (Jaringan Saraf Tiruan)",
      type: "Deep / Advanced Learning",
      targetType: "Numerik atau Kategorikal Kompleks",
      icon: "🧠",
      question: "Bagaimana memodelkan hubungan non-linear kompleks dari puluhan variabel perilaku pelanggan sekaligus?",
      summary: "Model berlapis terinspirasi biologi otak (Input, Hidden, Output layer) yang mampu mempelajari fitur representasi kompleks.",
      pitfall: "Membutuhkan data latih yang besar dan sulit diinterpretasikan logikanya (black-box model) dibandingkan Decision Tree.",
      url: "ann.html"
    },
    text_mining: {
      name: "Text Mining & Analisis Sentimen",
      type: "Natural Language Processing (NLP)",
      targetType: "Teks Bebas / Dokumen Ulasan",
      icon: "💬",
      question: "Apa keluhan utama pelanggan di Google Maps dan apakah sentimen ulasan secara umum positif atau negatif?",
      summary: "Mengekstrak informasi berharga dari teks tidak terstruktur (ulasan, media sosial, survei) menjadi metrik sentimen dan topik.",
      pitfall: "Kamus sentimen bahasa Inggris (seperti VADER standar) tidak akurat jika langsung dipakai pada teks slang/Bahasa Indonesia.",
      url: "text-mining.html"
    },
    exploration: {
      name: "Eksplorasi Data (Exploratory Data Analysis - EDA)",
      type: "Descriptive Analytics",
      targetType: "Seluruh Dataset",
      icon: "📊",
      question: "Berapa rata-rata penjualan harian dan bagaimana sebaran pengunjung di akhir pekan?",
      summary: "Langkah wajib pertama untuk memahami struktur data, anomali, ringkasan statistik, dan korelasi awal sebelum membuat model.",
      pitfall: "Langsung membuat algoritma machine learning rumit tanpa memahami anomali atau data kotor terlebih dahulu.",
      url: "exploration.html"
    }
  };

  function renderWizardStep(stepKey) {
    if (!wizardContainer) return;

    if (stepKey === "start") {
      wizardContainer.innerHTML = `
        <div class="wizard-question-title">Langkah 1: Apa tujuan utama analisis Anda?</div>
        <p style="color: var(--text-muted); font-size: var(--font-size-sm);">Pilihlah skenario bisnis yang paling mendekati kebutuhan Anda saat ini:</p>
        <div class="wizard-options-grid">
          <div class="wizard-option-btn" data-next="q_prediksi">
            <span style="font-size: 1.5rem;">🔮</span>
            <div class="wizard-option-title">Memprediksi Nilai atau Kategori Masa Depan</div>
            <div class="wizard-option-desc">Contoh: Memprediksi omset besok atau apakah pelanggan akan berhenti langganan.</div>
          </div>
          <div class="wizard-option-btn" data-next="q_pola">
            <span style="font-size: 1.5rem;">🧩</span>
            <div class="wizard-option-title">Menemukan Pola Tersembunyi Tanpa Label</div>
            <div class="wizard-option-desc">Contoh: Segmentasi pelanggan atau mencari kombinasi menu yang sering dibeli bersama.</div>
          </div>
          <div class="wizard-option-btn" data-next="res_text">
            <span style="font-size: 1.5rem;">💬</span>
            <div class="wizard-option-title">Menganalisis Ulasan Teks atau Opini Pelanggan</div>
            <div class="wizard-option-desc">Contoh: Mengetahui sentimen positif/negatif ulasan Google Maps atau Twitter.</div>
          </div>
          <div class="wizard-option-btn" data-next="res_eda">
            <span style="font-size: 1.5rem;">📊</span>
            <div class="wizard-option-title">Hanya Ingin Memahami & Merangkum Data Saat Ini</div>
            <div class="wizard-option-desc">Contoh: Melihat rata-rata, grafik penjualan mingguan, dan sebaran data.</div>
          </div>
        </div>
      `;
    } else if (stepKey === "q_prediksi") {
      wizardContainer.innerHTML = `
        <div class="wizard-question-title">Langkah 2: Apa bentuk Variabel Target (Y) yang ingin diprediksi?</div>
        <p style="color: var(--text-muted); font-size: var(--font-size-sm);">Tipe data variabel yang ingin Anda ramalkan sangat menentukan metode yang tepat:</p>
        <div class="wizard-options-grid">
          <div class="wizard-option-btn" data-next="res_regression">
            <span style="font-size: 1.5rem;">📈</span>
            <div class="wizard-option-title">Angka Kontinu (Numerik / Nilai Uang / Jumlah)</div>
            <div class="wizard-option-desc">Target bernilai angka acak riil, misalnya: estimasi 55 cup, Rp 1.500.000, 48 menit.</div>
          </div>
          <div class="wizard-option-btn" data-next="res_classification">
            <span style="font-size: 1.5rem;">🎯</span>
            <div class="wizard-option-title">Kategori atau Kelas (Diskrit / Label)</div>
            <div class="wizard-option-desc">Target berupa pilihan opsi, misalnya: 'Churn' vs 'Tetap', 'Lolos' vs 'Tolak', Kelas A/B/C.</div>
          </div>
          <div class="wizard-option-btn" data-next="res_ann">
            <span style="font-size: 1.5rem;">🧠</span>
            <div class="wizard-option-title">Relasi Kompleks Non-Linear Multi-Layer</div>
            <div class="wizard-option-desc">Jika Anda ingin memodelkan fitur interaksi rumit menggunakan arsitektur jaringan saraf tiruan.</div>
          </div>
        </div>
      `;
    } else if (stepKey === "q_pola") {
      wizardContainer.innerHTML = `
        <div class="wizard-question-title">Langkah 2: Pola seperti apa yang ingin Anda temukan?</div>
        <div class="wizard-options-grid">
          <div class="wizard-option-btn" data-next="res_clustering">
            <span style="font-size: 1.5rem;">👥</span>
            <div class="wizard-option-title">Mengelompokkan Baris Data / Pelanggan</div>
            <div class="wizard-option-desc">Mencari grup segmen pelanggan berdasarkan kemiripan frekuensi dan total belanja.</div>
          </div>
          <div class="wizard-option-btn" data-next="res_association">
            <span style="font-size: 1.5rem;">🛒</span>
            <div class="wizard-option-title">Mencari Hubungan Antar-Item Produk (Struk Belanja)</div>
            <div class="wizard-option-desc">Mengetahui jika seseorang membeli A, seberapa sering ia membeli B secara bersamaan.</div>
          </div>
        </div>
      `;
    }

    // Attach listeners
    wizardContainer.querySelectorAll(".wizard-option-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const next = btn.dataset.next;
        if (next.startsWith("res_")) {
          const methodKey = next.replace("res_", "");
          displayResult(methodKey);
        } else {
          renderWizardStep(next);
        }
      });
    });
  }

  function displayResult(key) {
    let methodId = "regression";
    if (key === "regression") methodId = "regression";
    else if (key === "classification") methodId = "classification";
    else if (key === "clustering") methodId = "clustering";
    else if (key === "association") methodId = "association_rules";
    else if (key === "ann") methodId = "ann";
    else if (key === "text") methodId = "text_mining";
    else if (key === "eda") methodId = "exploration";

    const m = methodDatabase[methodId];
    if (!resultContainer || !m) return;

    resultContainer.style.display = "block";
    resultContainer.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-4);">
        <div style="display: flex; align-items: center; gap: var(--space-3);">
          <span style="font-size: 2.2rem;">${m.icon}</span>
          <div>
            <span class="badge badge-teal">${m.type}</span>
            <h3 style="font-family: var(--font-family-heading); font-size: var(--font-size-2xl); color: #ffffff; margin-top: 4px;">${m.name}</h3>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-4); margin-bottom: var(--space-6);">
        <div style="background: var(--bg-surface); padding: var(--space-4); border-radius: var(--radius-lg); border: 1px solid var(--border-subtle);">
          <div style="font-size: var(--font-size-xs); color: var(--text-subtle); text-transform: uppercase; font-weight: 700;">Tipe Target Dibutuhkan</div>
          <div style="font-size: var(--font-size-sm); color: #ffffff; font-weight: 600; margin-top: 4px;">${m.targetType}</div>
        </div>
        <div style="background: var(--bg-surface); padding: var(--space-4); border-radius: var(--radius-lg); border: 1px solid var(--border-subtle);">
          <div style="font-size: var(--font-size-xs); color: var(--text-subtle); text-transform: uppercase; font-weight: 700;">Contoh Pertanyaan Bisnis</div>
          <div style="font-size: var(--font-size-sm); color: var(--color-brand-300); margin-top: 4px;">"${m.question}"</div>
        </div>
      </div>

      <p style="font-size: var(--font-size-sm); color: var(--text-muted); line-height: 1.6; margin-bottom: var(--space-4);">${m.summary}</p>

      <div class="callout callout-warning" style="margin-bottom: var(--space-6);">
        <span class="callout-icon">⚠️</span>
        <div><strong>Peringatan Umum / Common Pitfall:</strong> ${m.pitfall}</div>
      </div>

      <div style="display: flex; gap: var(--space-4); align-items: center; flex-wrap: wrap;">
        <a href="${m.url}" class="btn btn-primary">Buka Praktik Lab ${m.name.split('(')[0]} →</a>
        <button id="btn-restart-wizard" class="btn btn-secondary">Ulangi Pertanyaan Wizard</button>
      </div>
    `;

    document.getElementById("btn-restart-wizard")?.addEventListener("click", () => {
      resultContainer.style.display = "none";
      renderWizardStep("start");
    });

    resultContainer.scrollIntoView({ behavior: "smooth" });

    if (window.ProgressManager) {
      window.ProgressManager.markCompleted("method-explorer");
    }
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (resultContainer) resultContainer.style.display = "none";
      renderWizardStep("start");
    });
  }

  // Filter Catalog Pills
  const filterBtns = document.querySelectorAll(".filter-pill");
  const methodCards = document.querySelectorAll(".method-catalog-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;

      methodCards.forEach(card => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  renderWizardStep("start");
});
