/**
 * Business Analysis Learning Lab - Data Exploration Module Logic
 * Computes summary stats, renders Chart.js visualizations, and handles exploration quiz
 */

document.addEventListener("DOMContentLoaded", async () => {
  const data = await window.DataLoader.getCoffeeSales();
  if (!data || data.length === 0) return;

  // 1. Calculate & Render Summary Metrics
  const totalRows = data.length;
  const totalCols = Object.keys(data[0]).length;
  let missingCount = 0;
  data.forEach(r => {
    Object.values(r).forEach(v => {
      if (v === null || v === undefined || v === "") missingCount++;
    });
  });

  const salesValues = data.map(r => r.produk_terjual);
  const avgSales = Math.round(salesValues.reduce((a, b) => a + b, 0) / salesValues.length);
  const minSales = Math.min(...salesValues);
  const maxSales = Math.max(...salesValues);

  document.getElementById("stat-total-rows").textContent = totalRows;
  document.getElementById("stat-total-cols").textContent = totalCols;
  document.getElementById("stat-missing-vals").textContent = missingCount;
  document.getElementById("stat-avg-sales").textContent = `${avgSales} cup`;
  document.getElementById("stat-min-max-sales").textContent = `${minSales} - ${maxSales} cup`;

  // 2. Chart.js Exploration
  let chartInstance = null;
  const ctx = document.getElementById("exploration-chart")?.getContext("2d");
  const chartTypeSelect = document.getElementById("chart-type-select");

  function renderChart(type) {
    if (!ctx) return;
    if (chartInstance) chartInstance.destroy();

    const labels = data.map(r => r.hari);
    const sales = data.map(r => r.produk_terjual);
    const ads = data.map(r => r.biaya_iklan_ribu);

    if (type === "bar") {
      chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [{
            label: "Produk Terjual (cup)",
            data: sales,
            backgroundColor: "rgba(99, 102, 241, 0.65)",
            borderColor: "#6366f1",
            borderWidth: 1.5,
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: "#94a3b8" } },
            tooltip: {
              callbacks: {
                afterLabel: (ctx) => `Biaya Iklan: Rp ${ads[ctx.dataIndex]}rb | Promo: ${data[ctx.dataIndex].promo_aktif}`
              }
            }
          },
          scales: {
            x: { ticks: { color: "#94a3b8" }, grid: { color: "rgba(255,255,255,0.06)" } },
            y: { ticks: { color: "#94a3b8" }, grid: { color: "rgba(255,255,255,0.06)" } }
          }
        }
      });
    } else if (type === "line") {
      chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [{
            label: "Tren Penjualan Produk (cup)",
            data: sales,
            borderColor: "#06b6d4",
            backgroundColor: "rgba(6, 182, 212, 0.15)",
            fill: true,
            tension: 0.35,
            pointRadius: 5,
            pointHoverRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { labels: { color: "#94a3b8" } } },
          scales: {
            x: { ticks: { color: "#94a3b8" }, grid: { color: "rgba(255,255,255,0.06)" } },
            y: { ticks: { color: "#94a3b8" }, grid: { color: "rgba(255,255,255,0.06)" } }
          }
        }
      });
    } else if (type === "scatter") {
      const scatterPoints = data.map(r => ({ x: r.biaya_iklan_ribu, y: r.produk_terjual }));
      chartInstance = new Chart(ctx, {
        type: "scatter",
        data: {
          datasets: [{
            label: "Biaya Iklan (X) vs Produk Terjual (Y)",
            data: scatterPoints,
            backgroundColor: "#f59e0b",
            borderColor: "#fbbf24",
            pointRadius: 6,
            pointHoverRadius: 9
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: "#94a3b8" } },
            tooltip: {
              callbacks: {
                label: (ctx) => `Iklan: Rp ${ctx.raw.x}rb → Terjual: ${ctx.raw.y} cup`
              }
            }
          },
          scales: {
            x: {
              title: { display: true, text: "Biaya Iklan (ribu Rupiah)", color: "#94a3b8" },
              ticks: { color: "#94a3b8" },
              grid: { color: "rgba(255,255,255,0.06)" }
            },
            y: {
              title: { display: true, text: "Produk Terjual (cup)", color: "#94a3b8" },
              ticks: { color: "#94a3b8" },
              grid: { color: "rgba(255,255,255,0.06)" }
            }
          }
        }
      });
    }
  }

  if (chartTypeSelect) {
    chartTypeSelect.addEventListener("change", (e) => {
      renderChart(e.target.value);
    });
  }

  renderChart("bar");

  // 3. Exploration Question
  const submitQuestionBtn = document.getElementById("btn-submit-explore-q");
  const questionFeedback = document.getElementById("explore-q-feedback");

  if (submitQuestionBtn) {
    submitQuestionBtn.addEventListener("click", () => {
      const selected = document.querySelector("input[name='explore_q']:checked")?.value;
      if (!selected) {
        if (questionFeedback) {
          questionFeedback.className = "feedback-box incorrect";
          questionFeedback.innerHTML = "⚠️ Harap pilih salah satu opsi jawaban.";
        }
        return;
      }

      if (selected === "opt_sabtu") {
        if (questionFeedback) {
          questionFeedback.className = "feedback-box correct";
          questionFeedback.innerHTML = `
            <strong>🎉 Tepat Sekali!</strong><br>
            Penjualan tertinggi terjadi pada hari <strong>Sabtu (82 cup di Minggu 2)</strong> dengan biaya iklan tertinggi (Rp 70rb) dan promo aktif. Ini menunjukkan adanya indikasi korelasi positif yang kuat antara akhir pekan, anggaran promosi, dan kuantitas produk yang laku.
          `;
        }
        if (window.ProgressManager) {
          window.ProgressManager.markCompleted("exploration");
        }
      } else {
        if (questionFeedback) {
          questionFeedback.className = "feedback-box incorrect";
          questionFeedback.innerHTML = `
            <strong>Jawaban belum tepat.</strong><br>
            Coba amati kembali grafik bar atau scatter plot. Perhatikan nilai produk terjual tertinggi pada sumbu Y dan cocokkan dengan nama harinya.
          `;
        }
      }
    });
  }
});
