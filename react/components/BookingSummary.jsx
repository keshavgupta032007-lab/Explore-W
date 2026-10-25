import { formatPrice } from "../utils/format.js";
import { SERVICE_META, getRoute, INSURANCE_PER_TRAVELLER } from "../utils/bookingRules.js";

export default function BookingSummary({ service, item, pricing, withInsurance }) {
  const meta = SERVICE_META[service] || SERVICE_META.packages;

  return (
    <aside className="booking-summary" aria-label="Booking summary">
      <div className="summary-top">
        <span className="summary-chip">Your booking</span>
        <h3>Price summary</h3>
      </div>

      <div className="summary-selection">
        <strong>{item.name || `${meta.label} option`}</strong>
        <span>{getRoute(item, service)}</span>
      </div>

      <div className="summary-row">
        <span>
          {pricing.perTraveller
            ? `Base fare (${formatPrice(pricing.unitPrice)} × ${pricing.multiplier})`
            : "Base fare (per booking)"}
        </span>
        <strong>{formatPrice(pricing.baseTotal)}</strong>
      </div>

      {withInsurance && (
        <div className="summary-row">
          <span>Travel insurance ({formatPrice(INSURANCE_PER_TRAVELLER)} × {pricing.travellers})</span>
          <strong>{formatPrice(pricing.insuranceTotal)}</strong>
        </div>
      )}

      <div className="summary-row">
        <span>Taxes &amp; fees</span>
        <strong>Included</strong>
      </div>

      <div className="summary-divider" />
      <div className="summary-total">
        <span>Total</span>
        <strong>{formatPrice(pricing.total)}</strong>
      </div>

      <p className="summary-note">
        Demo site: no payment is taken and nothing is sent to an airline or hotel. Your booking is only
        saved in this browser.
      </p>
    </aside>
  );
}
