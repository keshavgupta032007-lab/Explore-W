const selected = JSON.parse(localStorage.getItem("exploreW_selectedItem") || "null");

const $ = (id) => document.getElementById(id);
const title = $("itemTitle");
const details = $("itemDetails");
const total = $("total");
const baseFare = $("baseFare");
const summaryName = $("summaryName");
const summaryRoute = $("summaryRoute");
const serviceLabel = $("serviceLabel");
const serviceIcon = $("serviceIcon");
const form = $("bookingForm");
const backLink = $("backToResults");
const bookingCard = document.querySelector(".booking-card");

const SERVICE_META = {
  flights: { label: "Flight", icon: "✈", back: "flights.html" },
  hotels: { label: "Hotel", icon: "🏨", back: "hotels.html" },
  trains: { label: "Train", icon: "🚆", back: "trains.html" },
  buses: { label: "Bus", icon: "🚌", back: "buses.html" },
  cabs: { label: "Cab", icon: "🚕", back: "cabs.html" },
  packages: { label: "Package", icon: "🌴", back: "packages.html" }
};

function money(value) {
  return "₹" + Number(value || 0).toLocaleString("en-IN");
}

function getRoute(item, service) {
  if (item.from || item.to) return `${item.from || "Pickup"} → ${item.to || "Drop"}`;
  if (item.location) return item.location;
  if (service === "cabs") return `Pickup → Drop${item.time ? ` • ETA ${item.time}` : ""}`;
  return item.duration || "Selected option";
}

function getDetailLine(item, service) {
  const parts = [getRoute(item, service)];
  if (service === "flights" && item.code) parts.unshift(item.code);
  if (service === "trains" && item.code) parts.unshift(item.code);
  if (item.duration && !parts.includes(item.duration)) parts.push(item.duration);
  if (service === "hotels" && item.rating) parts.push(`★ ${item.rating}`);
  if (service === "buses" && item.type) parts.push(item.type);
  if (service === "cabs" && item.capacity) parts.push(item.capacity);
  return parts.filter(Boolean).join(" • ");
}

function setMinimumDate() {
  const input = $("travelDate");
  if (!input) return;
  const today = new Date();
  const local = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
  input.min = local;
  input.value = local;
}

setMinimumDate();

if (!selected || !selected.item) {
  title.textContent = "No booking selected";
  details.textContent = "Choose an option first, then return here to complete your booking.";
  summaryName.textContent = "No selection";
  summaryRoute.textContent = "Please select a trip";
  total.textContent = "₹0";
  baseFare.textContent = "₹0";
  bookingCard?.classList.add("no-selection");
  backLink.href = "packages.html";
  backLink.textContent = "← Browse trips";
} else {
  const service = selected.service || "packages";
  const item = selected.item;
  const meta = SERVICE_META[service] || SERVICE_META.packages;
  const price = Number(item.price || 0);
  const route = getRoute(item, service);
  const detailLine = getDetailLine(item, service);

  title.textContent = item.name || `${meta.label} booking`;
  details.textContent = detailLine;
  serviceLabel.textContent = `Selected ${meta.label}`;
  serviceIcon.textContent = meta.icon;
  summaryName.textContent = item.name || `${meta.label} option`;
  summaryRoute.textContent = route;
  baseFare.textContent = money(price);
  total.textContent = money(price);
  backLink.href = meta.back;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!selected || !selected.item) return;

  const values = Object.fromEntries(new FormData(form).entries());
  const bookings = JSON.parse(localStorage.getItem("exploreW_bookings") || "[]");
  const booking = {
    id: "EW" + Date.now().toString().slice(-8),
    ...values,
    service: selected.service,
    item: selected.item,
    total: Number(selected.item.price || 0),
    status: "Confirmed",
    created: new Date().toISOString()
  };

  bookings.push(booking);
  localStorage.setItem("exploreW_bookings", JSON.stringify(bookings));

  const success = $("bookingSuccess");
  success.classList.add("show");
  success.setAttribute("aria-hidden", "false");
  setTimeout(() => { window.location.href = "my-trips.html"; }, 1100);
});

$("menu")?.addEventListener("click", () => $("nav")?.classList.toggle("open"));
