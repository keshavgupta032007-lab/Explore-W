export const SERVICE_META = {
  flights: { label: "Flight", icon: "✈", back: "flights.html", perTraveller: true },
  hotels: { label: "Hotel", icon: "🏨", back: "hotels.html", perTraveller: false },
  trains: { label: "Train", icon: "🚆", back: "trains.html", perTraveller: true },
  buses: { label: "Bus", icon: "🚌", back: "buses.html", perTraveller: true },
  cabs: { label: "Cab", icon: "🚕", back: "cabs.html", perTraveller: false },
  packages: { label: "Package", icon: "🌴", back: "packages.html", perTraveller: true },
};

export const INSURANCE_PER_TRAVELLER = 999;
export const MAX_TRAVELLERS = 6;

export function getRoute(item, service) {
  if (item.from || item.to) return `${item.from || "Pickup"} → ${item.to || "Drop"}`;
  if (item.location) return item.location;
  if (service === "cabs") return `Pickup → Drop${item.time ? ` • ETA ${item.time}` : ""}`;
  return item.duration || "Selected option";
}

export function getDetailLine(item, service) {
  const parts = [getRoute(item, service)];
  if ((service === "flights" || service === "trains") && item.code) parts.unshift(item.code);
  if (item.duration && !parts.includes(item.duration)) parts.push(item.duration);
  if (service === "hotels" && item.rating) parts.push(`★ ${item.rating}`);
  if (service === "buses" && item.type) parts.push(item.type);
  if (service === "cabs" && item.capacity) parts.push(item.capacity);
  return parts.filter(Boolean).join(" • ");
}

export function calculatePricing(service, item, guests, withInsurance) {
  const meta = SERVICE_META[service] || SERVICE_META.packages;
  const travellers = Math.min(Math.max(Number(guests) || 1, 1), MAX_TRAVELLERS);
  const unitPrice = Number(item.price) || 0;
  const multiplier = meta.perTraveller ? travellers : 1;
  const baseTotal = unitPrice * multiplier;
  const insuranceTotal = withInsurance ? INSURANCE_PER_TRAVELLER * travellers : 0;
  return {
    unitPrice,
    multiplier,
    perTraveller: meta.perTraveller,
    baseTotal,
    insuranceTotal,
    travellers,
    total: baseTotal + insuranceTotal,
  };
}

export function todayString() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split("T")[0];
}

export function validateBooking(values, today) {
  const errors = {};

  const name = values.name.trim();
  if (!name) errors.name = "Please enter the traveller's full name.";
  else if (!/^\p{L}[\p{L}\p{M} .'-]+$/u.test(name)) errors.name = "Use letters only (at least 2 characters).";

  const phone = values.phone.trim();
  const digits = phone.replace(/\D/g, "");
  if (!phone) errors.phone = "Please enter a phone number.";
  else if (!/^\+?[\d\s()-]+$/.test(phone) || digits.length < 7 || digits.length > 15) {
    errors.phone = "Enter a valid phone number (7 to 15 digits).";
  }

  const email = values.email.trim();
  if (!email) errors.email = "Please enter an email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email, e.g. you@example.com.";

  if (!values.date) errors.date = "Please choose a travel date.";
  else if (values.date < today) errors.date = "Travel date cannot be in the past.";

  const guests = Number(values.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > MAX_TRAVELLERS) {
    errors.guests = `Choose between 1 and ${MAX_TRAVELLERS} travellers.`;
  }

  return errors;
}
