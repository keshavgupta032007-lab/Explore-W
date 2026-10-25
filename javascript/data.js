window.travelData = {
    flights: [
        { name: "Air India", code: "AI-101", from: "Dubai", to: "Delhi", depart: "08:00", arrive: "12:45", duration: "3h 15m", stops: "Non-stop", price: 35999, country: "India" },
        { name: "IndiGo", code: "6E-202", from: "Delhi", to: "Bengaluru", depart: "09:30", arrive: "11:40", duration: "2h 10m", stops: "Non-stop", price: 8999, country: "India" },
        { name: "Emirates", code: "EK-412", from: "Dubai", to: "Sydney", depart: "10:35", arrive: "07:25", duration: "13h 50m", stops: "Non-stop", price: 62999, country: "UAE" },
        { name: "Singapore Airlines", code: "SQ-403", from: "Singapore", to: "Bali", depart: "21:55", arrive: "00:40", duration: "2h 45m", stops: "Non-stop", price: 28999, country: "Singapore" },
        { name: "British Airways", code: "BA-142", from: "Delhi", to: "London", depart: "01:35", arrive: "06:20", duration: "9h 15m", stops: "Non-stop", price: 57999, country: "United Kingdom" },
        { name: "Air France", code: "AF-225", from: "Delhi", to: "Paris", depart: "00:35", arrive: "06:55", duration: "9h 50m", stops: "Non-stop", price: 61999, country: "France" },
        { name: "Lufthansa", code: "LH-761", from: "Delhi", to: "Frankfurt", depart: "02:50", arrive: "08:15", duration: "8h 55m", stops: "Non-stop", price: 55999, country: "Germany" },
        { name: "Qatar Airways", code: "QR-571", from: "Dubai", to: "Paris", depart: "10:20", arrive: "15:25", duration: "7h 05m", stops: "Non-stop", price: 23999, country: "Qatar" },
        { name: "Akasa Air", code: "QP-1301", from: "Chandigarh", to: "Bengaluru", depart: "08:00", arrive: "11:05", duration: "3h 05m", stops: "Non-stop", price: 5499, country: "India" },
        { name: "Thai Airways", code: "TG-332", from: "Bangkok", to: "London", depart: "03:20", arrive: "09:10", duration: "11h 50m", stops: "Non-stop", price: 21999, country: "Thailand" },
        { name: "ANA", code: "NH-838", from: "Delhi", to: "Tokyo", depart: "18:00", arrive: "05:55", duration: "8h 25m", stops: "Non-stop", price: 48999, country: "Japan" },
        { name: "United Airlines", code: "UA-83", from: "Delhi", to: "New York", depart: "23:35", arrive: "06:10", duration: "16h 05m", stops: "Non-stop", price: 78999, country: "USA" },
        { name: "Qantas", code: "QF-70", from: "Delhi", to: "Sydney", depart: "19:55", arrive: "14:10", duration: "12h 45m", stops: "1 stop", price: 69999, country: "Australia" },
        { name: "IndiGo", code: "6E-1463", from: "Delhi", to: "Dubai", depart: "09:30", arrive: "12:00", duration: "3h 30m", stops: "Non-stop", price: 24999, country: "India" }
    ],
    hotels: [
        { name: "Atlantis The Palm", location: "Dubai, UAE", rating: 4.8, amenities: "Private Beach • Pool • Wi-Fi • Breakfast", price: 78999, country: "UAE" },
        { name: "Paris City Boutique", location: "Paris, France", rating: 4.6, amenities: "Breakfast • Wi-Fi • Metro Access", price: 51999, country: "France" },
        { name: "Marina Bay Stay", location: "Singapore", rating: 4.7, amenities: "Sky Pool • Wi-Fi • Gym • Breakfast", price: 64999, country: "Singapore" },
        { name: "Central London Hotel", location: "London, UK", rating: 4.5, amenities: "Breakfast • Wi-Fi • City Centre", price: 83999, country: "United Kingdom" },
        { name: "Tokyo Shinjuku Hotel", location: "Tokyo, Japan", rating: 4.7, amenities: "Wi-Fi • Breakfast • Station Access", price: 48999, country: "Japan" },
        { name: "Bali Ocean Resort", location: "Bali, Indonesia", rating: 4.8, amenities: "Pool • Spa • Breakfast • Beach", price: 54999, country: "Indonesia" },
        { name: "Manhattan City Hotel", location: "New York, USA", rating: 4.5, amenities: "Wi-Fi • Gym • Central Location", price: 97999, country: "USA" },
        { name: "Sydney Harbour Stay", location: "Sydney, Australia", rating: 4.6, amenities: "Harbour View • Wi-Fi • Breakfast", price: 82999, country: "Australia" },
        { name: "Bangkok Riverside Hotel", location: "Bangkok, Thailand", rating: 4.6, amenities: "Pool • Breakfast • Wi-Fi • River View", price: 60999, country: "Thailand" },
        { name: "Swiss Alpine Hotel", location: "Interlaken, Switzerland", rating: 4.7, amenities: "Mountain View • Breakfast • Wi-Fi", price: 95999, country: "Switzerland" }
    ],
    trains: [
        { name: "Eurostar", code: "ES-901", from: "London", to: "Paris", depart: "08:01", arrive: "11:20", duration: "2h 19m", class: "Standard", price: 8999, country: "UK / France" },
        { name: "Eurostar", code: "ES-915", from: "Paris", to: "Amsterdam", depart: "09:22", arrive: "12:44", duration: "3h 22m", class: "Standard", price: 7499, country: "France / Netherlands" },
        { name: "TGV Lyria", code: "TGV-9213", from: "Paris", to: "Zurich", depart: "10:22", arrive: "14:26", duration: "4h 04m", class: "2nd Class", price: 8299, country: "France / Switzerland" },
        { name: "ICE", code: "ICE-1005", from: "Berlin", to: "Frankfurt", depart: "07:58", arrive: "11:59", duration: "4h 01m", class: "2nd Class", price: 5999, country: "Germany" },
        { name: "ÖBB Nightjet", code: "NJ-40233", from: "Vienna", to: "Rome", depart: "19:18", arrive: "09:10", duration: "13h 52m", class: "Couchette", price: 9999, country: "Austria / Italy" },
        { name: "Shinkansen Nozomi", code: "N-215", from: "Tokyo", to: "Kyoto", depart: "09:00", arrive: "11:15", duration: "2h 15m", class: "Standard", price: 8499, country: "Japan" },
        { name: "SBB InterCity", code: "IC-81", from: "Zurich", to: "Interlaken", depart: "08:02", arrive: "09:58", duration: "1h 56m", class: "2nd Class", price: 4299, country: "Switzerland" },
        { name: "Frecciarossa", code: "FR-9519", from: "Rome", to: "Florence", depart: "10:10", arrive: "11:46", duration: "1h 36m", class: "Standard", price: 3999, country: "Italy" }
    ],
    buses: [
        { name: "FlixBus", type: "AC Coach", from: "Paris", to: "Amsterdam", depart: "07:30", arrive: "14:20", duration: "6h 50m", rating: 4.4, price: 3299, country: "France / Netherlands" },
        { name: "FlixBus", type: "AC Coach", from: "Berlin", to: "Prague", depart: "08:00", arrive: "12:35", duration: "4h 35m", rating: 4.5, price: 2499, country: "Germany / Czechia" },
        { name: "RegioJet", type: "Business Coach", from: "Vienna", to: "Budapest", depart: "09:15", arrive: "12:10", duration: "2h 55m", rating: 4.6, price: 2199, country: "Austria / Hungary" },
        { name: "Aeroline", type: "Luxury Coach", from: "Singapore", to: "Kuala Lumpur", depart: "08:30", arrive: "14:00", duration: "5h 30m", rating: 4.6, price: 2699, country: "Singapore / Malaysia" },
        { name: "Bell Travel", type: "AC Coach", from: "Bangkok", to: "Pattaya", depart: "10:00", arrive: "12:30", duration: "2h 30m", rating: 4.4, price: 1099, country: "Thailand" },
        { name: "Intercity UAE", type: "AC Coach", from: "Dubai", to: "Abu Dhabi", depart: "09:00", arrive: "11:15", duration: "2h 15m", rating: 4.5, price: 1299, country: "UAE" },
        { name: "National Express", type: "Executive Coach", from: "London", to: "Manchester", depart: "07:00", arrive: "11:45", duration: "4h 45m", rating: 4.4, price: 2999, country: "United Kingdom" },
        { name: "Greyhound", type: "Express Coach", from: "New York", to: "Washington DC", depart: "08:00", arrive: "12:35", duration: "4h 35m", rating: 4.2, price: 3499, country: "USA" }
    ],
    cabs: [
        { name: "Dubai Airport Transfer", capacity: "4 passengers", from: "Dubai International Airport", to: "Downtown Dubai", country: "UAE", price: 2499, time: "25 min" },
        { name: "London Airport Sedan", capacity: "4 passengers", from: "Heathrow Airport", to: "Central London", country: "United Kingdom", price: 6999, time: "50 min" },
        { name: "Paris City Transfer", capacity: "4 passengers", from: "Charles de Gaulle Airport", to: "Central Paris", country: "France", price: 5499, time: "45 min" },
        { name: "Singapore Airport Cab", capacity: "4 passengers", from: "Changi Airport", to: "Marina Bay", country: "Singapore", price: 2199, time: "25 min" },
        { name: "Bangkok Airport Cab", capacity: "4 passengers", from: "Suvarnabhumi Airport", to: "Sukhumvit", country: "Thailand", price: 1799, time: "35 min" },
        { name: "Tokyo Airport Transfer", capacity: "4 passengers", from: "Haneda Airport", to: "Shinjuku", country: "Japan", price: 7499, time: "40 min" },
        { name: "New York Airport SUV", capacity: "6 passengers", from: "JFK Airport", to: "Manhattan", country: "USA", price: 8999, time: "55 min" },
        { name: "Sydney Airport Sedan", capacity: "4 passengers", from: "Sydney Airport", to: "Circular Quay", country: "Australia", price: 4599, time: "30 min" }
    ]
};
