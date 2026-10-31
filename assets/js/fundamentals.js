/**
 * Business Analysis Learning Lab - Data Fundamentals Module Logic
 * Column Inspector and Feature vs Target Interactive Exercise
 */

document.addEventListener("DOMContentLoaded", async () => {
  const columnMetadata = {
    hari: {
      title: "hari",
      meaning: "Hari pencatatan data dan nomor minggu operasional cafe.",
      type: "Kategorikal (Nominal / Deret Waktu Label)",
      examples: "Senin_M1, Selasa_M1, Rabu_M1",
      role: "Biasanya berfungsi sebagai identifier atau indeks waktu, bukan fitur regresi langsung tanpa encoding."
    },
    biaya_iklan_ribu: {
      title: "biaya_iklan_ribu",
      meaning: "Anggaran belanja iklan digital (Instagram/TikTok Ads) dalam ribuan Rupiah per hari.",
      type: "Numerik (Kontinu / Rasio)",
      examples: "10 (Rp 10.000), 20 (Rp 20.000), 50 (Rp 50.000)",
      role: "Sangat ideal sebagai Variabel Bebas (Fitur Input / X) untuk memprediksi penjualan."
    },
    pengunjung: {
      title: "pengunjung",
      meaning: "Jumlah estimasi pelanggan yang datang berkunjung ke kedai.",
      type: "Numerik (Diskrit / Rasio)",
      examples: "28 orang, 45 orang, 110 orang",
      role: "Dapat menjadi Fitur Input (X) atau variabel perantara (mediator) menuju pembelian produk."
    },
    promo_aktif: {
      title: "promo_aktif",
      meaning: "Apakah pada hari tersebut sedang diberlakukan program diskon atau voucher.",
      type: "Kategorikal (Biner: 'Ya' / 'Tidak')",
      examples: "'Ya', 'Tidak'",
      role: "Fitur Input Kategorikal (X). Dalam machine learning biasanya diubah menjadi angka 1 atau 0."
    },
    produk_terjual: {
      title: "produk_terjual",
      meaning: "Total porsi cup kopi dan bakery yang berhasil terjual habis dalam 1 hari.",
      type: "Numerik (Diskrit / Rasio)",
      examples: "20 cup, 30 cup, 75 cup",
      role: "Sangat cocok sebagai Variabel Terikat (Target Prediksi / Y) dalam analisis regresi penjualan."
    },
    pendapatan_ribu: {
      title: "pendapatan_ribu",
      meaning: "Total bruto uang masuk ke kasir cafe dalam ribuan Rupiah.",
      type: "Numerik (Kontinu / Rasio)",
      examples: "500 (Rp 500.000), 1000 (Rp 1.000.000)",
      role: "Dapat menjadi Target Keuangan Utama (Y) atau dihitung dari produk terjual × rata-rata harga."
    }
  };

  // Render Table
  const tableHead = document.getElementById("fundamentals-thead");
  const tableBody = document.getElementById("fundamentals-tbody");
  const data = await window.DataLoader.getCoffeeSales();

  let activeCol = "biaya_iklan_ribu";

  function renderTable() {
    if (!tableHead || !tableBody || !data.length) return;

    const headers = Object.keys(columnMetadata);

    // Render Headers
    tableHead.innerHTML = `
      <tr>
        ${headers.map(h => `
          <th data-col="${h}" class="${activeCol === h ? 'col-selected' : ''}" style="cursor: pointer;">
            ${h} ${activeCol === h ? '📌' : ''}
          </th>
        `).join("")}
      </tr>
    `;

    // Render Rows (top 7 for clean view)
    tableBody.innerHTML = data.slice(0, 7).map(row => `
      <tr>
        ${headers.map(h => `
          <td data-col="${h}" class="${activeCol === h ? 'col-selected' : ''}">
            ${row[h]}
          </td>
        `).join("")}
      </tr>
    `).join("");

    // Attach click events
    tableHead.querySelectorAll("th").forEach(th => {
      th.addEventListener("click", () => {
        activeCol = th.dataset.col;
        updateInspector(activeCol);
        renderTable();
      });
    });

    tableBody.querySelectorAll("td").forEach(td => {
      td.addEventListener("click", () => {
        activeCol = td.dataset.col;
        updateInspector(activeCol);
        renderTable();
      });
    });
  }

  function updateInspector(colKey) {
    const meta = columnMetadata[colKey];
    if (!meta) return;

    const nameEl = document.getElementById("inspect-col-name");
    const meaningEl = document.getElementById("inspect-col-meaning");
    const typeEl = document.getElementById("inspect-col-type");
    const examplesEl = document.getElementById("inspect-col-examples");
    const roleEl = document.getElementById("inspect-col-role");

    if (nameEl) nameEl.textContent = meta.title;
    if (meaningEl) meaningEl.textContent = meta.meaning;
    if (typeEl) typeEl.textContent = meta.type;
    if (examplesEl) examplesEl.textContent = meta.examples;
    if (roleEl) roleEl.textContent = meta.role;
  }

  // Interactive Target vs Feature Exercise
  const btnCheckExercise = document.getElementById("btn-check-variables");
  const exerciseFeedback = document.getElementById("variable-exercise-feedback");

  if (btnCheckExercise) {
    btnCheckExercise.addEventListener("click", () => {
      const selectedTarget = document.querySelector("input[name='target_col']:checked")?.value;
      const checkedFeatures = Array.from(document.querySelectorAll("input[name='feature_col']:checked")).map(cb => cb.value);

      if (!selectedTarget) {
        if (exerciseFeedback) {
          exerciseFeedback.className = "feedback-box incorrect";
          exerciseFeedback.innerHTML = "⚠️ Harap pilih salah satu kolom sebagai variabel target (Y).";
        }
        return;
      }

      if (checkedFeatures.length === 0) {
        if (exerciseFeedback) {
          exerciseFeedback.className = "feedback-box incorrect";
          exerciseFeedback.innerHTML = "⚠️ Harap pilih setidaknya satu kolom sebagai variabel fitur input (X).";
        }
        return;
      }

      if (checkedFeatures.includes(selectedTarget)) {
        if (exerciseFeedback) {
          exerciseFeedback.className = "feedback-box incorrect";
          exerciseFeedback.innerHTML = "⚠️ Kolom target tidak boleh dipilih secara bersamaan sebagai fitur input!";
        }
        return;
      }

      // Check if target is 'produk_terjual' or 'pendapatan_ribu'
      if (selectedTarget === "produk_terjual" && checkedFeatures.includes("biaya_iklan_ribu")) {
        if (exerciseFeedback) {
          exerciseFeedback.className = "feedback-box correct";
          exerciseFeedback.innerHTML = `
            <strong>🎉 Pilihan Anda Tepat Sekali!</strong><br>
            Pertanyaan bisnis berbunyi: <em>"Berapa perkiraan produk yang terjual jika biaya iklan dinaikkan?"</em><br>
            - <strong>Target Prediksi (Y):</strong> <code>produk_terjual</code> (karena inilah hasil yang ingin kita estimasi).<br>
            - <strong>Fitur Input (X):</strong> <code>biaya_iklan_ribu</code> dan <code>promo_aktif</code> (faktor yang kita ketahui atau rencanakan terlebih dahulu).
          `;
        }
        if (window.ProgressManager) {
          window.ProgressManager.markCompleted("fundamentals");
        }
      } else {
        if (exerciseFeedback) {
          exerciseFeedback.className = "feedback-box incorrect";
          exerciseFeedback.innerHTML = `
            <strong>Pilihan masih kurang tepat untuk pertanyaan yang diajukan.</strong><br>
            Ingat: Apa yang ingin diprediksi? Yang ingin kita ketahui adalah <em>jumlah produk terjual</em>. Maka pilihlah <code>produk_terjual</code> sebagai Target (Y), dan faktor yang mempengaruhinya (seperti biaya iklan) sebagai Input (X).
          `;
        }
      }
    });
  }

  // Initial render
  renderTable();
  updateInspector(activeCol);
});
