const service = document.body.dataset.service;
const data = (window.travelData && window.travelData[service]) || [];
const list = document.getElementById("results");
const count = document.getElementById("count");
const sort = document.getElementById("sort");
const maxPrice = document.getElementById("maxPrice");
const priceLabel = document.getElementById("priceLabel");
const topRated = document.getElementById("topRated");
let searchCriteria = {};

function money(n) { return "₹" + Number(n).toLocaleString("en-IN") }
function card(item, index) {
    let title = "", sub = "", details = "", route = "", price = item.price;
    if (service === "flights") {
        title = `${item.name} <span class="tag">${item.stops}</span>`; sub = `${item.code}${item.country ? " • " + item.country : ""}`;
        route = `<div class="route"><div><b>${item.depart}</b><small>${item.from}</small></div><div class="route-line"></div><div><b>${item.arrive}</b><small>${item.to}</small></div></div>`;
        details = `${item.duration} • ${item.stops}`;
    } else if (service === "hotels") {
        title = item.name; sub = `${item.location} • ★ ${item.rating}${item.country ? " • " + item.country : ""}`;
        route = `<div class="amenities">📍 ${item.location}</div>`; details = item.amenities;
    } else if (service === "trains") {
        title = `${item.name} <span class="tag">${item.code}</span>`; sub = `${item.class} • ${item.from} → ${item.to}${item.country ? " • " + item.country : ""}`;
        route = `<div class="route"><div><b>${item.depart}</b><small>${item.from}</small></div><div class="route-line"></div><div><b>${item.arrive}</b><small>${item.to}</small></div></div>`; details = item.duration;
    } else if (service === "buses") {
        title = item.name; sub = `${item.type} • ★ ${item.rating}${item.country ? " • " + item.country : ""}`;
        route = `<div class="route"><div><b>${item.depart}</b><small>${item.from}</small></div><div class="route-line"></div><div><b>${item.arrive}</b><small>${item.to}</small></div></div>`; details = item.duration;
    } else if (service === "cabs") {
        title = item.name; sub = `${item.capacity}${item.country ? " • " + item.country : ""}`;
        route = `<div class="route cab-route"><div><b>Pickup</b><small>${item.from}</small></div><div class="route-line"></div><div><b>Drop</b><small>${item.to}</small></div></div>`; details = `🚕 Estimated transfer time: ${item.time}`;
    } else {
        title = item.name; sub = `${item.location} • ${item.duration}`; route = `<div class="amenities">🌍 ${item.details}</div>`; details = item.country ? `International package • ${item.country}` : "Flexible itinerary";
    }
    return `<article class="result-card"><div class="result-main"><h3>${title}</h3><div class="meta">${sub}</div>${route}<div class="amenities">${details}</div></div><div class="price"><span class="meta">Starting from</span><strong>${money(price)}</strong><button class="btn book" data-index="${index}">Book Now</button></div></article>`;
}
function includes(value, query) { return !query || String(value || "").toLowerCase().includes(String(query).trim().toLowerCase()) }
function matchesSearch(item) {
    const from = searchCriteria.from || searchCriteria.pickup || "";
    const to = searchCriteria.to || searchCriteria.drop || "";
    const destination = searchCriteria.destination || "";
    if (service === "packages") return includes(item.location, destination) || includes(item.name, destination) || includes(item.country, destination);
    if (service === "hotels") return includes(item.location, destination) || includes(item.name, destination) || includes(item.country, destination);
    if (service === "cabs") return includes(item.from, from) && includes(item.to, to);
    if (["flights", "buses"].includes(service)) return includes(item.from, from) && includes(item.to, to);
    if (service === "trains") {
        const cls = searchCriteria.class;
        const classOk = !cls || cls === "Any class" || item.class === cls;
        return includes(item.from, from) && includes(item.to, to) && classOk;
    }
    return true;
}
function render() {
    const max = Number(maxPrice?.value || Infinity);
    let current = data.filter(x => x.price <= max && matchesSearch(x) && (!topRated?.checked || (x.rating || 0) >= Number(topRated.dataset.min || 4.5)));
    if (sort?.value === "priceAsc") current.sort((a, b) => a.price - b.price);
    if (sort?.value === "priceDesc") current.sort((a, b) => b.price - a.price);
    if (sort?.value === "rating") current.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    count.textContent = current.length + (current.length === 1 ? " option" : " options");
    list.innerHTML = current.length ? current.map(x => card(x, data.indexOf(x))).join("") : `<div class="empty">No exact match found. Try another international city or clear the search fields.</div>`;
    document.querySelectorAll(".book").forEach(btn => btn.onclick = () => {
        const item = data[Number(btn.dataset.index)];
        if (!item) return;
        localStorage.setItem("exploreW_selectedItem", JSON.stringify({ service, item }));
        window.location.href = "booking.html";
    });
}
function configurePriceRange() {
    if (!maxPrice) return;
    const highest = data.length ? Math.max(...data.map(x => x.price)) : 50000;
    const rounded = Math.ceil(highest / 10000) * 10000;
    maxPrice.min = 0;
    maxPrice.step = service === "packages" || service === "flights" ? 1000 : 500;
    maxPrice.max = rounded;
    maxPrice.value = rounded;
    priceLabel.textContent = money(rounded);
}
if (sort) sort.onchange = render;
if (topRated) topRated.onchange = render;
if (maxPrice) { configurePriceRange(); maxPrice.oninput = () => { priceLabel.textContent = money(maxPrice.value); render() } }

const searchForm = document.getElementById("quickSearch");
if (searchForm) searchForm.onsubmit = e => {
    e.preventDefault();
    searchCriteria = Object.fromEntries(new FormData(searchForm).entries());
    render();
    showToast("International search updated");
};
function showToast(m) { const t = document.getElementById("toast"); if (!t) return; t.textContent = m; t.classList.add("show"); setTimeout(() => t.classList.remove("show"), 1800) }

function applyHomeSearch() {
    try {
        if (localStorage.getItem("exploreW_service") !== service) return;
        const saved = JSON.parse(localStorage.getItem("exploreW_searchData") || "{}");
        localStorage.removeItem("exploreW_searchData");
        localStorage.removeItem("exploreW_service");
        if (!saved || typeof saved !== "object") return;
        const mapped = {
            from: saved.from || saved.pickup || "",
            to: saved.to || saved.drop || "",
            destination: saved.destination || "",
            date: saved.date || saved.checkin || "",
            class: saved.class || ""
        };
        searchCriteria = mapped;
        if (searchForm) {
            Object.entries(mapped).forEach(([name, value]) => {
                const input = searchForm.elements[name];
                if (input && value) input.value = value;
            });
        }
    } catch (e) {
        searchCriteria = {};
    }
}

const menuButton = document.getElementById("menu");
const navMenu = document.getElementById("nav");
if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {
        const open = navMenu.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", open ? "true" : "false");
    });
}

applyHomeSearch();
render();
