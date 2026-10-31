/**
 * Business Analysis Learning Lab - Introduction Module Logic
 * 5-Step Card Accordion and Interactive Concept Matching Game
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Accordion Card Interactions
  const stepCards = document.querySelectorAll(".step-card");
  stepCards.forEach(card => {
    const header = card.querySelector(".step-card-header");
    if (header) {
      header.addEventListener("click", () => {
        const isActive = card.classList.contains("active");
        stepCards.forEach(c => c.classList.remove("active"));
        if (!isActive) {
          card.classList.add("active");
        }
      });
    }
  });

  // 2. Interactive Matching Game Logic
  // Match each business statement to its category: Masalah, Pertanyaan, Data, Insight, Rekomendasi
  const statements = [
    { id: "s1", text: "Omset penjualan kedai kopi mengalami penurunan 30% dalam 2 bulan terakhir.", category: "masalah" },
    { id: "s2", text: "Apakah penurunan penjualan terjadi pada jam-jam tertentu atau menu tertentu?", category: "pertanyaan" },
    { id: "s3", text: "Log catatan transaksi kasir: tanggal, jam beli, nama produk, harga, dan metode pembayaran.", category: "data" },
    { id: "s4", text: "Penjualan jam 14:00 - 17:00 anjlok 45% karena pelanggan mengeluh tidak ada pilihan camilan sore.", category: "insight" },
    { id: "s5", text: "Luncurkan promo bundling 'Kopi Senja + Croissant Diskon 20%' khusus jam 14:00 - 17:00.", category: "rekomendasi" }
  ];

  let selectedStatementId = null;
  const userMatches = {};

  const sourceContainer = document.getElementById("matching-source-list");
  const slots = document.querySelectorAll(".target-slot");
  const checkBtn = document.getElementById("btn-check-matching");
  const resetBtn = document.getElementById("btn-reset-matching");
  const feedbackBox = document.getElementById("matching-feedback");

  function renderStatements() {
    if (!sourceContainer) return;
    sourceContainer.innerHTML = "";
    statements.forEach(stmt => {
      // If already assigned, don't show in source list
      if (!Object.values(userMatches).includes(stmt.id)) {
        const item = document.createElement("div");
        item.className = `match-item ${selectedStatementId === stmt.id ? "selected" : ""}`;
        item.textContent = `"${stmt.text}"`;
        item.dataset.stmtId = stmt.id;
        item.addEventListener("click", () => {
          selectedStatementId = selectedStatementId === stmt.id ? null : stmt.id;
          renderStatements();
        });
        sourceContainer.appendChild(item);
      }
    });
  }

  slots.forEach(slot => {
    slot.addEventListener("click", () => {
      const slotCat = slot.dataset.category;
      if (selectedStatementId) {
        // Assign selected statement to this slot
        userMatches[slotCat] = selectedStatementId;
        selectedStatementId = null;
        updateSlotUI(slot, userMatches[slotCat]);
        renderStatements();
      } else if (userMatches[slotCat]) {
        // Clicked occupied slot to unassign
        delete userMatches[slotCat];
        updateSlotUI(slot, null);
        renderStatements();
      }
    });
  });

  function updateSlotUI(slot, stmtId) {
    const contentDiv = slot.querySelector(".target-slot-content");
    if (!contentDiv) return;
    if (stmtId) {
      const stmt = statements.find(s => s.id === stmtId);
      contentDiv.innerHTML = `<span style="color: #ffffff; font-weight: 500;">${stmt.text}</span> <small style="display:block; color: var(--color-accent-teal); margin-top:4px;">(Klik untuk membatalkan)</small>`;
      slot.style.borderColor = "var(--color-brand-400)";
      slot.style.background = "rgba(99, 102, 241, 0.1)";
    } else {
      contentDiv.innerHTML = `<span style="color: var(--text-subtle); font-style: italic;">Pilih kalimat di kiri, lalu klik kotak ini</span>`;
      slot.style.borderColor = "var(--border-subtle)";
      slot.style.background = "var(--bg-surface-elevated)";
    }
  }

  if (checkBtn) {
    checkBtn.addEventListener("click", () => {
      const assignedCount = Object.keys(userMatches).length;
      if (assignedCount < statements.length) {
        if (feedbackBox) {
          feedbackBox.className = "feedback-box incorrect";
          feedbackBox.innerHTML = `⚠️ Mohon pasangkan kelima pernyataan ke kotak kategori yang tersedia sebelum memeriksa.`;
        }
        return;
      }

      let correctCount = 0;
      statements.forEach(stmt => {
        if (userMatches[stmt.category] === stmt.id) {
          correctCount++;
        }
      });

      if (correctCount === statements.length) {
        if (feedbackBox) {
          feedbackBox.className = "feedback-box correct";
          feedbackBox.innerHTML = `
            <strong>🎉 Sempurna! Semua kategori cocok dengan tepat!</strong><br>
            <ul>
              <li><strong>Masalah:</strong> Kondisi bisnis yang tidak diinginkan (omset turun 30%).</li>
              <li><strong>Pertanyaan Analisis:</strong> Pertanyaan terarah untuk membedah data (kapan & menu apa?).</li>
              <li><strong>Data:</strong> Fakta mentah yang dicatat sistem kasir.</li>
              <li><strong>Insight:</strong> Pemahaman mendalam setelah data dibaca (penurunan jam 14-17 karena tiada camilan).</li>
              <li><strong>Rekomendasi:</strong> Keputusan strategis untuk mengatasi akar masalah (bundling promo sore).</li>
            </ul>
          `;
        }
        if (window.ProgressManager) {
          window.ProgressManager.markCompleted("intro");
        }
      } else {
        if (feedbackBox) {
          feedbackBox.className = "feedback-box incorrect";
          feedbackBox.innerHTML = `
            <strong>Masih ada ${statements.length - correctCount} pasangan yang belum tepat.</strong><br>
            Ingat: <em>Masalah</em> adalah gejala kerugian, <em>Pertanyaan</em> adalah hal yang ingin diuji ke data, dan <em>Rekomendasi</em> adalah usulan aksi nyata. Coba klik kotak yang ingin diubah lalu pasangkan kembali!
          `;
        }
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      for (const k in userMatches) delete userMatches[k];
      selectedStatementId = null;
      slots.forEach(slot => updateSlotUI(slot, null));
      renderStatements();
      if (feedbackBox) feedbackBox.className = "feedback-box";
    });
  }

  renderStatements();
});
