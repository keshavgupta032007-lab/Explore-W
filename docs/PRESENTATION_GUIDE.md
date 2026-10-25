# Explore-W - Presentation & Viva Guide

All code shown below is copied from the project files.

---

## A. Project overview

**Explore-W** is a multipage travel-booking website (demo). Visitors can search flights, hotels, trains, buses, cabs and holiday packages, book an option, and see their bookings under *My Trips*. There is also login/signup, dark mode and a responsive layout.

**Technologies**
- **HTML / CSS / JavaScript**: all pages, navigation, the other service pages, login, My Trips, theme switch. Shared design tokens (colours, fonts, radii) live in `css/theme.css`.
- **React 18** (functional components + hooks): three interactive parts.
- **Vite**: only used to bundle the React code into one file, `react-dist/explore-react.js`.
- **localStorage**: stores favorites, the selected trip and bookings (there is no backend).

## B. Why React was used (and why not everywhere)

React was added where the page needs **state that changes the UI many times** or **repeated UI built from data**:

| Part | Problem with plain JS | What React gives |
|---|---|---|
| Package cards + filters | `results.js` builds HTML strings and re-attaches click handlers after every render | UI is a function of state: change state, React updates only what changed |
| Favorites | Needs the heart, the counter and the list to stay in sync | One state array; every part reads it |
| Booking form | Total price, error messages and highlighted fields all depend on the same inputs | Controlled inputs + values calculated from state |

We did **not** convert the whole site because static pages (About, Contact, login, flights list) gain nothing from React; keeping them as HTML/CSS/JS means they load fast, need no build step and still work. React is mounted into three containers only.

## C. Component explanation

| Component | Responsibility | Why reusable |
|---|---|---|
| `DestinationCard` | Shows one package: image, theme, rating, location, highlights, price, favorite heart, action button | Used on the home page ("Explore") and the packages page ("Book now"). Button label and action come from props |
| `DestinationList` | Maps an array to cards; shows a "No results" message when empty | Any page that has an array of destinations can use it |
| `DestinationFilter` | Controlled search / region / style / sort / price form + "Clear filters" | Knows nothing about the data: receives values and reports changes |
| `FavoritesPanel` | Lists saved packages with Book / Remove | Receives already-resolved packages + callbacks |
| `PackageExplorer` | **Parent** of the packages page: owns filter + favorites state | Single place where state lives |
| `FeaturedDestinations` | Parent of the home grid | Reuses `DestinationList` |
| `BookingPage` | **Parent** of the booking page: form state, validation, saving | |
| `SelectedTrip`, `BookingForm`, `BookingSummary` | Presentational children of `BookingPage` | `BookingSummary` is a pure display of a `pricing` object |

## D. React concepts used (where to find each)

- **Functional components + JSX**: every file in `src/react-components/`.
- **Props**: `DestinationCard` gets `destination`, `isFavorite`, `onToggleFavorite`, `actionLabel`, `onAction`.
- **useState**: filters, favorites, panel open/closed (`PackageExplorer`); form values, touched fields, saved flag (`BookingPage`); `imageFailed` (`DestinationCard`).
- **Event handling**: `onChange`, `onBlur`, `onClick`, `onSubmit`.
- **Dynamic rendering**: `destinations.map(...)` with `key={destination.id}`; `filter()` and `sort()` in `utils/filterPackages.js`.
- **Conditional rendering**: empty-results message, "Clear filters" only when filters are active, rating only if present, image placeholder, favorites empty text, error messages, success panel, "No booking selected".
- **Component communication**: parent passes callbacks down (`onToggleFavorite`, `onChange`, `onReset`); children call them. Data flows down, events flow up.
- **Controlled components**: every input has `value={...}` and `onChange` (`DestinationFilter`, `BookingForm`).
- **useEffect** (only 4 uses, each with a real reason): sync favorites to localStorage; clear the one-time search hand-over from the home page; redirect to My Trips after a short delay (with cleanup `clearTimeout`).
- **Derived state**: errors and the price are *calculated* during render, not stored in extra state, so they can never be out of date.

## E. Code walkthrough

### 1. `src/main.jsx` - mounting React into existing pages
```jsx
const mountPoints = {
  "react-featured": FeaturedDestinations, // index.html
  "react-packages": PackageExplorer, //      packages.html
  "react-booking": BookingPage, //           booking.html
};

Object.entries(mountPoints).forEach(([elementId, Component]) => {
  const container = document.getElementById(elementId);
  if (container) {
    createRoot(container).render(<Component />);
  }
});
```
Pages that don't contain one of these ids (e.g. `flights.html`) are never touched.

### 2. `src/data/packages.js` - data separate from UI
```js
{
  id: "bali-tropical-escape",
  name: "Bali Tropical Escape",
  location: "Bali, Indonesia",
  region: "Asia",
  theme: "Beach",
  duration: "5 Nights / 6 Days",
  highlights: ["Resort", "Breakfast", "Temple Tour", "Transfers"],
  price: 52999,
  rating: 4.8,
  ...
}
```

