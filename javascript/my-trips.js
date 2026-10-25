const box = document.getElementById("trips");
let bookings = [];
try {
  const saved = JSON.parse(localStorage.getItem("exploreW_bookings") || "[]");
  bookings = Array.isArray(saved) ? saved : [];
} catch (e) {
  bookings = [];
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}

function render() {
  if (!bookings.length) {
    box.innerHTML = '<div class="empty">No bookings yet. <a href="index.html" class="empty-link">Start exploring →</a></div>';
    return;
  }

  box.innerHTML = bookings.map((booking, index) => `
    <article class="result-card">
      <div>
        <h3>${escapeHtml(booking.item && booking.item.name)}</h3>
        <p class="meta">${escapeHtml(booking.service)} • Booking ID: ${escapeHtml(booking.id)}</p>
        <p>Passenger: ${escapeHtml(booking.name)}${booking.guests ? ` (${escapeHtml(booking.guests)} traveller${Number(booking.guests) > 1 ? "s" : ""})` : ""}<br>${booking.date ? `Travel date: ${escapeHtml(booking.date)}<br>` : ""}Status: <b>${escapeHtml(booking.status)}</b></p>
      </div>
      <div class="price">
        <strong>₹${Number(booking.total).toLocaleString("en-IN")}</strong>
        <button class="btn cancel-booking" data-index="${index}" ${booking.status === "Cancelled" ? "disabled" : ""}>
          ${booking.status === "Cancelled" ? "Cancelled" : "Cancel Booking"}
        </button>
      </div>
    </article>
  `).join("");
}

box.addEventListener("click", (event) => {
  const button = event.target.closest(".cancel-booking");
  if (!button || button.disabled) return;

  const index = Number(button.dataset.index);
  if (!bookings[index]) return;
  if (!window.confirm("Cancel this booking? This cannot be undone.")) return;
  bookings[index].status = "Cancelled";
  localStorage.setItem("exploreW_bookings", JSON.stringify(bookings));
  render();
});

render();
