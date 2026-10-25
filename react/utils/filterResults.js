export function includesText(value, query) {
  return !query || String(value || "").toLowerCase().includes(String(query).trim().toLowerCase());
}

export function matchesSearch(service, item, criteria) {
  const from = criteria.from || criteria.pickup || "";
  const to = criteria.to || criteria.drop || "";
  const destination = criteria.destination || "";

  if (service === "hotels" || service === "packages") {
    return (
      includesText(item.location, destination) ||
      includesText(item.name, destination) ||
      includesText(item.country, destination)
    );
  }

  if (service === "trains") {
    const cls = criteria.class;
    const classOk = !cls || cls === "Any class" || item.class === cls;
    return includesText(item.from, from) && includesText(item.to, to) && classOk;
  }

  return includesText(item.from, from) && includesText(item.to, to);
}

export function getPriceLimit(items) {
  const highest = items.length ? Math.max(...items.map((item) => item.price)) : 50000;
  return Math.ceil(highest / 10000) * 10000;
}

export function filterAndSort(items, { service, criteria, maxPrice, minRating, sort }) {
  const list = items.filter(
    (item) =>
      item.price <= maxPrice &&
      matchesSearch(service, item, criteria) &&
      (!minRating || (item.rating || 0) >= minRating)
  );
  if (sort === "priceAsc") list.sort((a, b) => a.price - b.price);
  if (sort === "priceDesc") list.sort((a, b) => b.price - a.price);
  if (sort === "rating") list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  return list;
}

export function mapHomeSearch(saved) {
  const data = saved && typeof saved === "object" ? saved : {};
  return {
    from: data.from || data.pickup || "",
    to: data.to || data.drop || "",
    destination: data.destination || "",
    date: data.date || data.checkin || "",
    class: data.class || "",
  };
}
