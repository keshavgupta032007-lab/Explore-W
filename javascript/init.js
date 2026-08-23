(function () {
  try {
    if (localStorage.getItem("exploreW_theme") === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    }
    const page = window.location.pathname.split("/").pop() || "index.html";
    const currentUser = localStorage.getItem("exploreW_currentUser");

    const publicPages = new Set(["login.html", "signup.html"]);
    if (!publicPages.has(page) && !currentUser) {
      return;
    }

    if (page === "login.html" && currentUser) {
      window.location.replace("index.html");
      return;
    }

    if (currentUser) {
      document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll('a[href="login.html"].nav-login, a[href="login.html"].login').forEach(function (link) {
          link.href = "profile.html";
          link.textContent = "Login";
        });
      });
    }
  } catch (error) {
    console.error("Explore-W initialization failed:", error);
  }
})();
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".nav-login").forEach((link) => {
    link.textContent = "Login";
    link.href = "login.html";
  });
});

