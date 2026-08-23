const p = document.getElementById('profile'), u = JSON.parse(localStorage.getItem('exploreW_currentUser') || 'null');
p.innerHTML = u
  ? `<div class="profile-row"><b>Name</b><span>${u.name || '-'}</span></div>
     <div class="profile-row"><b>Email</b><span>${u.email}</span></div>
     <div class="profile-row"><b>Phone</b><span>${u.phone || '-'}</span></div>
     <button class="btn profile-logout" id="logoutButton" type="button">Log out</button>`
  : `<p class="profile-empty">You're not logged in yet.</p><a class="back profile-login-link" href="login.html">Log in →</a>`;

const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("exploreW_currentUser");
    window.location.href = "login.html";
  });
}
