import { SERVICE_META, getDetailLine } from "../utils/bookingRules.js";

export default function SelectedTrip({ service, item }) {
  const meta = SERVICE_META[service] || SERVICE_META.packages;
  return (
    <div className="selected-trip">
      <div className="selected-trip-icon" aria-hidden="true">{meta.icon}</div>
      <div className="selected-trip-copy">
        <span className="selection-label">Selected {meta.label}</span>
        <h2>{item.name || `${meta.label} booking`}</h2>
        <p className="meta">{getDetailLine(item, service)}</p>
      </div>
    </div>
  );
}
