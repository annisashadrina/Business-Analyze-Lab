/**
 * Business Analysis Learning Lab - Clustering Lab Module Logic
 * K-Means algorithm simulation, 2D scatter visualization, and customer persona profiling
 */

document.addEventListener("DOMContentLoaded", async () => {
  const data = await window.DataLoader.getCustomerClustering();
  if (!data || data.length === 0) return;

  const ctx = document.getElementById("clustering-chart")?.getContext("2d");
  let clusterChart = null;
  let currentK = 3;

  const clusterColors = [
    { bg: "rgba(99, 102, 241, 0.7)", border: "#6366f1", name: "Cluster 1 (Biru)" },
    { bg: "rgba(6, 182, 212, 0.7)", border: "#06b6d4", name: "Cluster 2 (Sian)" },
    { bg: "rgba(245, 158, 11, 0.7)", border: "#f59e0b", name: "Cluster 3 (Amber)" },
    { bg: "rgba(244, 63, 94, 0.7)", border: "#f43f5e", name: "Cluster 4 (Merah)" }
  ];

  // Helper Euclidean Distance (with normalized scale for fair distance)
  function distance(p1, p2) {
    const dx = (p1.x - p2.x) / 20; // max frequency approx 20
    const dy = (p1.y - p2.y) / 250; // max spending approx 250
    return Math.sqrt(dx * dx + dy * dy);
  }

  function runKMeans(k) {
    // Initial seeds based on domain anchors
    let initialCentroids = [];
    if (k === 2) {
      initialCentroids = [{ x: 3, y: 30 }, { x: 17, y: 120 }];
    } else if (k === 3) {
      initialCentroids = [{ x: 3, y: 30 }, { x: 15, y: 40 }, { x: 17, y: 130 }];
    } else {
      initialCentroids = [{ x: 3, y: 30 }, { x: 15, y: 40 }, { x: 17, y: 130 }, { x: 3, y: 190 }];
    }

    let centroids = initialCentroids.map(c => ({ ...c }));
    let assignments = [];

    // 5 iterations for convergence
    for (let iter = 0; iter < 5; iter++) {
      assignments = data.map(pt => {
        const point = { x: pt.frekuensi_kunjungan_bulan, y: pt.rata_rata_belanja_ribu };
        let minDist = Infinity;
        let bestCluster = 0;
        centroids.forEach((c, idx) => {
          const d = distance(point, c);
          if (d < minDist) {
            minDist = d;
            bestCluster = idx;
          }
        });
        return { ...pt, point, cluster: bestCluster };
      });

      // Update centroids
      for (let cIdx = 0; cIdx < k; cIdx++) {
        const members = assignments.filter(a => a.cluster === cIdx);
        if (members.length > 0) {
          const avgX = members.reduce((sum, m) => sum + m.point.x, 0) / members.length;
          const avgY = members.reduce((sum, m) => sum + m.point.y, 0) / members.length;
          centroids[cIdx] = { x: Math.round(avgX), y: Math.round(avgY) };
        }
      }
    }

    return { assignments, centroids };
  }

  function renderClustering(k) {
    currentK = k;
    const { assignments, centroids } = runKMeans(k);

    // Build Chart Datasets
    const datasets = [];
    for (let cIdx = 0; cIdx < k; cIdx++) {
      const clusterPoints = assignments
        .filter(a => a.cluster === cIdx)
        .map(a => ({ x: a.point.x, y: a.point.y, customer: a.customer_id, factual: a.profil_faktual }));

      datasets.push({
        label: `Segmen #${cIdx + 1} (${clusterPoints.length} Pelanggan)`,
        data: clusterPoints,
        backgroundColor: clusterColors[cIdx].bg,
        borderColor: clusterColors[cIdx].border,
        pointRadius: 6,
        pointHoverRadius: 9
      });

      // Centroid marker
      datasets.push({
        label: `Centroid #${cIdx + 1}`,
        data: [{ x: centroids[cIdx].x, y: centroids[cIdx].y }],
        backgroundColor: "#ffffff",
        borderColor: clusterColors[cIdx].border,
        borderWidth: 3,
        pointRadius: 11,
        pointStyle: "crossRot"
      });
    }

    if (clusterChart) clusterChart.destroy();
    if (ctx) {
      clusterChart = new Chart(ctx, {
        type: "scatter",
        data: { datasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: "#94a3b8",
                filter: (item) => !item.text.includes("Centroid") // hide duplicate centroid legend
              }
            },
            tooltip: {
              callbacks: {
                label: (ctx) => {
                  if (ctx.dataset.label.includes("Centroid")) {
                    return `Pusat Cluster: (${ctx.raw.x}x kunjungan, Rp ${ctx.raw.y}rb)`;
                  }
                  return `${ctx.raw.customer} (${ctx.raw.factual}): ${ctx.raw.x}x kunjungan, Rp ${ctx.raw.y}rb`;
                }
              }
            }
          },
          scales: {
            x: {
              min: 0,
              max: 24,
              title: { display: true, text: "Frekuensi Kunjungan per Bulan (kali)", color: "#94a3b8" },
              ticks: { color: "#94a3b8" },
              grid: { color: "rgba(255,255,255,0.06)" }
            },
            y: {
              min: 0,
              max: 250,
              title: { display: true, text: "Rata-rata Pengeluaran Belanja (ribu Rupiah)", color: "#94a3b8" },
              ticks: { color: "#94a3b8" },
              grid: { color: "rgba(255,255,255,0.06)" }
            }
          }
        }
      });
    }

    // Render Persona Profile Cards
    const profilesContainer = document.getElementById("cluster-personas-grid");
    if (profilesContainer) {
      profilesContainer.innerHTML = "";
      for (let cIdx = 0; cIdx < k; cIdx++) {
        const members = assignments.filter(a => a.cluster === cIdx);
        const avgX = (members.reduce((s, m) => s + m.point.x, 0) / members.length).toFixed(1);
        const avgY = Math.round(members.reduce((s, m) => s + m.point.y, 0) / members.length);

        let personaTitle = `Segmen Cluster #${cIdx + 1}`;
        let strategy = "Strategi promosi reguler.";
        if (avgX >= 12 && avgY >= 100) {
          personaTitle = "👑 Sultan Pecinta Kopi (VIP Loyal)";
          strategy = "Prioritas layanan, undang sesi cupping eksklusif, loyalty points ganda.";
        } else if (avgX >= 10 && avgY < 70) {
          personaTitle = "💻 Mahasiswa / WFC Hemat";
          strategy = "Sediakan WiFi kencang, promo bundling kopi + roti isi, colokan listrik nyaman.";
        } else if (avgX < 6 && avgY >= 150) {
          personaTitle = "🎉 Pembeli Borongan / Event Acara";
          strategy = "Tawarkan paket catering rapat kantor, promo pre-order botol literan 1 liter.";
        } else {
          personaTitle = "🚶 Pengunjung Kasual / Jarang";
          strategy = "Kirim voucher diskon 'Kami Rindu Kamu' untuk memancing kunjungan kembali.";
        }

        const card = document.createElement("div");
        card.className = "card";
        card.style.borderLeft = `4px solid ${clusterColors[cIdx].border}`;
        card.innerHTML = `
          <div style="font-size: var(--font-size-xs); color: var(--color-accent-teal); text-transform: uppercase; font-weight: 700;">Cluster #${cIdx + 1} (${members.length} Anggota)</div>
          <h4 style="font-family: var(--font-family-heading); font-size: var(--font-size-lg); color: #ffffff; margin: 4px 0 8px 0;">${personaTitle}</h4>
          <div style="font-size: var(--font-size-sm); color: var(--text-muted); margin-bottom: var(--space-3);">
            <div>• Rata-rata Kunjungan: <strong>${avgX}x / bulan</strong></div>
            <div>• Rata-rata Belanja: <strong>Rp ${avgY}.000</strong></div>
          </div>
          <div style="background: var(--bg-surface); padding: var(--space-3); border-radius: var(--radius-md); font-size: var(--font-size-xs); color: var(--text-main); border: 1px solid var(--border-subtle);">
            <strong>Rekomendasi Bisnis:</strong> ${strategy}
          </div>
        `;
        profilesContainer.appendChild(card);
      }
    }
  }

  // K Selector Buttons
  const kButtons = document.querySelectorAll(".btn-select-k");
  kButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      kButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const k = Number(btn.dataset.k);
      renderClustering(k);
    });
  });

  // Initial render with K=3
  renderClustering(3);

  // Exercise
  const btnCheckClusterEx = document.getElementById("btn-check-cluster-exercise");
  const clusterFeedback = document.getElementById("cluster-exercise-feedback");
  if (btnCheckClusterEx) {
    btnCheckClusterEx.addEventListener("click", () => {
      const selected = document.querySelector("input[name='cluster_q']:checked")?.value;
      if (!selected) {
        if (clusterFeedback) {
          clusterFeedback.className = "feedback-box incorrect";
          clusterFeedback.innerHTML = "⚠️ Harap pilih salah satu opsi jawaban.";
        }
        return;
      }

      if (selected === "opt_human_interpretation") {
        if (clusterFeedback) {
          clusterFeedback.className = "feedback-box correct";
          clusterFeedback.innerHTML = `
            <strong>🎉 Benar Sekali!</strong><br>
            Algoritma K-Means hanya menghitung jarak matematis antar angka koordinat. Label seperti <em>'Pelanggan VIP'</em> atau <em>'WFC Hemat'</em> adalah <strong>interpretasi makna bisnis oleh manusia</strong> setelah mengamati karakteristik titik-titik dalam kelompok tersebut. Inilah mengapa sentuhan business analyst sangat penting!
          `;
        }
        if (window.ProgressManager) {
          window.ProgressManager.markCompleted("clustering");
        }
      } else {
        if (clusterFeedback) {
          clusterFeedback.className = "feedback-box incorrect";
          clusterFeedback.innerHTML = `
            <strong>Jawaban belum tepat.</strong><br>
            Ingat prinsip Unsupervised Learning: Algoritma tidak pernah diberi tahu nama profil pelanggan di awal, melainkan hanya mengelompokkan data berdasarkan kedekatan jarak.
          `;
        }
      }
    });
  }
});
