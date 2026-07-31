(() => {
  const storageKey = "portfolio-language";
  const toggle = document.querySelector(".language-toggle");
  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector(".nav");

  function applyLanguage(language) {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-en][data-zh]").forEach((element) => {
      element.textContent = element.dataset[language];
    });
    if (toggle) {
      toggle.textContent = language === "en" ? "中文" : "EN";
      toggle.setAttribute("aria-label", language === "en" ? "切换到中文" : "Switch to English");
    }
    localStorage.setItem(storageKey, language);
  }

  applyLanguage(localStorage.getItem(storageKey) === "zh" ? "zh" : "en");

  toggle?.addEventListener("click", () => {
    applyLanguage(document.documentElement.lang === "zh-CN" ? "en" : "zh");
  });

  menuButton?.addEventListener("click", () => {
    const open = nav?.classList.toggle("open") ?? false;
    menuButton.setAttribute("aria-expanded", String(open));
  });

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
})();
