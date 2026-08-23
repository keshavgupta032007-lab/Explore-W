const fields = {
    flights: `<div class="field"><label>From</label><input name="from" placeholder="Delhi / Mumbai / London" required></div><div class="field"><label>To</label><input name="to" placeholder="Dubai / Paris / Tokyo" required></div><div class="field"><label>Departure</label><input name="date" type="date" required></div><div class="field"><label>Travellers</label><select name="travellers"><option>1 Traveller</option><option>2 Travellers</option><option>3 Travellers</option><option>4 Travellers</option></select></div>`,
    hotels: `<div class="field"><label>Destination</label><input name="destination" placeholder="Dubai / Paris / Singapore" required></div><div class="field"><label>Check-in</label><input name="checkin" type="date" required></div><div class="field"><label>Check-out</label><input name="checkout" type="date" required></div><div class="field"><label>Guests</label><select name="guests"><option>2 Guests, 1 Room</option><option>1 Guest, 1 Room</option><option>3 Guests, 1 Room</option><option>4 Guests, 2 Rooms</option></select></div>`,
    trains: `<div class="field"><label>From</label><input name="from" placeholder="London / Paris / Tokyo" required></div><div class="field"><label>To</label><input name="to" placeholder="Paris / Zurich / Kyoto" required></div><div class="field"><label>Journey date</label><input name="date" type="date" required></div><div class="field"><label>Class</label><select name="class"><option>Sleeper</option><option>AC 3 Tier</option><option>AC 2 Tier</option><option>AC First Class</option></select></div>`,
    buses: `<div class="field"><label>From</label><input name="from" placeholder="Paris / Dubai / Singapore" required></div><div class="field"><label>To</label><input name="to" placeholder="Amsterdam / Abu Dhabi / Kuala Lumpur" required></div><div class="field"><label>Travel date</label><input name="date" type="date" required></div><div class="field"><label>Passengers</label><select name="passengers"><option>1 Passenger</option><option>2 Passengers</option><option>3 Passengers</option><option>4 Passengers</option></select></div>`,
    cabs: `<div class="field"><label>Pickup</label><input name="pickup" placeholder="Airport / city pickup" required></div><div class="field"><label>Drop</label><input name="drop" placeholder="Hotel / city destination" required></div><div class="field"><label>Date</label><input name="date" type="date" required></div><div class="field"><label>Time</label><input name="time" type="time" required></div>`,
    packages: `<div class="field"><label>Destination</label><input name="destination" placeholder="Dubai / Paris / Bali" required></div><div class="field"><label>Travel date</label><input name="date" type="date" required></div><div class="field"><label>Travellers</label><select name="travellers"><option>2 Travellers</option><option>1 Traveller</option><option>3 Travellers</option><option>4 Travellers</option></select></div><div class="field"><label>Budget</label><select name="budget"><option>Any budget</option><option>Under ₹10,000</option><option>₹10,000 - ₹20,000</option><option>₹20,000 - ₹50,000</option><option>₹50,000 - ₹1,00,000</option><option>Above ₹1,00,000</option></select></div>`
};
let currentService = "flights";
const dynamicFields = document.getElementById("dynamicFields");
function renderFields() { if (dynamicFields) dynamicFields.innerHTML = fields[currentService]; }
renderFields();

document.querySelectorAll(".tab").forEach(tab => tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active"); currentService = tab.dataset.service; renderFields();
}));
const searchForm = document.getElementById("searchForm");
if (searchForm) searchForm.addEventListener("submit", e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(searchForm).entries());
    localStorage.setItem("exploreW_searchData", JSON.stringify(data));
    localStorage.setItem("exploreW_service", currentService);
    window.location.href = currentService + ".html";
});
const menuBtn = document.getElementById("menuBtn"), navMenu = document.getElementById("navMenu");
if (menuBtn) menuBtn.addEventListener("click", () => navMenu.classList.toggle("open"));
function showToast(message) { const t = document.getElementById("toast"); if (!t) return; t.textContent = message; t.classList.add("show"); setTimeout(() => t.classList.remove("show"), 2500) }
const newsletter = document.getElementById("newsletterForm");
if (newsletter) newsletter.addEventListener("submit", e => { e.preventDefault(); showToast("Thanks! You are subscribed."); newsletter.reset() });