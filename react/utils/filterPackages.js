export const DEFAULT_FILTERS = {
  query: "",
  region: "All",
  theme: "All",
  maxPrice: null,
  sort: "priceAsc",
};

function matchesQuery(pkg, query) {
  const text = query.trim().toLowerCase();
  if (!text) return true;
  const haystack = [pkg.name, pkg.location, pkg.country, pkg.theme, ...pkg.highlights]
    .join(" ")
    .toLowerCase();
  return haystack.includes(text);
}

export function filterPackages(packages, filters, priceLimit) {
  const maxPrice = filters.maxPrice ?? priceLimit;

  const result = packages.filter(
    (pkg) =>
      matchesQuery(pkg, filters.query) &&
      (filters.region === "All" || pkg.region === filters.region) &&
      (filters.theme === "All" || pkg.theme === filters.theme) &&
      pkg.price <= maxPrice
  );

  if (filters.sort === "priceAsc") result.sort((a, b) => a.price - b.price);
  if (filters.sort === "priceDesc") result.sort((a, b) => b.price - a.price);
  if (filters.sort === "rating") result.sort((a, b) => b.rating - a.rating);
  return result;
}

export function hasActiveFilters(filters) {
  return (
    filters.query.trim() !== "" ||
    filters.region !== "All" ||
    filters.theme !== "All" ||
    filters.maxPrice !== null
  );
}
