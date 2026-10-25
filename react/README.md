# react/ - Explore-W React source

Everything React lives in this folder. The HTML pages in `../html` load the built bundle from `../react-dist`.

```
react/
  main.jsx        entry point: finds #react-... containers in the HTML and renders a page into each
  pages/          one component per website page. These own the state (useState / useEffect)
  components/     reusable UI pieces. They receive data and callbacks through props
  hooks/          custom hooks (useToast)
  data/           plain data: package list, per-service search settings
  utils/          plain JavaScript helpers (no React): filtering, booking rules, storage, formatting
  styles/         CSS for React-rendered UI (class names start with "ew-")
```

## Page -> mount point

| Page file | HTML page | Container id |
|---|---|---|
| `pages/FeaturedDestinations.jsx` | `index.html` | `react-featured` |
| `pages/PackageExplorer.jsx` | `packages.html` | `react-packages` |
| `pages/BookingPage.jsx` | `booking.html` | `react-booking` |
| `pages/ResultsPage.jsx` | `flights`, `hotels`, `trains`, `buses`, `cabs` | `react-results` + `data-service` |
| `pages/MyTripsPage.jsx` | `my-trips.html` | `react-trips` |
| `pages/ContactForm.jsx` | `contact.html` | `react-contact` |

## Import rules

- `pages/` import from `components/`, `hooks/`, `data/`, `utils/`.
- `components/` import from `utils/` (and from each other). They never import from `pages/`.
- `utils/` and `data/` import nothing from React.

## Commands (run from the project root, not from this folder)

```bash
npm run dev      # build + local server + auto reload
npm run build    # one-off build into react-dist/
npm run format   # Prettier on everything in react/
```
