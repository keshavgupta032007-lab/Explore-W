document.addEventListener("DOMContentLoaded", function () {
  var toggles = document.querySelectorAll(".theme-toggle");
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("exploreW_theme", theme);
    toggles.forEach(function (btn) {
      btn.textContent = theme === "dark" ? "☀" : "☾";
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    });
  }
  applyTheme(document.documentElement.getAttribute("data-theme") || "light");
  toggles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme");
      applyTheme(current === "dark" ? "light" : "dark");
    });
  });

  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el, i) {
      el.style.setProperty("--i", i % 8);
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = this.getAttribute("href");
      if (id.length > 1) {
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
});
