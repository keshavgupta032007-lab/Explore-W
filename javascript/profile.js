const profileBox = document.getElementById("profile");

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}

let user = null;
try {
  user = JSON.parse(localStorage.getItem("exploreW_currentUser") || "null");
} catch (e) {
  user = null;
}

profileBox.innerHTML = user
  ? `<div class="profile-row"><b>Name</b><span>${escapeHtml(user.name || "-")}</span></div>
     <div class="profile-row"><b>Email</b><span>${escapeHtml(user.email || "-")}</span></div>
     <div class="profile-row"><b>Phone</b><span>${escapeHtml(user.phone || "-")}</span></div>
     <button class="btn profile-logout" id="logoutButton" type="button">Log out</button>`
  : `<p class="profile-empty">You're not logged in yet.</p><a class="back profile-login-link" href="login.html">Log in →</a>`;

const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("exploreW_currentUser");
    window.location.href = "login.html";
  });
}
