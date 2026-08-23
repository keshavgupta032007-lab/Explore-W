document.getElementById("auth").onsubmit = e => {
    e.preventDefault(); const f = Object.fromEntries(new FormData(e.target).entries());
    let users = JSON.parse(localStorage.getItem("exploreW_users") || "[]");
    if (f.password !== f.confirm) return alert("Passwords do not match");
    if (users.some(u => u.email === f.email)) return alert("Email already registered"); delete f.confirm; users.push(f); localStorage.setItem("exploreW_users", JSON.stringify(users)); alert("Account created"); location.href = "login.html";
};
