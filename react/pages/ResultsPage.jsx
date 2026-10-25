import { useEffect, useMemo, useState } from "react";
import { SERVICE_CONFIG, SORT_LABELS } from "../data/serviceConfig.js";
import { filterAndSort, getPriceLimit, mapHomeSearch } from "../utils/filterResults.js";
import { formatPrice } from "../utils/format.js";
import { readJSON, readString, removeKey, selectForBooking } from "../utils/storage.js";
import ResultCard from "../components/ResultCard.jsx";
import Toast from "../components/Toast.jsx";
import { useToast } from "../hooks/useToast.js";

function readHomeSearch(service) {
  if (readString("exploreW_service") !== service) return null;
  return mapHomeSearch(readJSON("exploreW_searchData", {}));
}

function initialFormValues(config, homeSearch) {
  const values = {};
  config.fields.forEach((field) => {
    values[field.name] = homeSearch && homeSearch[field.name] ? homeSearch[field.name] : "";
  });
  return values;
}

function ResultsView({ service, config }) {
  const items = useMemo(() => (window.travelData && window.travelData[service]) || [], [service]);
  const priceLimit = useMemo(() => getPriceLimit(items), [items]);

  const [homeSearch] = useState(() => readHomeSearch(service));
  const [form, setForm] = useState(() => initialFormValues(config, homeSearch));
  const [criteria, setCriteria] = useState(() => homeSearch || {});
  const [maxPrice, setMaxPrice] = useState(priceLimit);
  const [onlyTopRated, setOnlyTopRated] = useState(false);
  const [sort, setSort] = useState("priceAsc");
  const { message, visible, showToast } = useToast(1800);

  useEffect(() => {
    if (homeSearch) {
      removeKey("exploreW_searchData");
      removeKey("exploreW_service");
    }
  }, [homeSearch]);

  function handleFieldChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSearch(event) {
    event.preventDefault();
    setCriteria({ ...form });
    showToast("International search updated");
  }

  const visibleItems = filterAndSort(items, {
    service,
    criteria,
    maxPrice,
    minRating: onlyTopRated && config.topRated ? config.topRated.min : 0,
    sort,
  });

  return (
    <>
      <form className="search-bar" onSubmit={handleSearch}>
        <div className="search-row">
          {config.fields.map((field) =>
            field.type === "select" ? (
              <select
                key={field.name}
                name={field.name}
                aria-label={field.label}
                value={form[field.name]}
                onChange={handleFieldChange}
              >
                {field.options.map((option) => (
                  <option key={option.label} value={option.value}>{option.label}</option>
                ))}
              </select>
            ) : (
              <input
                key={field.name}
                name={field.name}
                type={field.type || "text"}
                aria-label={field.label}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleFieldChange}
              />
            )
          )}
          <button className="btn" type="submit">Search</button>
        </div>
      </form>

      <div className="layout">
        <aside className="filters">
          <h3>Filters</h3>
          <label htmlFor="maxPrice">
            Maximum price: <b>{formatPrice(maxPrice)}</b>
          </label>
          <input
            id="maxPrice"
            type="range"
            min="0"
            max={priceLimit}
            step={config.priceStep}
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
          />
          {config.topRated && (
            <label>
              <input
                type="checkbox"
                checked={onlyTopRated}
                onChange={(event) => setOnlyTopRated(event.target.checked)}
              />
              {config.topRated.label}
            </label>
          )}
        </aside>

        <section>
          <div className="results-head">
            <strong aria-live="polite">
              {visibleItems.length} {visibleItems.length === 1 ? "option" : "options"}
            </strong>
            <select aria-label="Sort results" value={sort} onChange={(event) => setSort(event.target.value)}>
              {config.sorts.map((key) => (
                <option key={key} value={key}>{SORT_LABELS[key]}</option>
              ))}
            </select>
          </div>

          <div>
            {visibleItems.length ? (
              visibleItems.map((item) => (
                <ResultCard
                  key={items.indexOf(item)}
                  service={service}
                  item={item}
                  onBook={(chosen) => selectForBooking(chosen, service)}
                />
              ))
            ) : (
              <div className="empty">
                No exact match found. Try another international city or clear the search fields.
              </div>
            )}
          </div>
        </section>
      </div>

      <Toast message={message} visible={visible} />
    </>
  );
}

export default function ResultsPage({ service }) {
  const config = SERVICE_CONFIG[service];
  if (!config) {
    return <div className="empty">This page needs data-service set to flights, hotels, trains, buses or cabs.</div>;
  }
  return <ResultsView service={service} config={config} />;
}
