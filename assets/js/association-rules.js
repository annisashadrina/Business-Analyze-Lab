/**
 * Business Analysis Learning Lab - Association Rules Lab Module Logic
 * Market basket analysis, Apriori metric calculation (Support, Confidence, Lift), and retail insights
 */

document.addEventListener("DOMContentLoaded", async () => {
  const transactions = await window.DataLoader.getTransactions();
  if (!transactions || transactions.length === 0) return;

  const N = transactions.length;

  // Count item frequency
  const itemCounts = {};
  transactions.forEach(t => {
    t.items.forEach(item => {
      itemCounts[item] = (itemCounts[item] || 0) + 1;
    });
  });

  // Calculate rules for popular item pairs
  function getPairStats(itemA, itemB) {
    let bothCount = 0;
    transactions.forEach(t => {
      if (t.items.includes(itemA) && t.items.includes(itemB)) {
        bothCount++;
      }
    });

    const countA = itemCounts[itemA] || 0;
    const countB = itemCounts[itemB] || 0;

    const support = bothCount / N;
    const confidence = countA > 0 ? bothCount / countA : 0;
    const supportB = countB / N;
    const lift = supportB > 0 ? confidence / supportB : 0;

    return { itemA, itemB, countA, countB, bothCount, support, confidence, lift };
  }

  const candidatePairs = [
    { a: "Croissant Mentega", b: "Kopi Susu Senja" },
    { a: "Donat Gula", b: "Kopi Susu Senja" },
    { a: "Roti Bakar Cokelat", b: "Kopi Susu Senja" },
    { a: "Americano Dingin", b: "Croissant Mentega" },
    { a: "Espresso Single", b: "Air Mineral" }
  ];

  const rules = candidatePairs.map(p => getPairStats(p.a, p.b));

  // Render Transactions Table (preview first 8)
  const trxTableBody = document.getElementById("transactions-preview-tbody");
  if (trxTableBody) {
    trxTableBody.innerHTML = transactions.slice(0, 8).map(t => `
      <tr>
        <td><strong>${t.transaction_id}</strong></td>
        <td>${t.items.map(it => `<span class="badge badge-brand" style="margin-right: 4px;">${it}</span>`).join("")}</td>
      </tr>
    `).join("");
  }

  // Render Rules List
  const rulesListContainer = document.getElementById("association-rules-list");
  let activeRuleIndex = 0;

  function renderRules() {
    if (!rulesListContainer) return;
    rulesListContainer.innerHTML = rules.map((r, idx) => `
      <div class="card ${idx === activeRuleIndex ? 'rule-selected' : ''}" data-rule-idx="${idx}" style="cursor: pointer; padding: var(--space-4); margin-bottom: var(--space-3); ${idx === activeRuleIndex ? 'border-color: var(--color-brand-400); background: rgba(99, 102, 241, 0.12);' : ''}">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <div style="font-size: var(--font-size-base); font-weight: 700; color: #ffffff;">
            {${r.itemA}} <span style="color: var(--color-accent-teal);">→</span> {${r.itemB}}
          </div>
          <span class="badge ${r.lift > 1 ? 'badge-verified' : 'badge-demo'}">Lift: ${r.lift.toFixed(2)}x</span>
        </div>
        <div style="display: flex; gap: var(--space-4); font-size: var(--font-size-xs); color: var(--text-muted);">
          <span>Support: <strong>${(r.support * 100).toFixed(0)}%</strong> (${r.bothCount}/${N})</span>
          <span>Confidence: <strong>${(r.confidence * 100).toFixed(0)}%</strong></span>
        </div>
      </div>
    `).join("");

    rulesListContainer.querySelectorAll("[data-rule-idx]").forEach(el => {
      el.addEventListener("click", () => {
        activeRuleIndex = Number(el.dataset.ruleIdx);
        renderRules();
        updateDetailPanel(rules[activeRuleIndex]);
      });
    });
  }

  function updateDetailPanel(r) {
    const titleEl = document.getElementById("rule-detail-title");
    const suppEl = document.getElementById("rule-detail-support");
    const confEl = document.getElementById("rule-detail-confidence");
    const liftEl = document.getElementById("rule-detail-lift");
    const stepsEl = document.getElementById("rule-calc-steps");
    const recoEl = document.getElementById("rule-business-reco");

    if (titleEl) titleEl.innerHTML = `{${r.itemA}} → {${r.itemB}}`;
    if (suppEl) suppEl.textContent = `${(r.support * 100).toFixed(1)}%`;
    if (confEl) confEl.textContent = `${(r.confidence * 100).toFixed(1)}%`;
    if (liftEl) liftEl.textContent = `${r.lift.toFixed(2)}x`;

    if (stepsEl) {
      stepsEl.innerHTML = `
        <div style="font-size: var(--font-size-xs); line-height: 1.8; color: var(--text-muted);">
          • <strong>Support:</strong> Muncul di ${r.bothCount} dari ${N} total struk belanja = <code>${r.bothCount} / ${N} = ${(r.support * 100).toFixed(1)}%</code>.<br>
          • <strong>Confidence:</strong> Dari ${r.countA} orang yang beli ${r.itemA}, sebanyak ${r.bothCount} orang juga beli ${r.itemB} = <code>${r.bothCount} / ${r.countA} = ${(r.confidence * 100).toFixed(1)}%</code>.<br>
          • <strong>Lift Ratio:</strong> Confidence (${r.confidence.toFixed(2)}) dibagi probabilitas umum ${r.itemB} (${(r.countB / N).toFixed(2)}) = <code>${r.lift.toFixed(2)}x</code>.
        </div>
      `;
    }

    if (recoEl) {
      let recText = "";
      if (r.lift > 1.2) {
        recText = `<strong>Rekomendasi Bundling Kuat:</strong> Karena Lift = ${r.lift.toFixed(2)}x (> 1), kedua item ini memiliki korelasi pembelian yang sangat sinergis. Tempatkan showcase display ${r.itemA} persis di samping meja pickup kopi, atau tawarkan paket bundling combo hemat.`;
      } else {
        recText = `<strong>Rekomendasi Reguler:</strong> Lift mendekati 1 artinya kemunculan bersamaan sebagian besar disebabkan oleh tingginya popularitas umum dari item ${r.itemB}, bukan karena tarikan spesifik dari ${r.itemA}.`;
      }
      recoEl.innerHTML = recText;
    }
  }

  renderRules();
  updateDetailPanel(rules[activeRuleIndex]);

  // Exercise
  const btnCheckAssocEx = document.getElementById("btn-check-assoc-exercise");
  const assocFeedback = document.getElementById("assoc-exercise-feedback");
  if (btnCheckAssocEx) {
    btnCheckAssocEx.addEventListener("click", () => {
      const selected = document.querySelector("input[name='assoc_q']:checked")?.value;
      if (!selected) {
        if (assocFeedback) {
          assocFeedback.className = "feedback-box incorrect";
          assocFeedback.innerHTML = "⚠️ Harap pilih salah satu opsi jawaban.";
        }
        return;
      }

      if (selected === "opt_lift_gt_1") {
        if (assocFeedback) {
          assocFeedback.className = "feedback-box correct";
          assocFeedback.innerHTML = `
            <strong>🎉 Tepat Sekali!</strong><br>
            Nilai <strong>Lift Ratio > 1</strong> menunjukkan bahwa kehadiran item A secara signifikan meningkatkan probabilitas pembelian item B, lebih tinggi daripada probabilitas acak di pasar. Inilah dasar ilmiah pembentukan paket menu bundling!
          `;
        }
        if (window.ProgressManager) {
          window.ProgressManager.markCompleted("association-rules");
        }
      } else {
        if (assocFeedback) {
          assocFeedback.className = "feedback-box incorrect";
          assocFeedback.innerHTML = `
            <strong>Jawaban belum tepat.</strong><br>
            Perhatikan: Confidence tinggi bisa terjadi jika item B memang dibeli oleh hampir semua orang (misal air mineral). Metrik yang benar-benar membuktikan kekuatan relasi di atas kebetulan adalah <strong>Lift Ratio</strong>.
          `;
        }
      }
    });
  }
});
