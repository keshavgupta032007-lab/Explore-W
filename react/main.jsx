import { createRoot } from "react-dom/client";
import "./styles/react-components.css";
import "./styles/react-pages.css";
import FeaturedDestinations from "./pages/FeaturedDestinations.jsx";
import PackageExplorer from "./pages/PackageExplorer.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import ResultsPage from "./pages/ResultsPage.jsx";
import MyTripsPage from "./pages/MyTripsPage.jsx";
import ContactForm from "./pages/ContactForm.jsx";

const mountPoints = {
  "react-featured": FeaturedDestinations,
  "react-packages": PackageExplorer,
  "react-booking": BookingPage,
  "react-results": ResultsPage,
  "react-trips": MyTripsPage,
  "react-contact": ContactForm,
};

Object.entries(mountPoints).forEach(([elementId, Page]) => {
  const container = document.getElementById(elementId);
  if (container) {
    createRoot(container).render(<Page service={container.dataset.service} />);
  }
});
