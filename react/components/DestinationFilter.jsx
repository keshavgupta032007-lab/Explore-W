import { formatPrice } from "../utils/format.js";

export default function DestinationFilter({
  filters,
  regions,
  themes,
  priceLimit,
  canReset,
  onChange,
  onReset,
}) {
  const currentMax = filters.maxPrice ?? priceLimit;

  return (
    <form className="ew-filter" role="search" aria-label="Filter packages" onSubmit={(e) => e.preventDefault()}>
      <div className="ew-filter-row">
        <div className="ew-field ew-field-search">
          <label htmlFor="ew-search">Search destination</label>
          <input
            id="ew-search"
            type="search"
            placeholder="e.g. Paris, Bali, safari"
            value={filters.query}
            onChange={(e) => onChange("query", e.target.value)}
          />
        </div>

        <div className="ew-field">
          <label htmlFor="ew-region">Region</label>
          <select id="ew-region" value={filters.region} onChange={(e) => onChange("region", e.target.value)}>
            <option value="All">All regions</option>
            {regions.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        <div className="ew-field">
          <label htmlFor="ew-theme">Trip style</label>
          <select id="ew-theme" value={filters.theme} onChange={(e) => onChange("theme", e.target.value)}>
            <option value="All">All styles</option>
            {themes.map((theme) => (
              <option key={theme} value={theme}>{theme}</option>
            ))}
          </select>
        </div>

        <div className="ew-field">
          <label htmlFor="ew-sort">Sort by</label>
          <select id="ew-sort" value={filters.sort} onChange={(e) => onChange("sort", e.target.value)}>
            <option value="priceAsc">Price: low to high</option>
            <option value="priceDesc">Price: high to low</option>
            <option value="rating">Best rated</option>
          </select>
        </div>
      </div>

      <div className="ew-filter-row ew-filter-row-bottom">
        <div className="ew-field ew-field-range">
          <label htmlFor="ew-price">
            Maximum price: <b>{formatPrice(currentMax)}</b>
          </label>
          <input
            id="ew-price"
            type="range"
            min="10000"
            max={priceLimit}
            step="5000"
            value={currentMax}
            onChange={(e) => onChange("maxPrice", Number(e.target.value))}
          />
        </div>

        {canReset && (
          <button type="button" className="ghost-btn" onClick={onReset}>
            Clear filters
          </button>
        )}
      </div>
    </form>
  );
}
