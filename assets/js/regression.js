/**
 * Business Analysis Learning Lab - Regression Lab Module Logic
 * OLS Linear Regression, interactive prediction simulator, real metrics (MAE, MSE, RMSE, R2)
 */

document.addEventListener("DOMContentLoaded", async () => {
  const data = await window.DataLoader.getCoffeeSales();
  if (!data || data.length === 0) return;

  const xVals = data.map(r => r.biaya_iklan_ribu);
  const yVals = data.map(r => r.produk_terjual);
  const n = data.length;

  // 1. Compute Exact OLS Linear Regression Formulas
  const xMean = xVals.reduce((a, b) => a + b, 0) / n;
  const yMean = yVals.reduce((a, b) => a + b, 0) / n;

  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    num += (xVals[i] - xMean) * (yVals[i] - yMean);
    den += (xVals[i] - xMean) ** 2;
  }

  const slope = num / den; // m
  const intercept = yMean - slope * xMean; // c

  // Compute Model Evaluation Metrics
  let ssTot = 0;
  let ssRes = 0;
  let absErrSum = 0;
  let sqErrSum = 0;

  for (let i = 0; i < n; i++) {
    const yHat = slope * xVals[i] + intercept;
    ssTot += (yVals[i] - yMean) ** 2;
    ssRes += (yVals[i] - yHat) ** 2;
    absErrSum += Math.abs(yVals[i] - yHat);
    sqErrSum += (yVals[i] - yHat) ** 2;
  }

  const r2 = 1 - ssRes / ssTot;
  const mae = absErrSum / n;
  const mse = sqErrSum / n;
  const rmse = Math.sqrt(mse);

  // Render Equation & Metrics Cards
  const eqEl = document.getElementById("reg-equation-text");
  const r2El = document.getElementById("reg-metric-r2");
  const maeEl = document.getElementById("reg-metric-mae");
  const rmseEl = document.getElementById("reg-metric-rmse");
  const slopeEl = document.getElementById("reg-slope-val");
  const interceptEl = document.getElementById("reg-intercept-val");

  if (eqEl) eqEl.textContent = `ŷ = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`;
  if (r2El) r2El.textContent = `${(r2 * 100).toFixed(1)}% (${r2.toFixed(3)})`;
  if (maeEl) maeEl.textContent = `${mae.toFixed(2)} cup`;
  if (rmseEl) rmseEl.textContent = `${rmse.toFixed(2)} cup`;
  if (slopeEl) slopeEl.textContent = `+${slope.toFixed(2)} cup/ribu Rp`;
  if (interceptEl) interceptEl.textContent = `${intercept.toFixed(2)} cup`;

  // 2. Chart.js Scatter + Line Plot
  const ctx = document.getElementById("regression-chart")?.getContext("2d");
  let regChart = null;

  // Trendline points
  const minX = 0;
  const maxX = 100;
  const linePoints = [
    { x: minX, y: Math.max(0, slope * minX + intercept) },
    { x: maxX, y: slope * maxX + intercept }
  ];

  let currentPredictionX = 40;
  let currentPredictionY = slope * currentPredictionX + intercept;

  function initChart() {
    if (!ctx) return;
    const actualPoints = data.map(r => ({ x: r.biaya_iklan_ribu, y: r.produk_terjual }));

    regChart = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Data Aktual (Observasi Kasir)",
            data: actualPoints,
            backgroundColor: "#818cf8",
            borderColor: "#6366f1",
            pointRadius: 6,
            pointHoverRadius: 9,
            order: 2
          },
          {
            type: "line",
            label: `Garis Regresi (ŷ = ${slope.toFixed(2)}x + ${intercept.toFixed(2)})`,
            data: linePoints,
            borderColor: "#06b6d4",
            borderWidth: 2.5,
            fill: false,
            pointRadius: 0,
            order: 3
          },
          {
            label: "Titik Prediksi Simulator",
            data: [{ x: currentPredictionX, y: currentPredictionY }],
            backgroundColor: "#f43f5e",
            borderColor: "#ffffff",
            borderWidth: 2,
            pointRadius: 9,
            pointHoverRadius: 11,
            order: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: "#94a3b8" } },
          tooltip: {
            callbacks: {
              label: (ctx) => `Iklan: Rp ${ctx.raw.x}rb → Prediksi: ${ctx.raw.y.toFixed(1)} cup`
            }
          }
        },
        scales: {
          x: {
            min: 0,
            max: 105,
            title: { display: true, text: "Biaya Iklan (ribu Rupiah)", color: "#94a3b8" },
            ticks: { color: "#94a3b8" },
            grid: { color: "rgba(255,255,255,0.06)" }
          },
          y: {
            min: 0,
            max: 120,
            title: { display: true, text: "Produk Terjual (cup)", color: "#94a3b8" },
            ticks: { color: "#94a3b8" },
            grid: { color: "rgba(255,255,255,0.06)" }
          }
        }
      }
    });
  }

  initChart();

  // 3. Interactive Prediction Simulator Slider
  const adSlider = document.getElementById("slider-ad-spend");
  const adValDisplay = document.getElementById("slider-ad-val");
  const predUnitsDisplay = document.getElementById("pred-units-val");
  const predRevenueDisplay = document.getElementById("pred-revenue-val");

  function updatePrediction(x) {
    currentPredictionX = Number(x);
    currentPredictionY = slope * currentPredictionX + intercept;
    const roundedUnits = Math.round(currentPredictionY);
    const estRevenue = roundedUnits * 25; // Asumsi rata-rata harga produk 25rb

    if (adValDisplay) adValDisplay.textContent = `Rp ${currentPredictionX}.000`;
    if (predUnitsDisplay) predUnitsDisplay.textContent = `${roundedUnits} cup`;
    if (predRevenueDisplay) predRevenueDisplay.textContent = `Rp ${(estRevenue).toLocaleString("id-ID")}.000`;

    if (regChart) {
      regChart.data.datasets[2].data = [{ x: currentPredictionX, y: currentPredictionY }];
      regChart.update("none");
    }
  }

  if (adSlider) {
    adSlider.addEventListener("input", (e) => {
      updatePrediction(e.target.value);
    });
    updatePrediction(adSlider.value);
  }

  // 4. Interpretation Exercise
  const btnCheckSlope = document.getElementById("btn-check-reg-exercise");
  const slopeFeedback = document.getElementById("reg-exercise-feedback");

  if (btnCheckSlope) {
    btnCheckSlope.addEventListener("click", () => {
      const selected = document.querySelector("input[name='reg_q']:checked")?.value;
      if (!selected) {
        if (slopeFeedback) {
          slopeFeedback.className = "feedback-box incorrect";
          slopeFeedback.innerHTML = "⚠️ Harap pilih salah satu opsi jawaban.";
        }
        return;
      }

      if (selected === "opt_slope_meaning") {
        if (slopeFeedback) {
          slopeFeedback.className = "feedback-box correct";
          slopeFeedback.innerHTML = `
            <strong>🎉 Benar Sekali!</strong><br>
            Kemiringan (Slope) bernilai <strong>+${slope.toFixed(2)}</strong> artinya setiap penambahan anggaran iklan sebesar Rp 1.000, jumlah produk yang terjual diprediksi bertambah sekitar ${slope.toFixed(2)} cup.<br>
            Namun ingat batasan penting: Hubungan ini hanya berlaku pada rentang data uji (10rb - 70rb), dan tidak membuktikan sebab-akibat tunggal (bisa dipengaruhi cuaca, akhir pekan, atau rasa kopi).
          `;
        }
        if (window.ProgressManager) {
          window.ProgressManager.markCompleted("regression");
        }
      } else {
        if (slopeFeedback) {
          slopeFeedback.className = "feedback-box incorrect";
          slopeFeedback.innerHTML = `
            <strong>Jawaban belum tepat.</strong><br>
            Perhatikan definisi matematis slope $m = \\Delta y / \\Delta x$. Ini mengukur laju perubahan target produk terjual untuk setiap satu satuan perubahan pada biaya iklan.
          `;
        }
      }
    });
  }
});
