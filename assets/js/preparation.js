/**
 * Business Analysis Learning Lab - Data Preparation Module Logic
 * Side-by-side dirty vs clean data transformation with live feedback
 */

document.addEventListener("DOMContentLoaded", async () => {
  const rawData = await window.DataLoader.getDirtyData();
  const rawTbody = document.getElementById("dirty-data-tbody");
  const cleanTbody = document.getElementById("cleaned-data-tbody");
  const rawCountEl = document.getElementById("raw-row-count");
  const cleanCountEl = document.getElementById("cleaned-row-count");
  const logContainer = document.getElementById("cleaning-action-log");

  // Checkboxes
  const optDeduplicate = document.getElementById("clean-deduplicate");
  const optStandardize = document.getElementById("clean-standardize");
  const optFilterAnomalies = document.getElementById("clean-filter-anomalies");
  const optMissingSelect = document.getElementById("clean-missing-strategy");
  const btnApplyCleaning = document.getElementById("btn-apply-cleaning");

  function renderRawTable() {
    if (!rawTbody || !rawData) return;
    rawCountEl.textContent = `${rawData.length} baris`;
    rawTbody.innerHTML = rawData.map((row, idx) => {
      const isMissing = row.biaya_iklan_ribu === null;
      const isDupe = idx === 3; // second TRX-103
      const isCasingIssue = ["surabaya", "SURABAYA", "malang"].includes(row.cabang);
      const isOutlier = row.pengunjung === 9999 || row.produk_terjual < 0;

      return `
        <tr>
          <td>${row.id_transaksi} ${isDupe ? '<span class="badge badge-demo">Duplikat</span>' : ''}</td>
          <td>${row.tanggal}</td>
          <td class="${isCasingIssue ? 'dirty-highlight' : ''}">${row.cabang}</td>
          <td class="${isMissing ? 'dirty-highlight' : ''}">${isMissing ? '<em>NULL (Kosong)</em>' : row.biaya_iklan_ribu}</td>
          <td class="${isOutlier ? 'dirty-highlight' : ''}">${row.pengunjung}</td>
          <td class="${isOutlier ? 'dirty-highlight' : ''}">${row.produk_terjual}</td>
          <td>${row.status_promo}</td>
        </tr>
      `;
    }).join("");
  }

  function processCleanedData() {
    let processed = JSON.parse(JSON.stringify(rawData));
    const logs = [];

    // 1. Deduplication
    if (optDeduplicate && optDeduplicate.checked) {
      const seen = new Set();
      const initialLen = processed.length;
      processed = processed.filter(row => {
        if (seen.has(row.id_transaksi)) return false;
        seen.add(row.id_transaksi);
        return true;
      });
      const removed = initialLen - processed.length;
      logs.push(`✅ <strong>Deduplikasi:</strong> Berhasil menghapus ${removed} baris data ganda (TRX-103).`);
    }

    // 2. Standardize Casing
    if (optStandardize && optStandardize.checked) {
      processed.forEach(row => {
        const lower = row.cabang.toLowerCase();
        if (lower === "surabaya" || lower === "sby") row.cabang = "Surabaya";
        else if (lower === "malang") row.cabang = "Malang";
      });
      logs.push(`✅ <strong>Standarisasi Teks:</strong> Menyeragamkan penulisan 'surabaya' & 'SURABAYA' menjadi Title Case 'Surabaya'.`);
    }

    // 3. Handle Anomalies / Outliers
    if (optFilterAnomalies && optFilterAnomalies.checked) {
      const initialLen = processed.length;
      processed = processed.filter(row => {
        return row.pengunjung > 0 && row.pengunjung < 1000 && row.produk_terjual >= 0;
      });
      const removed = initialLen - processed.length;
      logs.push(`✅ <strong>Filter Anomali:</strong> Menghapus ${removed} baris dengan nilai tidak wajar (pengunjung = 9999, produk terjual = -10).`);
    }

    // 4. Handle Missing Values
    const missingStrat = optMissingSelect ? optMissingSelect.value : "keep";
    if (missingStrat === "drop") {
      const initialLen = processed.length;
      processed = processed.filter(row => row.biaya_iklan_ribu !== null);
      const removed = initialLen - processed.length;
      logs.push(`⚠️ <strong>Drop Missing Value:</strong> Menghapus ${removed} baris yang memiliki nilai kosong. <em>(Catatan: Berisiko mengurangi ukuran sampel)</em>`);
    } else if (missingStrat === "impute_median") {
      const validNumbers = processed.filter(r => r.biaya_iklan_ribu !== null).map(r => r.biaya_iklan_ribu).sort((a,b) => a-b);
      const mid = Math.floor(validNumbers.length / 2);
      const median = validNumbers.length % 2 !== 0 ? validNumbers[mid] : (validNumbers[mid - 1] + validNumbers[mid]) / 2;
      processed.forEach(r => {
        if (r.biaya_iklan_ribu === null) {
          r.biaya_iklan_ribu = median;
          r._imputed = true;
        }
      });
      logs.push(`💡 <strong>Imputasi Nilai Median:</strong> Mengisi nilai biaya iklan yang hilang dengan median (${median} ribu).`);
    } else {
      logs.push(`ℹ️ <strong>Missing Value dibiarkan:</strong> Kolom kosong tetap dipertahankan.`);
    }

    // Render cleaned table
    if (cleanTbody) {
      cleanCountEl.textContent = `${processed.length} baris`;
      cleanTbody.innerHTML = processed.map(row => `
        <tr>
          <td>${row.id_transaksi}</td>
          <td>${row.tanggal}</td>
          <td class="cleaned-highlight">${row.cabang}</td>
          <td class="${row._imputed ? 'cleaned-highlight' : ''}">${row.biaya_iklan_ribu !== null ? row.biaya_iklan_ribu : '<em>NULL</em>'} ${row._imputed ? '<span class="badge badge-teal">Imputed</span>' : ''}</td>
          <td>${row.pengunjung}</td>
          <td>${row.produk_terjual}</td>
          <td>${row.status_promo}</td>
        </tr>
      `).join("");
    }

    if (logContainer) {
      logContainer.innerHTML = logs.map(l => `<div style="margin-bottom: 6px;">${l}</div>`).join("");
    }

    if (optDeduplicate.checked && optStandardize.checked && optFilterAnomalies.checked && missingStrat !== "keep") {
      if (window.ProgressManager) {
        window.ProgressManager.markCompleted("preparation");
      }
    }
  }

  if (btnApplyCleaning) {
    btnApplyCleaning.addEventListener("click", () => {
      processCleanedData();
      if (window.App) window.App.showToast("Aturan pembersihan data berhasil diterapkan! 🧹");
    });
  }

  // Initial render
  renderRawTable();
  processCleanedData();
});
