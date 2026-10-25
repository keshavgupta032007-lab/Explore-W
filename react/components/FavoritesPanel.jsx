import { formatPrice } from "../utils/format.js";

export default function FavoritesPanel({ favorites, onRemove, onBook }) {
  return (
    <section className="ew-favorites" id="ew-favorites" aria-label="Your favorite packages">
      <h2>Your favorites</h2>

      {favorites.length === 0 ? (
        <p className="ew-favorites-empty">
          Nothing saved yet. Tap the ♡ on any package to keep it here.
        </p>
      ) : (
        <ul>
          {favorites.map((pkg) => (
            <li key={pkg.id}>
              <div>
                <strong>{pkg.name}</strong>
                <span>{pkg.duration} • {formatPrice(pkg.price)}</span>
              </div>
              <div className="ew-favorites-actions">
                <button type="button" className="ew-link-btn" onClick={() => onBook(pkg)}>Book</button>
                <button
                  type="button"
                  className="ew-link-btn ew-link-danger"
                  aria-label={`Remove ${pkg.name} from favorites`}
                  onClick={() => onRemove(pkg.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
