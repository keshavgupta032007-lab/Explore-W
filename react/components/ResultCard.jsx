import { formatPrice } from "../utils/format.js";

function Route({ item }) {
  return (
    <div className="route">
      <div><b>{item.depart}</b><small>{item.from}</small></div>
      <div className="route-line" />
      <div><b>{item.arrive}</b><small>{item.to}</small></div>
    </div>
  );
}

export default function ResultCard({ service, item, onBook }) {
  const where = item.country ? ` • ${item.country}` : "";
  let title;
  let sub;
  let route;
  let details;

  if (service === "flights") {
    title = <>{item.name} <span className="tag">{item.stops}</span></>;
    sub = `${item.code}${where}`;
    route = <Route item={item} />;
    details = `${item.duration} • ${item.stops}`;
  } else if (service === "hotels") {
    title = item.name;
    sub = `${item.location} • ★ ${item.rating}${where}`;
    route = <div className="amenities">📍 {item.location}</div>;
    details = item.amenities;
  } else if (service === "trains") {
    title = <>{item.name} <span className="tag">{item.code}</span></>;
    sub = `${item.class} • ${item.from} → ${item.to}${where}`;
    route = <Route item={item} />;
    details = item.duration;
  } else if (service === "buses") {
    title = item.name;
    sub = `${item.type} • ★ ${item.rating}${where}`;
    route = <Route item={item} />;
    details = item.duration;
  } else {
    title = item.name;
    sub = `${item.capacity}${where}`;
    route = (
      <div className="route cab-route">
        <div><b>Pickup</b><small>{item.from}</small></div>
        <div className="route-line" />
        <div><b>Drop</b><small>{item.to}</small></div>
      </div>
    );
    details = `🚕 Estimated transfer time: ${item.time}`;
  }

  return (
    <article className="result-card">
      <div className="result-main">
        <h3>{title}</h3>
        <div className="meta">{sub}</div>
        {route}
        <div className="amenities">{details}</div>
      </div>
      <div className="price">
        <span className="meta">Starting from</span>
        <strong>{formatPrice(item.price)}</strong>
        <button type="button" className="btn book" onClick={() => onBook(item)}>Book Now</button>
      </div>
    </article>
  );
}
