import { useState } from "react";
import { formatPrice } from "../utils/format.js";

export default function DestinationCard({
  destination,
  isFavorite,
  onToggleFavorite,
  actionLabel = "Book now",
  onAction,
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = destination.image && !imageFailed;

  return (
    <article className="ew-card">
      <div className="ew-card-media">
        {showImage ? (
          <img
            src={destination.image}
            alt={`${destination.name} - ${destination.location}`}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="ew-card-placeholder" role="img" aria-label={`${destination.location} (photo coming soon)`}>
            <span>{destination.country}</span>
          </div>
        )}

        <span className="ew-card-theme">{destination.theme}</span>

        <button
          type="button"
          className={"ew-fav-btn" + (isFavorite ? " is-active" : "")}
          aria-pressed={isFavorite}
          aria-label={
            isFavorite
              ? `Remove ${destination.name} from favorites`
              : `Add ${destination.name} to favorites`
          }
          onClick={() => onToggleFavorite(destination.id)}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="ew-card-body">
        <div className="ew-card-title-row">
          <h3>{destination.name}</h3>
          {destination.rating ? (
            <span className="ew-rating" title="Sample rating">★ {destination.rating.toFixed(1)}</span>
          ) : null}
        </div>

        <p className="ew-card-location">📍 {destination.location}</p>
        <p className="ew-card-duration">{destination.duration}</p>

        <ul className="ew-chips" aria-label="Package highlights">
          {destination.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="ew-card-footer">
          <div>
            <span className="ew-price-label">Starting from</span>
            <strong className="ew-price">{formatPrice(destination.price)}</strong>
          </div>
          <button type="button" className="btn" onClick={() => onAction(destination)}>
            {actionLabel}
          </button>
        </div>
      </div>
    </article>
  );
}
