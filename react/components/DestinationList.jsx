import DestinationCard from "./DestinationCard.jsx";

export default function DestinationList({
  destinations,
  favoriteIds,
  onToggleFavorite,
  actionLabel,
  onAction,
  emptyMessage = "No packages match your search.",
}) {
  if (destinations.length === 0) {
    return (
      <div className="ew-empty" role="status">
        <strong>No results</strong>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="ew-grid">
      {destinations.map((destination) => (
        <DestinationCard
          key={destination.id}
          destination={destination}
          isFavorite={favoriteIds.includes(destination.id)}
          onToggleFavorite={onToggleFavorite}
          actionLabel={actionLabel}
          onAction={onAction}
        />
      ))}
    </div>
  );
}
