/**
 * Business Analysis Learning Lab - Core App Script
 * Initializes layout, themes, global toasts, and progress triggers
 */

const App = (() => {
  const THEME_KEY = "ball_theme_preference";

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || "light";
    setTheme(savedTheme);

    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") || "light";
        const nextTheme = current === "dark" ? "light" : "dark";
        setTheme(nextTheme);
      });
    }
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = theme === "dark" 
        ? `<span class="icon">☼</span> Tampilan Terang` 
        : `<span class="icon">☾</span> Tampilan Gelap`;
    }
  }

  function showToast(message, type = "info") {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>⚡</span> <div>${message}</div>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // Format utility
  function formatRupiah(num) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num * 1000);
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    if (window.NavigationManager) {
      window.NavigationManager.init();
    }
    if (window.ProgressManager) {
      window.ProgressManager.updateUI();
    }
  });

  return {
    showToast,
    formatRupiah,
    setTheme
  };
})();

window.App = App;
