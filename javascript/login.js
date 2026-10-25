const form = document.getElementById("auth");
const message = document.getElementById("loginMessage");
const password = document.getElementById("password");
const showPassword = document.getElementById("showPassword");
const email = document.getElementById("email");
const remember = document.getElementById("remember");

function readUsers() {
  try {
    const users = JSON.parse(localStorage.getItem("exploreW_users") || "[]");
    return Array.isArray(users) ? users : [];
  } catch (e) {
    return [];
  }
}

function showMessage(text, type) {
  message.className = "login-message" + (type ? " " + type : "");
  message.textContent = text;
}

const savedEmail = localStorage.getItem("exploreW_rememberedEmail");
if (savedEmail) {
  email.value = savedEmail;
  remember.checked = true;
}

showPassword.addEventListener("click", () => {
  const isVisible = password.type === "text";
  password.type = isVisible ? "password" : "text";
  showPassword.textContent = isVisible ? "Show" : "Hide";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  showMessage("");

  const typedEmail = email.value.trim().toLowerCase();
  const typedPassword = password.value;

  if (!typedEmail || !typedPassword) {
    showMessage("Please enter your email and password.", "error");
    return;
  }

  let user = readUsers().find(
    (u) => String(u.email || "").toLowerCase() === typedEmail && u.password === typedPassword
  );
  if (!user && typedEmail === "admin@explorew.com" && typedPassword === "1234") {
    user = { name: "Admin", email: "admin@explorew.com", phone: "-" };
  }
  if (!user) {
    showMessage("Email or password is incorrect. Try the demo account shown below.", "error");
    return;
  }

  if (remember.checked) localStorage.setItem("exploreW_rememberedEmail", email.value.trim());
  else localStorage.removeItem("exploreW_rememberedEmail");

  const { password: _omit, ...safeUser } = user;
  localStorage.setItem("exploreW_currentUser", JSON.stringify(safeUser));

  showMessage("Login successful. Opening Explore-W…", "success");
  setTimeout(() => { window.location.href = "index.html"; }, 500);
});
