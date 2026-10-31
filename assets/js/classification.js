/**
 * Business Analysis Learning Lab - Classification Lab Module Logic
 * Churn Decision Tree, live Confusion Matrix calculation, and metrics (Accuracy, Precision, Recall, F1)
 */

document.addEventListener("DOMContentLoaded", async () => {
  const data = await window.DataLoader.getCustomerChurn();
  if (!data || data.length === 0) return;

  // Decision Tree Classifier Logic
  function predictChurn(customer) {
    if (customer.komplain_terakhir === "Ya" && customer.frekuensi_pesan_per_bulan <= 3) {
      return "Ya";
    }
    if (customer.lama_langganan_bulan <= 3 && customer.frekuensi_pesan_per_bulan <= 2) {
      return "Ya";
    }
    return "Tidak";
  }

  // Evaluate all customers
  let tp = 0; // Actual: Ya, Pred: Ya
  let fp = 0; // Actual: Tidak, Pred: Ya
  let tn = 0; // Actual: Tidak, Pred: Tidak
  let fn = 0; // Actual: Ya, Pred: Tidak

  const evaluatedCustomers = data.map(c => {
    const pred = predictChurn(c);
    const actual = c.churn;

    if (actual === "Ya" && pred === "Ya") tp++;
    else if (actual === "Tidak" && pred === "Ya") fp++;
    else if (actual === "Tidak" && pred === "Tidak") tn++;
    else if (actual === "Ya" && pred === "Tidak") fn++;

    return { ...c, pred, isCorrect: actual === pred };
  });

  const total = evaluatedCustomers.length;
  const accuracy = (tp + tn) / total;
  const precision = tp / (tp + fp) || 0;
  const recall = tp / (tp + fn) || 0;
  const f1 = 2 * ((precision * recall) / (precision + recall)) || 0;

  // Render Confusion Matrix Cells
  const tpEl = document.getElementById("cm-tp-val");
  const fpEl = document.getElementById("cm-fp-val");
  const fnEl = document.getElementById("cm-fn-val");
  const tnEl = document.getElementById("cm-tn-val");

  if (tpEl) tpEl.textContent = tp;
  if (fpEl) fpEl.textContent = fp;
  if (fnEl) fnEl.textContent = fn;
  if (tnEl) tnEl.textContent = tn;

  // Render Evaluation Metrics
  const accEl = document.getElementById("metric-accuracy");
  const precEl = document.getElementById("metric-precision");
  const recEl = document.getElementById("metric-recall");
  const f1El = document.getElementById("metric-f1");

  if (accEl) accEl.textContent = `${(accuracy * 100).toFixed(1)}%`;
  if (precEl) precEl.textContent = `${(precision * 100).toFixed(1)}%`;
  if (recEl) recEl.textContent = `${(recall * 100).toFixed(1)}%`;
  if (f1El) f1El.textContent = `${(f1 * 100).toFixed(1)}%`;

  // Render Customer Table with Prediction Badges
  const tbody = document.getElementById("classification-customers-tbody");
  if (tbody) {
    tbody.innerHTML = evaluatedCustomers.map(c => `
      <tr>
        <td><strong>${c.customer_id}</strong></td>
        <td>${c.lama_langganan_bulan} bln</td>
        <td>${c.frekuensi_pesan_per_bulan}x/bln</td>
        <td><span class="badge ${c.komplain_terakhir === 'Ya' ? 'badge-demo' : 'badge-verified'}">${c.komplain_terakhir}</span></td>
        <td>Rp ${c.pengeluaran_ribu}rb</td>
        <td><strong>${c.churn}</strong></td>
        <td><span class="badge ${c.pred === 'Ya' ? 'badge-demo' : 'badge-brand'}">${c.pred}</span></td>
        <td>${c.isCorrect ? '<span style="color: var(--color-success); font-weight:700;">✓ Benar</span>' : '<span style="color: var(--color-danger); font-weight:700;">✗ Meleset</span>'}</td>
      </tr>
    `).join("");
  }

  // Interactive Business Trade-off Exercise
  const btnSubmitTradeoff = document.getElementById("btn-submit-tradeoff");
  const tradeoffFeedback = document.getElementById("tradeoff-feedback");

  if (btnSubmitTradeoff) {
    btnSubmitTradeoff.addEventListener("click", () => {
      const selected = document.querySelector("input[name='tradeoff_q']:checked")?.value;
      if (!selected) {
        if (tradeoffFeedback) {
          tradeoffFeedback.className = "feedback-box incorrect";
          tradeoffFeedback.innerHTML = "⚠️ Harap pilih salah satu opsi pertimbangan bisnis.";
        }
        return;
      }

      if (selected === "opt_fn_worse") {
        if (tradeoffFeedback) {
          tradeoffFeedback.className = "feedback-box correct";
          tradeoffFeedback.innerHTML = `
            <strong>🎉 Analisis Bisnis yang Sangat Tajam!</strong><br>
            Dalam konteks customer churn, <strong>False Negative (FN)</strong> jauh lebih merugikan secara finansial. Jika seorang pelanggan sebenarnya akan churn tetapi model memprediksi "Aman/Tetap", tim marketing tidak akan mengambil tindakan apa pun, sehingga bisnis kehilangan pelanggan tersebut selamanya (biaya akuisisi pelanggan baru 5-7x lebih mahal!).<br>
            Sebaliknya, pada <strong>False Positive (FP)</strong>, biaya yang timbul hanyalah memberikan voucher diskon kepada pelanggan yang sebenarnya tetap loyal. Oleh sebab itu, metrik <strong>Recall</strong> sering kali lebih diutamakan ketimbang presisi dalam kasus churn.
          `;
        }
        if (window.ProgressManager) {
          window.ProgressManager.markCompleted("classification");
        }
      } else {
        if (tradeoffFeedback) {
          tradeoffFeedback.className = "feedback-box incorrect";
          tradeoffFeedback.innerHTML = `
            <strong>Pertimbangan masih kurang tepat secara ekonomi bisnis.</strong><br>
            Pikirkan dampak biayanya: Kehilangan pelanggan setia (akibat tidak terdeteksi) vs sekadar membagikan voucher retensi kepada pelanggan yang sebenarnya masih suka ngopi. Mana yang lebih menghancurkan laba jangka panjang?
          `;
        }
      }
    });
  }

  // ==========================================
  // Google Colab Walkthrough Interactive Controller
  // ==========================================
  const colabTabs = document.querySelectorAll(".colab-step-btn");
  const colabPanels = document.querySelectorAll(".colab-step-panel");
  const btnColabPrev = document.getElementById("btn-colab-prev");
  const btnColabNext = document.getElementById("btn-colab-next");
  const colabStepIndicator = document.getElementById("colab-step-indicator");
  let currentColabStep = 1;
  const totalColabSteps = colabPanels.length || 8;

  function switchColabStep(stepNum) {
    currentColabStep = Math.max(1, Math.min(stepNum, totalColabSteps));

    colabTabs.forEach(tab => {
      const step = parseInt(tab.dataset.step, 10);
      tab.classList.toggle("active", step === currentColabStep);
    });

    colabPanels.forEach(panel => {
      panel.classList.toggle("active", panel.id === `colab-panel-${currentColabStep}`);
    });

    if (colabStepIndicator) {
      colabStepIndicator.textContent = `Langkah ${currentColabStep} dari ${totalColabSteps}`;
    }

    if (btnColabPrev) btnColabPrev.disabled = currentColabStep === 1;
    if (btnColabNext) {
      if (currentColabStep === totalColabSteps) {
        btnColabNext.textContent = "Selesai Membaca Alur ✓";
        btnColabNext.disabled = true;
      } else {
        btnColabNext.textContent = "Langkah Berikutnya →";
        btnColabNext.disabled = false;
      }
    }
  }

  colabTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const step = parseInt(tab.dataset.step, 10);
      switchColabStep(step);
    });
  });

  if (btnColabPrev) {
    btnColabPrev.addEventListener("click", () => {
      switchColabStep(currentColabStep - 1);
    });
  }

  if (btnColabNext) {
    btnColabNext.addEventListener("click", () => {
      switchColabStep(currentColabStep + 1);
    });
  }

  // Copy code button handler
  document.querySelectorAll(".colab-copy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      const codeText = targetEl.innerText || targetEl.textContent;
      navigator.clipboard.writeText(codeText).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = "✓ Tersalin!";
        btn.style.background = "#10b981";
        btn.style.borderColor = "#10b981";
        btn.style.color = "#ffffff";
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = "";
          btn.style.borderColor = "";
          btn.style.color = "";
        }, 2000);
      }).catch(err => {
        console.error("Gagal menyalin:", err);
      });
    });
  });
});

