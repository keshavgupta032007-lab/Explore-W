# Bug-fix log (Explore-W)

Every fix below is already saved in the project files.

## Fixed
| # | File | Problem | Fix |
|---|------|---------|-----|
| 1 | `css/theme.css` | `transition: background.35s` (missing space) made the whole declaration invalid, so the dark-mode colour fade never ran | Added the space |
| 2 | `javascript/init.js` | A second `DOMContentLoaded` listener reset every Login link back to "Login", so logged-in users could never reach the profile / log-out page | Merged into one listener: shows "Profile" when logged in |
| 3 | `javascript/results.js` | Search made on the home page was stored but never read, so flights/hotels/trains/buses/cabs always showed everything | Home search is now applied once (and pre-fills the search bar), then cleared |
| 4 | `javascript/login.js` | Password was copied into `exploreW_currentUser`; fragile one-line code | Password is no longer kept in the session record; empty-field check; safe JSON parsing |
| 5 | `javascript/signup.js` | Email check was case-sensitive (login is not), no trimming, no phone/password rules | Normalised email, phone + password-length validation, blocks the demo admin email |
| 6 | `javascript/profile.js` | Name/email were inserted into `innerHTML` unescaped (stored XSS via signup name) | HTML-escaped |
| 7 | `javascript/my-trips.js` | One click cancelled a booking; corrupt storage crashed the page | Confirm dialog + safe JSON parsing |
| 8 | `html/my-trips.html` | No menu button and no Trains/Buses/Cabs/Login links, so no navigation on phones | Full header + `nav.js` added |
| 9 | `html/booking.html` | Header lacked Trains/Buses/Cabs | Links added |
| 10 | flights / trains / cabs / hotels / buses `.html` | "Free cancellation", "Highly rated", "Instant booking" checkboxes did nothing; "Best rated" sort meant nothing for flights/trains/cabs | Removed the dead ones; hotels and buses have a working "Highly rated (4.5+)" filter; "Best rated" sort removed where there is no rating |
| 11 | `javascript/data.js` | Emirates "Dubai -> Australia" in 3h50m; "Akasha Air" / "Karnatak" typos; duplicate flight code AI-101 / 6E-202; IndiGo Delhi->Dubai at ₹89,999; Thai Airways Bangkok->London 4h20m; Singapore->Bali 5h45m | Corrected (prices for Emirates and IndiGo are demo values I chose; change if you like) |
| 12 | `javascript/script.js` | Past dates allowed; hotel check-out could be before check-in; One-way/Round-trip shown for hotels/cabs/packages | Min date = today, check-out validation, trip-type only for flights/trains/buses |
| 13 | `html/index.html` | Footer links pointed to `#` | Pointed to real pages |
| 14 | `src/utils/bookingRules.js` | Name validation rejected Hindi/Punjabi/accented names (combining marks) | Allows `\p{M}` (source and the built `react-dist/explore-react.js`, which was still the old regex) |
| 15 | `javascript/data.js` | Qatar Airways Dubai -> Paris listed as 4h 05m (about 7h in reality) | Now 10:20 -> 15:25, 7h 05m |
| 16 | `javascript/script.js` | Home-page train search offered Indian classes (Sleeper, AC 3 Tier...) that no train in the data has | Options now match the data: Any class, Standard, 2nd Class, 1st Class, Couchette |
| 17 | `javascript/init.js` | Logged-in users could still open the signup page | Redirects to home, same as the login page |
| 18 | `javascript/script.js` | Hotel check-out date picker allowed dates before the chosen check-in | Check-out minimum follows check-in |
| 19 | `src/react-components/BookingForm.jsx` + built `react-dist/explore-react.js` | Clicking "Save booking" right after leaving a field with an error did nothing the first time: the error message appeared on blur, moved the button, and the click missed | Button keeps focus in the field on mouse-down, so one click submits |
| 20 | `html/signup.html` | Signup page did not load `css/page.css`, so the card layout was missing (checked in dark mode and on mobile) | Added the `page.css` link before `auth.css` |
| 21 | `javascript/data.js` + `javascript/script.js` + `javascript/results.js` | Shinkansen class was "Ordinary", which is not in the train class dropdown; the class chosen on the home page was ignored; "1st Class" was offered but no train has it | Shinkansen is now "Standard"; the home-page class now filters train results; "1st Class" removed from the dropdown |
| 22 | `javascript/data.js` | Arrival times did not match departure + duration + time zone for AI-101 (Dubai -> Delhi), BA-142 (Delhi -> London) and QF-70 (Delhi -> Sydney) | Arrivals corrected to 12:45, 06:20 and 14:10 (local times) |
| 23 | `javascript/script.js` | Choosing "Round Trip" on the home search did nothing: there was no return date | A Return date field appears for round-trip flights, trains and buses; it is required and cannot be before the departure date |
| 24 | `html/about.html`, `html/contact.html`, `css/page.css` | About and Contact only had a small logo and a Home link, unlike every other page (design consistency, not a crash) | Both pages now use the same full header as the other pages: logo, Flights to My Trips, Login/Profile, dark-mode toggle and the mobile menu. `page.css` gets a small `has-nav` rule so the header sits flush at the top |

## Rebuild note
Fix 14 was also patched directly in `react-dist/explore-react.js`, so the site works without rebuilding. Running `npm install` and `npm run build` later is still safe and will regenerate the same result from `src/`.

## Known limitations (not changed)
- The return date is collected on the home search but results and booking do not use it yet, hotels have no nights/check-out in pricing, and the budget / traveller fields on the home search are not used by results.
- Swiss Alps and New York packages have no photo (`image: null`).
- Login/signup are demo only (plain-text passwords in localStorage).
- Privacy Policy / Terms pages do not exist.