### 3. `DestinationCard.jsx` - props + local state
```jsx
const [imageFailed, setImageFailed] = useState(false);
const showImage = destination.image && !imageFailed;
...
<button
  type="button"
  className={"ew-fav-btn" + (isFavorite ? " is-active" : "")}
  aria-pressed={isFavorite}
  onClick={() => onToggleFavorite(destination.id)}
>
  {isFavorite ? "♥" : "♡"}
</button>
```
The card does not decide what "favorite" means; it just tells its parent *which* card was clicked.

### 4. `DestinationList.jsx` - map() with keys and empty state
```jsx
if (destinations.length === 0) {
  return <div className="ew-empty" role="status">...</div>;
}
return (
  <div className="ew-grid">
    {destinations.map((destination) => (
      <DestinationCard key={destination.id} destination={destination}
        isFavorite={favoriteIds.includes(destination.id)} ... />
    ))}
  </div>
);
```

### 5. `utils/filterPackages.js` - logic outside the JSX
```js
const result = packages.filter(
  (pkg) =>
    matchesQuery(pkg, filters.query) &&
    (filters.region === "All" || pkg.region === filters.region) &&
    (filters.theme === "All" || pkg.theme === filters.theme) &&
    pkg.price <= maxPrice
);
if (filters.sort === "priceAsc") result.sort((a, b) => a.price - b.price);
```

### 6. `PackageExplorer.jsx` - the parent that owns state
```jsx
const [filters, setFilters] = useState(() => ({ ...DEFAULT_FILTERS, query: getInitialQuery() }));
const [favoriteIds, setFavoriteIds] = useState(loadFavorites);

useEffect(() => {
  saveFavorites(favoriteIds);      // runs after every change to favoriteIds
}, [favoriteIds]);

function handleFilterChange(name, value) {
  setFilters((current) => ({ ...current, [name]: value }));
}
function handleToggleFavorite(id) {
  setFavoriteIds((current) => toggleId(current, id));   // new array, never mutate
}
const visiblePackages = filterPackages(packages, filters, maxPackagePrice);
```

### 7. `BookingPage.jsx` - derived values + validation
```jsx
const errors = validateBooking(values, todayString());
const pricing = calculatePricing(service, item, values.guests, values.insurance);
const visibleErrors = {};
Object.keys(errors).forEach((field) => {
  if (submitAttempted || touched[field]) visibleErrors[field] = errors[field];
});
```
An error appears only after the user leaves a field (`onBlur`) or presses submit.

### 8. `BookingForm.jsx` - controlled inputs with accessibility
```jsx
const inputProps = (name) => ({
  id: `bk-${name}`, name,
  value: values[name], onChange, onBlur,
  "aria-invalid": visibleErrors[name] ? "true" : "false",
  "aria-describedby": visibleErrors[name] ? `bk-${name}-error` : undefined,
});
```

## F. Data flow

**Packages page**
```
src/data/packages.js
      |  import
PackageExplorer  (state: filters, favoriteIds)
      |-- filterPackages(packages, filters)  ->  visiblePackages
      |-- <DestinationFilter filters onChange onReset />        user types -> onChange -> setFilters
      |-- <DestinationList destinations={visiblePackages} />
      |        '-- <DestinationCard ... onToggleFavorite />      click heart -> setFavoriteIds
      '-- <FavoritesPanel favorites onRemove onBook />
useEffect: favoriteIds -> localStorage ("exploreW_favorites")
```
User action -> event handler -> `setState` -> React re-renders the component and its children -> only the changed DOM nodes are updated.

**Home -> Packages -> Booking**
1. Home: "Explore" on a card writes the destination to localStorage and opens `packages.html`.
2. Packages: the initial search text is read from localStorage (`getInitialQuery`), then cleared.
3. "Book now" writes `{ service, item }` to `exploreW_selectedItem` and opens `booking.html`.
4. Booking: `BookingPage` reads it. The old flight/hotel/train/bus/cab pages use the same key, so they work with the React booking page too.
5. Save: the booking is appended to `exploreW_bookings`; `my-trips.js` (plain JS) displays it.

## G. Integration with HTML / CSS / JS

- **HTML**: normal pages with an empty container where React renders.
- **CSS**: React styles are in one file, all classes prefixed `ew-`, and use the same CSS variables as the old CSS, so dark mode and fonts match. The booking form re-uses existing classes (`booking-card`, `field`, `summary-row`...).
- **JS**: old scripts keep working (`theme.js`, `init.js`, `my-trips.js`, `results.js` on 5 pages). A script and React never edit the same element. `localStorage` is the shared "contract" between the two worlds.
- **Build**: Vite builds a single classic script so the site still opens by double-clicking an HTML file.

