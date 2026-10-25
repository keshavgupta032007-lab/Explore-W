const signupForm = document.getElementById("auth");

function readUsers() {
  try {
    const users = JSON.parse(localStorage.getItem("exploreW_users") || "[]");
    return Array.isArray(users) ? users : [];
  } catch (e) {
    return [];
  }
}

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = Object.fromEntries(new FormData(signupForm).entries());

  const name = String(f.name || "").trim();
  const phone = String(f.phone || "").trim();
  const email = String(f.email || "").trim().toLowerCase();
  const password = String(f.password || "");
  const digits = phone.replace(/\D/g, "");

  if (name.length < 2) return alert("Please enter your full name.");
  if (!/^\+?[\d\s()-]+$/.test(phone) || digits.length < 7 || digits.length > 15) {
    return alert("Please enter a valid phone number (7 to 15 digits).");
  }
  if (password.length < 6) return alert("Password must be at least 6 characters.");
  if (password !== f.confirm) return alert("Passwords do not match.");

  const users = readUsers();
  if (users.some((u) => String(u.email || "").toLowerCase() === email) || email === "admin@explorew.com") {
    return alert("This email is already registered. Please log in instead.");
  }

  users.push({ name, phone, email, password });
  localStorage.setItem("exploreW_users", JSON.stringify(users));
  alert("Account created. Please log in.");
  window.location.href = "login.html";
});
