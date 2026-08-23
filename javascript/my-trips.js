const box = document.getElementById("trips");
let bookings = JSON.parse(localStorage.getItem("exploreW_bookings") || "[]");

function render() {
  if (!bookings.length) {
    box.innerHTML = '<div class="empty">No bookings yet. <a href="index.html" class="empty-link">Start exploring →</a></div>';
    return;
  }

  box.innerHTML = bookings.map((booking, index) => `
    <article class="result-card">
      <div>
        <h3>${booking.item.name}</h3>
        <p class="meta">${booking.service} • Booking ID: ${booking.id}</p>
        <p>Passenger: ${booking.name}<br>Status: <b>${booking.status}</b></p>
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
  bookings[index].status = "Cancelled";
  localStorage.setItem("exploreW_bookings", JSON.stringify(bookings));
  render();
});

render();
