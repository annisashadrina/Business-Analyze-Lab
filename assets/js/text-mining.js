/**
 * Business Analysis Learning Lab - Text Mining Lab Module Logic
 * NLP preprocessing pipeline tabs, sentiment distribution chart, and VADER demonstration
 */

document.addEventListener("DOMContentLoaded", async () => {
  const reviews = await window.DataLoader.getReviews();
  if (!reviews || reviews.length === 0) return;

  // Indonesian & English Stopwords list
  const stopwords = new Set([
    "yang", "di", "dan", "dengan", "untuk", "dari", "ini", "itu", "ke", "pada", "adalah", "karena", "tapi", "agak", "saat", "sangat",
    "the", "and", "a", "for", "is", "in", "of", "to", "at", "was", "with", "over", "that"
  ]);

  // Preprocessing function
  function processReviewText(rawText, stage) {
    if (stage === "raw") return rawText;

    // 1. Case Folding
    const folded = rawText.toLowerCase();
    if (stage === "case_folding") return folded;

    // 2. Cleaning
    const cleaned = folded.replace(/[^\w\s]/gi, "");
    if (stage === "cleaning") return cleaned;

    // 3. Tokenize & Stopword Removal
    const tokens = cleaned.split(/\s+/).filter(w => w.length > 0);
    if (stage === "stopword") {
      const filtered = tokens.filter(t => !stopwords.has(t));
      return filtered.join(" ");
    }

    if (stage === "tokenization") {
      const finalTokens = tokens.filter(t => !stopwords.has(t));
      return JSON.stringify(finalTokens);
    }

    return rawText;
  }

  let currentStage = "raw";

  function renderReviewsTable() {
    const tbody = document.getElementById("reviews-pipeline-tbody");
    if (!tbody) return;

    tbody.innerHTML = reviews.map(r => {
      const transformedText = processReviewText(r.review_text, currentStage);
      const isPos = r.sentiment_label === "Positif";
      const isNeg = r.sentiment_label === "Negatif";
      const badgeClass = isPos ? "badge-verified" : isNeg ? "badge-demo" : "badge-brand";

      return `
        <tr>
          <td><strong>${r.review_id}</strong></td>
          <td><span class="badge ${r.language === 'id' ? 'badge-teal' : 'badge-brand'}">${r.language.toUpperCase()}</span></td>
          <td>${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</td>
          <td style="font-family: ${currentStage === 'tokenization' ? 'var(--font-family-mono)' : 'inherit'}; font-size: var(--font-size-sm); color: var(--text-main);">
            ${transformedText}
          </td>
          <td><span class="badge ${badgeClass}">${r.sentiment_label}</span></td>
        </tr>
      `;
    }).join("");
  }

  // Preprocessing Pipeline Stage Tabs
  const stageTabs = document.querySelectorAll(".pipeline-step-tab");
  stageTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      stageTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentStage = tab.dataset.stage;
      renderReviewsTable();
    });
  });

  // Sentiment Distribution Chart
  const ctx = document.getElementById("sentiment-chart")?.getContext("2d");
  if (ctx) {
    const posCount = reviews.filter(r => r.sentiment_label === "Positif").length;
    const neuCount = reviews.filter(r => r.sentiment_label === "Netral").length;
    const negCount = reviews.filter(r => r.sentiment_label === "Negatif").length;

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Positif", "Netral", "Negatif"],
        datasets: [{
          data: [posCount, neuCount, negCount],
          backgroundColor: ["#10b981", "#64748b", "#f43f5e"],
          borderColor: "#0f172a",
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom", labels: { color: "#94a3b8" } }
        }
      }
    });
  }

  renderReviewsTable();

  // Exercise
  const btnCheckNlpEx = document.getElementById("btn-check-nlp-exercise");
  const nlpFeedback = document.getElementById("nlp-exercise-feedback");
  if (btnCheckNlpEx) {
    btnCheckNlpEx.addEventListener("click", () => {
      const selected = document.querySelector("input[name='nlp_q']:checked")?.value;
      if (!selected) {
        if (nlpFeedback) {
          nlpFeedback.className = "feedback-box incorrect";
          nlpFeedback.innerHTML = "⚠️ Harap pilih salah satu opsi jawaban.";
        }
        return;
      }

      if (selected === "opt_vader_limitation") {
        if (nlpFeedback) {
          nlpFeedback.className = "feedback-box correct";
          nlpFeedback.innerHTML = `
            <strong>🎉 Sangat Tepat!</strong><br>
            Metode seperti <strong>VADER</strong> (Valence Aware Dictionary and sEntiment Reasoner) dibuat dan divalidasi terutama menggunakan kosakata, idiom, dan emotikon bahasa Inggris. Menerapkannya secara mentah pada kalimat bahasa Indonesia seperti <em>'kopi susunya mantap pol'</em> akan menghasilkan skor netral atau salah interpretasi karena kata-kata tersebut tidak ada dalam kamus leksikon aslinya.
          `;
        }
        if (window.ProgressManager) {
          window.ProgressManager.markCompleted("text-mining");
        }
      } else {
        if (nlpFeedback) {
          nlpFeedback.className = "feedback-box incorrect";
          nlpFeedback.innerHTML = `
            <strong>Jawaban belum tepat.</strong><br>
            Perhatikan aspek bahasa dan budaya: Setiap kamus aturan sentimen berbasis leksikon memiliki batasan bahasa yang sangat ketat tanpa modul penerjemahan atau leksikon lokal.
          `;
        }
      }
    });
  }
});