## H. Viva questions and answers

**1. Why did you use React in only some parts of the website?**
Because only some parts have changing state or lists built from data: the package filter, favorites, and the booking form. Static pages gain nothing from React, so keeping them in HTML/CSS/JS keeps them simple and fast and avoids a rewrite.

**2. What is the virtual DOM?**
A lightweight JavaScript copy of the UI that React keeps in memory. When state changes React builds a new virtual tree, compares it with the previous one (diffing) and updates only the real DOM nodes that differ. Example: typing in the search box changes the list of cards, but the filter form and the header are not recreated.

**3. How is this different from traditional DOM manipulation (our old `results.js`)?**
In `results.js` we build an HTML string, assign it to `innerHTML` and then re-attach click handlers every time. That is *imperative*: we describe how to change the page. In React we describe what the UI should look like for the current state (*declarative*) and React updates the DOM. Because the screen is always a function of state, it is much harder for the heart icon, the counter and the list to get out of sync.

**4. What is a component? Why functional components?**
A component is a reusable function that returns JSX describing a piece of UI. Functional components are the modern standard; with hooks they can hold state without writing classes. Example: `DestinationCard`.

**5. What is JSX?**
Syntax that looks like HTML inside JavaScript. It is compiled to `React.createElement` calls (here by Vite). Differences: `className` instead of `class`, `htmlFor` instead of `for`, expressions in `{}`.

**6. Props vs state?**
Props are inputs passed from a parent and are read-only for the child (e.g. `destination`, `onToggleFavorite`). State is data owned by a component that can change over time and triggers a re-render (e.g. `filters` in `PackageExplorer`). `DestinationCard` has one tiny state (`imageFailed`); everything else arrives as props.

**7. What is a controlled component? Where do you use it?**
An input whose value is stored in React state: `value={filters.query}` and `onChange={...setFilters}`. React is the single source of truth, so we can validate, reset ("Clear filters" simply sets state back to defaults) and show the same value elsewhere. Used in `DestinationFilter` and `BookingForm`.

**8. Why do list items need `key`?**
Keys let React identify which item is which between renders, so it can reorder, add or remove the right DOM nodes without recreating all of them. We use `key={destination.id}`, a stable unique id. We avoid the array index because sorting and filtering change positions, which would attach state (like `imageFailed`) to the wrong card.

**9. What does `useEffect` do and where do you use it?**
It runs side effects after render, i.e. work outside rendering. We use it to save favorites to `localStorage` whenever `favoriteIds` changes (dependency array `[favoriteIds]`), to clear the one-time search hand-over (empty array = run once), and to redirect after saving a booking (with a cleanup that cancels the timer).

**10. Why do you copy arrays/objects instead of changing state directly?**
React decides to re-render by checking whether the state *reference* changed. `toggleId` returns a new array (`[...ids, id]` or `filter(...)`), and filters use `{ ...current, [name]: value }`. Mutating in place (e.g. `ids.push`) would not trigger a re-render and can cause bugs.

**11. How do child components change parent state?**
Through callbacks passed as props. `PackageExplorer` defines `handleToggleFavorite` and passes it down through `DestinationList` to `DestinationCard`; the card calls `onToggleFavorite(id)` and the parent runs `setFavoriteIds`. Data goes down, events go up.

**12. How do you make components reusable?**
They take everything variable through props and don't know where they are used. `DestinationCard` is used on the home page ("Explore") and the packages page ("Book now") just by passing a different `actionLabel` and `onAction`.

**13. How do React and the old JavaScript work together without conflicts?**
React only controls the content inside its mount point (`#react-packages`, etc.). The old scripts that touched those areas were removed from those pages. Anything else (theme toggle, header) stays with plain JS. They share information only through `localStorage` keys like `exploreW_selectedItem`.

**14. Why did you keep the list filtering in a separate file?**
`filterPackages` is a pure function (same input -> same output, no React). It keeps components short, is easy to read and explain, and can be tested without a browser.

**15. How is form validation done and why `noValidate`?**
`validateBooking(values, today)` returns an object of messages. It runs on every render (derived data, no extra state). Messages are shown only for fields the user touched or after pressing submit. `noValidate` turns off the browser's default pop-ups so we can show our own accessible messages (`role="alert"`, `aria-invalid`, `aria-describedby`).

**16. Why Vite and why a single bundled script?**
Browsers cannot run JSX directly, so a build step is required. Vite is a small, fast bundler. We configured an IIFE output because `<script type="module">` is blocked when HTML is opened from disk (`file://`), and this project is meant to work by double-clicking the pages.

**17. What are the limitations?**
No backend: bookings, favorites and users are in `localStorage` (per browser, not secure); no real payment or availability; sample prices and ratings. A real system needs a server, database, authentication and a payment gateway.
