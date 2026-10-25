import { useEffect, useState } from "react";
import { packages } from "../data/packages.js";
import { loadFavorites, saveFavorites, toggleId, writeJSON, writeString } from "../utils/storage.js";
import DestinationList from "../components/DestinationList.jsx";

export default function FeaturedDestinations() {
  const [favoriteIds, setFavoriteIds] = useState(loadFavorites);

  useEffect(() => {
    saveFavorites(favoriteIds);
  }, [favoriteIds]);

  function handleExplore(destination) {
    writeJSON("exploreW_searchData", { destination: destination.name });
    writeString("exploreW_service", "packages");
    window.location.href = "packages.html";
  }

  const featured = packages.filter((pkg) => pkg.featured);

  return (
    <div className="ew-react">
      <p className="ew-saved-count" aria-live="polite">
        {favoriteIds.length > 0
          ? `♥ ${favoriteIds.length} saved - view them on the packages page`
          : "Tap ♡ on a destination to save it for later"}
      </p>
      <DestinationList
        destinations={featured}
        favoriteIds={favoriteIds}
        onToggleFavorite={(id) => setFavoriteIds((current) => toggleId(current, id))}
        actionLabel="Explore"
        onAction={handleExplore}
      />
    </div>
  );
}
