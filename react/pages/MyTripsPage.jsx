import { useState } from "react";
import { readJSON, writeJSON } from "../utils/storage.js";
import { formatPrice } from "../utils/format.js";

const BOOKINGS_KEY = "exploreW_bookings";

function loadBookings() {
  const saved = readJSON(BOOKINGS_KEY, []);
  return Array.isArray(saved) ? saved.filter((b) => b && typeof b === "object") : [];
}

export default function MyTripsPage() {
  const [bookings, setBookings] = useState(loadBookings);

  function handleCancel(index) {
    if (!bookings[index]) return;
    if (!window.confirm("Cancel this booking? This cannot be undone.")) return;
    const next = bookings.map((booking, i) => (i === index ? { ...booking, status: "Cancelled" } : booking));
    writeJSON(BOOKINGS_KEY, next);
    setBookings(next);
  }

  if (!bookings.length) {
    return (
      <div className="empty">
        No bookings yet. <a href="index.html" className="empty-link">Start exploring →</a>
      </div>
    );
  }

  return (
    <div>
      {bookings.map((booking, index) => {
        const cancelled = booking.status === "Cancelled";
        const guests = Number(booking.guests);
        return (
          <article className="result-card" key={booking.id || index}>
            <div>
              <h3>{booking.item && booking.item.name}</h3>
              <p className="meta">{booking.service} • Booking ID: {booking.id}</p>
              <p>
                Passenger: {booking.name}
                {booking.guests ? ` (${booking.guests} traveller${guests > 1 ? "s" : ""})` : ""}
                <br />
                {booking.date && (
                  <>
                    Travel date: {booking.date}
                    <br />
                  </>
                )}
                Status: <b>{booking.status}</b>
              </p>
            </div>
            <div className="price">
              <strong>{formatPrice(booking.total)}</strong>
              <button
                type="button"
                className="btn cancel-booking"
                disabled={cancelled}
                onClick={() => handleCancel(index)}
              >
                {cancelled ? "Cancelled" : "Cancel Booking"}
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
