(function () {
  try {
    if (localStorage.getItem("exploreW_theme") === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    }
    const page = window.location.pathname.split("/").pop() || "index.html";

    let currentUser = null;
    try {
      currentUser = JSON.parse(localStorage.getItem("exploreW_currentUser") || "null");
    } catch (e) {
      localStorage.removeItem("exploreW_currentUser");
    }

    if ((page === "login.html" || page === "signup.html") && currentUser) {
      window.location.replace("index.html");
      return;
    }

    document.addEventListener("DOMContentLoaded", function () {
      document.querySelectorAll('a[href="login.html"].nav-login, a[href="login.html"].login').forEach(function (link) {
        if (currentUser) {
          link.href = "profile.html";
          link.textContent = "Profile";
        } else {
          link.href = "login.html";
          link.textContent = "Login";
        }
      });
    });
  } catch (error) {
    console.error("Explore-W initialization failed:", error);
  }
})();
