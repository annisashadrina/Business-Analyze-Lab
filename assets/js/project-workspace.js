/**
 * Business Analysis Learning Lab - Project Workspace Module Logic
 * 11-step analysis canvas, LocalStorage draft persistence, sample loader, copy & print
 */

document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "ball_project_workspace_draft";

  const fields = [
    "proj_title",
    "proj_problem",
    "proj_question",
    "proj_goal",
    "proj_data",
    "proj_variables",
    "proj_method",
    "proj_rationale",
    "proj_insights",
    "proj_recommendations",
    "proj_limitations"
  ];

  const sampleCaseData = {
    proj_title: "Optimasi Strategi Promosi Sore & Prediksi Penjualan di Kedai Kopi Senja",
    proj_problem: "Kedai Kopi Senja mengalami penurunan omset hingga 30% dalam 2 bulan terakhir, dengan jam penurunan paling tajam terjadi pada rentang sore hari kerja (14:00 - 17:00).",
    proj_question: "Bagaimana korelasi antara anggaran iklan promosi dengan jumlah produk terjual harian, dan menu apa yang paling potensial dibundling untuk memulihkan penjualan sore hari?",
    proj_goal: "Menentukan anggaran optimal kampanye iklan digital dan merancang paket menu bundling berbasis data transaksi kasir guna meningkatkan penjualan harian minimal 25%.",
    proj_data: "Dataset penjualan harian 14 hari (biaya iklan, pengunjung, promo, produk terjual) dan dataset struk transaksi kasir (Market Basket).",
    proj_variables: "Variabel Bebas (Input/X): biaya_iklan_ribu, status_promo. Variabel Terikat (Target/Y): produk_terjual (cup). Variabel Asosiasi: Item transaksi kasir.",
    proj_method: "Regresi Linier Sederhana (Linear Regression) untuk estimasi kuantitas terjual, dan Association Rules (Apriori) untuk analisis keranjang belanja kasir.",
    proj_rationale: "Regresi cocok karena target (produk terjual) berupa angka kontinu. Association Rules cocok karena kita ingin mengetahui pasangan item yang sering dibeli bersamaan tanpa label target.",
    proj_insights: "1. Regresi menunjukkan slope +0.95: setiap kenaikan iklan Rp 10.000 menghasilkan rata-rata penambahan ~9.5 cup terjual (R² = 97%). 2. Apriori menunjukkan aturan {Croissant Mentega} → {Kopi Susu Senja} memiliki Support 45%, Confidence 81%, dan Lift 1.17x.",
    proj_recommendations: "1. Luncurkan paket bundling sore 'Sore Produktif' (Kopi Susu Senja + Croissant Mentega) dengan diskon 15% pada jam 14:00 - 17:00. 2. Alokasikan anggaran iklan digital sebesar Rp 40.000 - Rp 50.000 per hari dengan target pekerja WFC di sekitar lokasi kedai.",
    proj_limitations: "1. Dataset observasi regresi berukuran kecil (14 hari), belum memperhitungkan anomali cuaca hujan ekstrem. 2. Korelasi iklan dan penjualan belum membuktikan kausalitas murni tanpa uji A/B testing terkontrol."
  };

  // Load Draft from LocalStorage
  function loadDraft() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        fields.forEach(f => {
          const el = document.getElementById(f);
          if (el && parsed[f]) el.value = parsed[f];
        });
      }
    } catch (e) {
      console.warn("Failed to read draft from localStorage:", e);
    }
    updateCompletionMeter();
  }

  // Save Draft to LocalStorage
  function saveDraft() {
    const draft = {};
    fields.forEach(f => {
      const el = document.getElementById(f);
      if (el) draft[f] = el.value.trim();
    });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch (e) {
      console.warn("Failed to write draft to localStorage:", e);
    }
    updateCompletionMeter();
  }

  // Calculate field completion progress
  function updateCompletionMeter() {
    let filled = 0;
    fields.forEach(f => {
      const el = document.getElementById(f);
      if (el && el.value.trim().length > 0) filled++;
    });

    const meterEl = document.getElementById("workspace-completion-meter");
    const fillBar = document.getElementById("workspace-progress-fill");
    if (meterEl) meterEl.textContent = `${filled} dari ${fields.length} Bagian Lengkap`;
    if (fillBar) fillBar.style.width = `${Math.round((filled / fields.length) * 100)}%`;

    if (filled === fields.length && window.ProgressManager) {
      window.ProgressManager.markCompleted("project-workspace");
    }
  }

  // Attach live auto-save
  fields.forEach(f => {
    const el = document.getElementById(f);
    if (el) {
      el.addEventListener("input", saveDraft);
    }
  });

  // Load Sample Case Button
  const btnLoadSample = document.getElementById("btn-load-sample-case");
  if (btnLoadSample) {
    btnLoadSample.addEventListener("click", () => {
      fields.forEach(f => {
        const el = document.getElementById(f);
        if (el && sampleCaseData[f]) el.value = sampleCaseData[f];
      });
      saveDraft();
      if (window.App) window.App.showToast("Contoh studi kasus Kedai Kopi Senja berhasil dimuat! ☕");
    });
  }

  // Clear Canvas Button
  const btnClear = document.getElementById("btn-clear-workspace");
  if (btnClear) {
    btnClear.addEventListener("click", () => {
      if (confirm("Apakah Anda yakin ingin mengosongkan seluruh formulir proyek ini?")) {
        fields.forEach(f => {
          const el = document.getElementById(f);
          if (el) el.value = "";
        });
        saveDraft();
        if (window.App) window.App.showToast("Formulir telah dikosongkan.");
      }
    });
  }

  // Copy Summary to Clipboard
  const btnCopy = document.getElementById("btn-copy-workspace");
  if (btnCopy) {
    btnCopy.addEventListener("click", () => {
      let markdown = `# RINGKASAN PROYEK BUSINESS ANALYSIS\n\n`;
      fields.forEach(f => {
        const el = document.getElementById(f);
        const label = el?.previousElementSibling?.textContent || f;
        const val = el?.value.trim() || "- (Belum diisi)";
        markdown += `### ${label}\n${val}\n\n`;
      });

      navigator.clipboard.writeText(markdown).then(() => {
        if (window.App) window.App.showToast("Ringkasan proyek berhasil disalin ke clipboard! 📋");
      }).catch(err => {
        alert("Gagal menyalin: " + err);
      });
    });
  }

  // Print Document Button
  const btnPrint = document.getElementById("btn-print-workspace");
  if (btnPrint) {
    btnPrint.addEventListener("click", () => {
      window.print();
    });
  }

  loadDraft();
});
