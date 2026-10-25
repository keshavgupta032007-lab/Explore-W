import { useEffect, useState } from "react";
import { readJSON, writeJSON } from "../utils/storage.js";
import { SERVICE_META, calculatePricing, todayString, validateBooking } from "../utils/bookingRules.js";
import SelectedTrip from "../components/SelectedTrip.jsx";
import BookingForm from "../components/BookingForm.jsx";
import BookingSummary from "../components/BookingSummary.jsx";

function getInitialValues() {
  const user = readJSON("exploreW_currentUser", null) || {};
  return {
    name: user.name && user.name !== "Admin" ? user.name : "",
    phone: user.phone && user.phone !== "-" ? user.phone : "",
    email: user.email || "",
    date: todayString(),
    guests: "1",
    requests: "",
    insurance: false,
  };
}

export default function BookingPage() {
  const [selected] = useState(() => readJSON("exploreW_selectedItem", null));
  const [values, setValues] = useState(getInitialValues);
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) return undefined;
    const timer = setTimeout(() => {
      window.location.href = "my-trips.html";
    }, 1400);
    return () => clearTimeout(timer);
  }, [saved]);

  if (!selected || !selected.item) {
    return (
      <div className="ew-react ew-booking-empty">
        <h2>No booking selected</h2>
        <p>Choose a flight, hotel, package or other option first, then come back here to book it.</p>
        <a className="btn" href="packages.html">Browse packages</a>
      </div>
    );
  }

  const service = selected.service || "packages";
  const item = selected.item;
  const meta = SERVICE_META[service] || SERVICE_META.packages;

  const errors = validateBooking(values, todayString());
  const pricing = calculatePricing(service, item, values.guests, values.insurance);
  const visibleErrors = {};
  Object.keys(errors).forEach((field) => {
    if (submitAttempted || touched[field]) visibleErrors[field] = errors[field];
  });

  function handleChange(event) {
    const { name, type, value, checked } = event.target;
    setValues((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  }

  function handleBlur(event) {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (saved) return;
    setSubmitAttempted(true);
    if (Object.keys(errors).length > 0) {
      const firstInvalid = Object.keys(errors)[0];
      document.getElementById(`bk-${firstInvalid}`)?.focus();
      return;
    }

    const bookings = readJSON("exploreW_bookings", []);
    const booking = {
      id: "EW" + Date.now().toString().slice(-8),
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      date: values.date,
      guests: pricing.travellers,
      requests: values.requests.trim(),
      insurance: values.insurance,
      service,
      item,
      total: pricing.total,
      status: "Saved",
      created: new Date().toISOString(),
    };
    writeJSON("exploreW_bookings", [...bookings, booking]);
    setSaved(true);
  }

  return (
    <div className="ew-react booking-layout">
      <section className="booking-card">
        <SelectedTrip service={service} item={item} />
        <div className="perforation" />
        <BookingForm
          values={values}
          errors={errors}
          visibleErrors={visibleErrors}
          saving={saved}
          backHref={meta.back}
          onChange={handleChange}
          onBlur={handleBlur}
          onSubmit={handleSubmit}
        />
      </section>

      <BookingSummary service={service} item={item} pricing={pricing} withInsurance={values.insurance} />

      {saved && (
        <div className="booking-success show">
          <div className="success-panel" role="status" aria-live="polite">
            <div className="success-check">✓</div>
            <h2>Booking saved</h2>
            <p>Saved to My Trips in this browser. Opening your trips…</p>
          </div>
        </div>
      )}
    </div>
  );
}
