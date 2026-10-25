const DATE_FIELD = { name: "date", label: "Travel date", type: "date" };

export const SORT_LABELS = {
  priceAsc: "Cheapest first",
  priceDesc: "Highest price",
  rating: "Best rated",
};

export const SERVICE_CONFIG = {
  flights: {
    fields: [
      { name: "from", label: "From city", placeholder: "From city (e.g. Delhi)" },
      { name: "to", label: "To city", placeholder: "To city (e.g. Dubai)" },
      DATE_FIELD,
    ],
    priceStep: 1000,
    sorts: ["priceAsc", "priceDesc"],
    topRated: null,
  },
  hotels: {
    fields: [
      { name: "destination", label: "Destination", placeholder: "Dubai / Paris / Tokyo" },
      {
        name: "guests",
        label: "Guests and rooms",
        type: "select",
        options: [
          { value: "", label: "2 Guests, 1 Room" },
          { value: "1 Guest, 1 Room", label: "1 Guest, 1 Room" },
          { value: "3 Guests, 1 Room", label: "3 Guests, 1 Room" },
          { value: "4 Guests, 2 Rooms", label: "4 Guests, 2 Rooms" },
        ],
      },
      { ...DATE_FIELD, label: "Check-in date" },
    ],
    priceStep: 500,
    sorts: ["priceAsc", "priceDesc", "rating"],
    topRated: { min: 4.7, label: "Highly rated (4.7+)" },
  },
  trains: {
    fields: [
      { name: "from", label: "From", placeholder: "London / Paris / Tokyo" },
      { name: "to", label: "To", placeholder: "Paris / Zurich / Kyoto" },
      DATE_FIELD,
    ],
    priceStep: 500,
    sorts: ["priceAsc", "priceDesc"],
    topRated: null,
  },
  buses: {
    fields: [
      { name: "from", label: "From", placeholder: "Paris / Dubai / Singapore" },
      { name: "to", label: "To", placeholder: "Amsterdam / Abu Dhabi / Kuala Lumpur" },
      DATE_FIELD,
    ],
    priceStep: 500,
    sorts: ["priceAsc", "priceDesc", "rating"],
    topRated: { min: 4.5, label: "Highly rated (4.5+)" },
  },
  cabs: {
    fields: [
      { name: "from", label: "Pickup", placeholder: "Airport / pickup city" },
      { name: "to", label: "Drop", placeholder: "Hotel / destination" },
      DATE_FIELD,
    ],
    priceStep: 500,
    sorts: ["priceAsc", "priceDesc"],
    topRated: null,
  },
};
