const form = document.getElementById("auth"), message = document.getElementById("loginMessage"), password = document.getElementById("password"),
    showPassword = document.getElementById("showPassword"), email = document.getElementById("email"), remember = document.getElementById("remember");
const saved = localStorage.getItem("exploreW_rememberedEmail");
if (saved) { email.value = saved; remember.checked = true } showPassword.addEventListener("click", () => { const v = password.type === "text"; password.type = v ? "password" : "text"; showPassword.textContent = v ? "Show" : "Hide" });
form.addEventListener("submit", e => {
    e.preventDefault(); message.className = "login-message"; const d = Object.fromEntries(new FormData(form).entries()), users = JSON.parse(localStorage.getItem("exploreW_users") || "[]");
    let u = users.find(x => x.email.toLowerCase() === d.email.trim().toLowerCase() && x.password === d.password); if (!u && d.email.trim().toLowerCase() === "admin@explorew.com" && d.password === "1234") u = { name: "Admin", email: "admin@explorew.com", phone: "-" };
    if (!u) { message.textContent = "Email or password is incorrect. Try the demo account shown below."; message.classList.add("error"); return } remember.checked ? localStorage.setItem("exploreW_rememberedEmail", d.email.trim()) : localStorage.removeItem("exploreW_rememberedEmail"); localStorage.setItem("exploreW_currentUser", JSON.stringify(u)); message.textContent = "Login successful. Opening Explore-W…"; message.classList.add("success"); setTimeout(() => location.href = "index.html", 500)
});