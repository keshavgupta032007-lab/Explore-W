export function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return;
  }
}

export function readString(key, fallback = "") {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

export function writeString(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    return;
  }
}

export function removeKey(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    return;
  }
}

const FAVORITES_KEY = "exploreW_favorites";

export function loadFavorites() {
  const saved = readJSON(FAVORITES_KEY, []);
  return Array.isArray(saved) ? saved : [];
}

export function saveFavorites(ids) {
  writeJSON(FAVORITES_KEY, ids);
}

export function toggleId(ids, id) {
  return ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
}

export function selectForBooking(item, service = "packages") {
  writeJSON("exploreW_selectedItem", { service, item });
  window.location.href = "booking.html";
}
