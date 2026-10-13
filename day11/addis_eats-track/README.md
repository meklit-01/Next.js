# Addis Eats

Next.js App Router mini-project covering live data, authentication, performance, and findability.

## Setup

```bash
npm install
```

Copy `.env.example` to `.env.local` and set:

```env
NEXT_PUBLIC_SITE_URL=https://your-production-domain.example
SESSION_SECRET=use-a-long-random-secret
```

Start development:

```bash
npm run dev
```

For the performance measurement:

```bash
npm run build
npm run start
```

## Demo accounts

- `alice` — normal user
- `bob` — different normal user
- `staff` — staff-only kitchen access

## Live-data network behavior

The search box waits 500 ms after typing stops before changing its SWR key. Therefore typing five characters does not fire five search requests; it produces one request after the debounce period.

An empty search uses a `null` SWR key, so it does not request `/api/search`.

The menu page puts the page number in the URL, for example `/menu?page=2`, so a page can be bookmarked and shared. The server supplies the initial page as `fallbackData`, and SWR uses `keepPreviousData` so the old list remains visible while the next page loads.

Order Status is server-rendered first and then polls `/api/orders` every five seconds. The server data is passed as `fallbackData`, so there is no first-paint spinner.

SWR's shared cache and five-second deduplication window mean two components requesting the same key can reuse the same cached request/result.

## Security notes

See `AUTH.md` for protected routes, session handling, ownership checks, the staff-only route, and the three required attack tests.

## Performance notes

See `PERF.md` for the production Lighthouse before/after record.

## Findability

The app includes route metadata, absolute Open Graph metadata through `metadataBase`, generated dish Open Graph images at 1200×630, MenuItem JSON-LD, and a sitemap generated from `public/dishes.json`.

Private routes are intentionally absent from the sitemap.


## Delivery tracking mini-project

- Open **My Orders** and choose **Track delivery** for an order.
- The tracking route is `/tracking/[id]`; it shows text delivery details alongside a Leaflet map. The courier marker is a demo location near the delivery neighbourhood.
- The EventSource receives server-sent events from `/api/orders/[id]/stream` and closes when the tracking component unmounts.
- Export the signed-in user's order history as CSV from **My Orders**. CSV fields quote commas, quotes, and newlines safely.
- All ETB and date/time display formatting is centralized in `lib/format.js` (`etb`, `when`, and `relative`).

Install dependencies with `npm install` before running the app. Leaflet loads in the browser only; the map reserves a fixed height to avoid layout shift.
