import { useEffect, useState } from "react";
import { packages, regions, themes, maxPackagePrice } from "../data/packages.js";
import { DEFAULT_FILTERS, filterPackages, hasActiveFilters } from "../utils/filterPackages.js";
import { loadFavorites, saveFavorites, toggleId, selectForBooking, readJSON, readString, removeKey } from "../utils/storage.js";
import DestinationFilter from "../components/DestinationFilter.jsx";
import DestinationList from "../components/DestinationList.jsx";
import FavoritesPanel from "../components/FavoritesPanel.jsx";

function getInitialQuery() {
  const service = readString("exploreW_service");
  const saved = readJSON("exploreW_searchData", {});
  return service === "packages" && saved.destination ? String(saved.destination) : "";
}

export default function PackageExplorer() {
  const [filters, setFilters] = useState(() => ({ ...DEFAULT_FILTERS, query: getInitialQuery() }));
  const [favoriteIds, setFavoriteIds] = useState(loadFavorites);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    saveFavorites(favoriteIds);
  }, [favoriteIds]);

  useEffect(() => {
    removeKey("exploreW_searchData");
    removeKey("exploreW_service");
  }, []);

  function handleFilterChange(name, value) {
    const nextValue = name === "maxPrice" && value >= maxPackagePrice ? null : value;
    setFilters((current) => ({ ...current, [name]: nextValue }));
  }

  function handleToggleFavorite(id) {
    setFavoriteIds((current) => toggleId(current, id));
  }

  const visiblePackages = filterPackages(packages, filters, maxPackagePrice);
  const favoritePackages = favoriteIds
    .map((id) => packages.find((pkg) => pkg.id === id))
    .filter(Boolean);

  return (
    <div className="ew-react ew-explorer">
      <DestinationFilter
        filters={filters}
        regions={regions}
        themes={themes}
        priceLimit={maxPackagePrice}
        canReset={hasActiveFilters(filters)}
        onChange={handleFilterChange}
        onReset={() => setFilters(DEFAULT_FILTERS)}
      />

      <div className="ew-results-bar">
        <strong aria-live="polite">
          {visiblePackages.length} of {packages.length} packages
        </strong>
        <button
          type="button"
          className={"ew-fav-toggle" + (showFavorites ? " is-open" : "")}
          aria-expanded={showFavorites}
          aria-controls="ew-favorites"
          onClick={() => setShowFavorites((open) => !open)}
        >
          ♥ Favorites ({favoritePackages.length})
        </button>
      </div>

      {showFavorites && (
        <FavoritesPanel
          favorites={favoritePackages}
          onRemove={handleToggleFavorite}
          onBook={selectForBooking}
        />
      )}

      <DestinationList
        destinations={visiblePackages}
        favoriteIds={favoriteIds}
        onToggleFavorite={handleToggleFavorite}
        actionLabel="Book now"
        onAction={selectForBooking}
        emptyMessage="Try a different destination, region or a higher maximum price, or clear the filters."
      />
    </div>
  );
}
