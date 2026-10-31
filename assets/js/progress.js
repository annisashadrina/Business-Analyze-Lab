/**
 * Business Analysis Learning Lab - Progress Manager
 * Stores and updates student learning progress in localStorage
 */

const ProgressManager = (() => {
  const STORAGE_KEY = "ball_learning_progress";
  const ALL_LESSONS = [
    "intro",
    "fundamentals",
    "exploration",
    "preparation",
    "method-explorer",
    "regression",
    "classification",
    "clustering",
    "association-rules",
    "ann",
    "text-mining",
    "project-workspace",
    "quiz"
  ];

  function getStoredData() {
    try {
      const item = localStorage.getItem(STORAGE_KEY);
      if (item) return JSON.parse(item);
    } catch (e) {
      console.warn("LocalStorage access failed:", e);
    }
    return {
      completed: [],
      quizScore: null,
      quizTotal: 15,
      lastUpdated: new Date().toISOString()
    };
  }

  function saveStoredData(data) {
    try {
      data.lastUpdated = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("Failed to write to localStorage:", e);
    }
  }

  return {
    getAllLessons() {
      return ALL_LESSONS;
    },

    isCompleted(lessonId) {
      const data = getStoredData();
      return data.completed.includes(lessonId);
    },

    toggleCompleted(lessonId) {
      const data = getStoredData();
      const idx = data.completed.indexOf(lessonId);
      let status = false;
      if (idx > -1) {
        data.completed.splice(idx, 1);
        status = false;
      } else {
        data.completed.push(lessonId);
        status = true;
      }
      saveStoredData(data);
      this.updateUI();
      return status;
    },

    markCompleted(lessonId) {
      const data = getStoredData();
      if (!data.completed.includes(lessonId)) {
        data.completed.push(lessonId);
        saveStoredData(data);
        this.updateUI();
      }
    },

    saveQuizResult(score, total) {
      const data = getStoredData();
      data.quizScore = score;
      data.quizTotal = total;
      if (!data.completed.includes("quiz")) {
        data.completed.push("quiz");
      }
      saveStoredData(data);
      this.updateUI();
    },

    getProgressStats() {
      const data = getStoredData();
      const count = data.completed.length;
      const total = ALL_LESSONS.length;
      const percent = Math.round((count / total) * 100);
      return { count, total, percent, quizScore: data.quizScore };
    },

    updateUI() {
      const stats = this.getProgressStats();
      const data = getStoredData();

      // Update sidebar progress bar
      const fill = document.getElementById("sidebar-progress-fill");
      const text = document.getElementById("sidebar-progress-text");
      if (fill) fill.style.width = `${stats.percent}%`;
      if (text) text.textContent = `${stats.percent}% Selesai (${stats.count}/${stats.total})`;

      // Update badges in sidebar
      ALL_LESSONS.forEach(id => {
        const badge = document.querySelector(`[data-lesson-badge="${id}"]`);
        if (badge) {
          if (data.completed.includes(id)) {
            badge.textContent = "Selesai";
            badge.className = "nav-status-badge completed";
          } else {
            badge.textContent = "Belum";
            badge.className = "nav-status-badge";
          }
        }
      });

      // Update complete button on current page
      const pageId = document.body.dataset.pageId;
      const toggleBtn = document.getElementById("btn-toggle-complete");
      if (pageId && toggleBtn) {
        if (data.completed.includes(pageId)) {
          toggleBtn.classList.add("is-completed");
          toggleBtn.innerHTML = `<span>✓</span> Selesai Dipelajari`;
        } else {
          toggleBtn.classList.remove("is-completed");
          toggleBtn.innerHTML = `<span>○</span> Tandai Selesai`;
        }
      }
    }
  };
})();

window.ProgressManager = ProgressManager;
