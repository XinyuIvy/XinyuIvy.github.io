(() => {
  const storageKey = "portfolio-language";
  const toggle = document.querySelector(".language-toggle");
  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector(".nav");

  function applyLanguage(language) {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.title = document.title.replace(language === "zh" ? /Xinyu Zhang/g : /张馨予/g, language === "zh" ? "张馨予" : "Xinyu Zhang");
    document.querySelectorAll("[data-en][data-zh]").forEach((element) => {
      element.textContent = element.dataset[language];
    });
    const fromName = language === "zh" ? "Xinyu Zhang" : "张馨予";
    const toName = language === "zh" ? "张馨予" : "Xinyu Zhang";
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach((node) => {
      if (node.parentElement?.closest("[data-preserve-name]")) return;
      node.nodeValue = node.nodeValue.replaceAll(fromName, toName);
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
