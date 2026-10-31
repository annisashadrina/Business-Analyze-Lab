/**
 * Business Analysis Learning Lab - Navigation Controller
 * Handles active sidebar links, drawer toggling, and curriculum routing
 */

const NavigationManager = (() => {
  const LESSON_SEQUENCE = [
    { id: "dashboard", path: "index.html", title: "Dashboard & Alur" },
    { id: "intro", path: "pages/intro.html", title: "Pengantar Business Analysis" },
    { id: "fundamentals", path: "pages/fundamentals.html", title: "Data Fundamentals" },
    { id: "exploration", path: "pages/exploration.html", title: "Data Exploration" },
    { id: "preparation", path: "pages/preparation.html", title: "Data Preparation" },
    { id: "method-explorer", path: "pages/method-explorer.html", title: "Method Explorer" },
    { id: "regression", path: "pages/regression.html", title: "Regression Lab" },
    { id: "classification", path: "pages/classification.html", title: "Classification Lab" },
    { id: "clustering", path: "pages/clustering.html", title: "Clustering Lab" },
    { id: "association-rules", path: "pages/association-rules.html", title: "Association Rules Lab" },
    { id: "ann", path: "pages/ann.html", title: "ANN Visualizer" },
    { id: "text-mining", path: "pages/text-mining.html", title: "Text Mining Lab" },
    { id: "project-workspace", path: "pages/project-workspace.html", title: "Project Workspace" },
    { id: "quiz", path: "pages/quiz.html", title: "Kuis & Review" }
  ];

  return {
    init() {
      this.setupMobileMenu();
      this.highlightActive();
      this.setupLessonNavButtons();
      this.setupCompleteButton();
    },

    setupMobileMenu() {
      const toggle = document.querySelector(".mobile-menu-toggle");
      const sidebar = document.querySelector(".app-sidebar");
      const backdrop = document.querySelector(".sidebar-backdrop");

      if (toggle && sidebar) {
        toggle.addEventListener("click", () => {
          sidebar.classList.toggle("open");
          if (backdrop) backdrop.classList.toggle("active");
        });
      }

      if (backdrop && sidebar) {
        backdrop.addEventListener("click", () => {
          sidebar.classList.remove("open");
          backdrop.classList.remove("active");
        });
      }
    },

    highlightActive() {
      const pageId = document.body.dataset.pageId;
      if (!pageId) return;

      const links = document.querySelectorAll(".nav-item-link");
      links.forEach(link => {
        if (link.dataset.lessonId === pageId) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    },

    setupLessonNavButtons() {
      const pageId = document.body.dataset.pageId;
      if (!pageId) return;

      const currentIndex = LESSON_SEQUENCE.findIndex(item => item.id === pageId);
      if (currentIndex === -1) return;

      const isSubPage = window.location.pathname.includes("/pages/") || window.location.href.includes("/pages/");
      const prefix = isSubPage ? "" : "pages/";
      const rootPrefix = isSubPage ? "../" : "";

      const prevBtn = document.getElementById("btn-lesson-prev");
      const nextBtn = document.getElementById("btn-lesson-next");

      if (prevBtn) {
        if (currentIndex > 0) {
          const prevItem = LESSON_SEQUENCE[currentIndex - 1];
          const href = prevItem.id === "dashboard" ? `${rootPrefix}index.html` : `${isSubPage ? "" : "pages/"}${prevItem.id}.html`;
          prevBtn.href = href;
          prevBtn.innerHTML = `← Sebelumnya: ${prevItem.title}`;
          prevBtn.classList.remove("disabled");
        } else {
          prevBtn.classList.add("disabled");
          prevBtn.removeAttribute("href");
        }
      }

      if (nextBtn) {
        if (currentIndex < LESSON_SEQUENCE.length - 1) {
          const nextItem = LESSON_SEQUENCE[currentIndex + 1];
          const href = isSubPage ? `${nextItem.id}.html` : `pages/${nextItem.id}.html`;
          nextBtn.href = href;
          nextBtn.innerHTML = `Lanjutkan: ${nextItem.title} →`;
          nextBtn.classList.remove("disabled");
        } else {
          nextBtn.href = `${rootPrefix}index.html`;
          nextBtn.innerHTML = `Selesai: Kembali ke Dashboard 🏁`;
        }
      }
    },

    setupCompleteButton() {
      const pageId = document.body.dataset.pageId;
      const toggleBtn = document.getElementById("btn-toggle-complete");
      if (pageId && toggleBtn && window.ProgressManager) {
        toggleBtn.addEventListener("click", () => {
          const isNowCompleted = window.ProgressManager.toggleCompleted(pageId);
          if (window.App) {
            window.App.showToast(
              isNowCompleted ? "Topik ditandai telah selesai! 🎓" : "Topik ditandai belum selesai."
            );
          }
        });
      }
    }
  };
})();

window.NavigationManager = NavigationManager;
