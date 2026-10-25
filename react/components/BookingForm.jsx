import { MAX_TRAVELLERS, INSURANCE_PER_TRAVELLER, todayString } from "../utils/bookingRules.js";
import { formatPrice } from "../utils/format.js";

function Field({ id, label, error, wide, children }) {
  return (
    <div className={"field" + (wide ? " field-wide" : "")}>
      <label htmlFor={id}><span>{label}</span></label>
      {children}
      {error && (
        <p className="ew-error" id={`${id}-error`} role="alert">{error}</p>
      )}
    </div>
  );
}

export default function BookingForm({ values, errors, visibleErrors, saving, backHref, onChange, onBlur, onSubmit }) {
  const inputProps = (name) => ({
    id: `bk-${name}`,
    name,
    value: values[name],
    onChange,
    onBlur,
    "aria-invalid": visibleErrors[name] ? "true" : "false",
    "aria-describedby": visibleErrors[name] ? `bk-${name}-error` : undefined,
  });

  return (
    <form className="booking-form" noValidate onSubmit={onSubmit}>
      <div className="form-section-heading">
        <div>
          <span>01</span>
          <div>
            <h3>Traveller details</h3>
            <p>Use the details of the primary traveller.</p>
          </div>
        </div>
      </div>

      <div className="booking-grid">
        <Field id="bk-name" label="Full name" error={visibleErrors.name} wide>
          <input {...inputProps("name")} autoComplete="name" placeholder="Enter full name" />
        </Field>

        <Field id="bk-phone" label="Phone number" error={visibleErrors.phone}>
          <input {...inputProps("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="e.g. 98765 43210" />
        </Field>

        <Field id="bk-email" label="Email address" error={visibleErrors.email}>
          <input {...inputProps("email")} type="email" autoComplete="email" placeholder="you@example.com" />
        </Field>

        <Field id="bk-date" label="Travel date" error={visibleErrors.date}>
          <input {...inputProps("date")} type="date" min={todayString()} />
        </Field>

        <Field id="bk-guests" label="Travellers" error={visibleErrors.guests}>
          <select {...inputProps("guests")}>
            {Array.from({ length: MAX_TRAVELLERS }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? "traveller" : "travellers"}</option>
            ))}
          </select>
        </Field>

        <label className="ew-addon field-wide" htmlFor="bk-insurance">
          <input
            id="bk-insurance"
            name="insurance"
            type="checkbox"
            checked={values.insurance}
            onChange={onChange}
          />
          <span>
            <strong>Add travel insurance</strong>
            <small>{formatPrice(INSURANCE_PER_TRAVELLER)} per traveller (demo add-on)</small>
          </span>
        </label>

        <Field id="bk-requests" label="Special requests (optional)" wide>
          <textarea
            {...inputProps("requests")}
            rows="4"
            placeholder="Meals, accessibility, pickup notes or anything else we should know"
          />
        </Field>
      </div>

      {Object.keys(visibleErrors).length > 0 && (
        <p className="ew-form-alert" role="alert">
          Please fix the highlighted fields before saving.
        </p>
      )}

      <div className="booking-actions">
        <a className="ghost-btn" href={backHref}>← Change selection</a>
        <button className="btn confirm-btn" type="submit" disabled={saving} onMouseDown={(e) => e.preventDefault()}>
          {saving ? "Saving…" : "Save booking"} <span>→</span>
        </button>
      </div>
    </form>
  );
}
