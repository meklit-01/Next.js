# Addis Eats — Live Data

## Shared fetcher

All SWR queries use `lib/fetcher.js`. It calls `fetch()`, checks `response.ok`, throws on a non-OK response, and returns JSON.

## Query table

| Screen | Key | Refresh rule | Reason |
|---|---|---|---|
| Order Status | `/api/orders` | `refreshInterval: 5000` | Order status can change while the customer is watching, so five-second polling keeps it reasonably current. |
| Menu paging | `/api/dishes?page=${page}` | `keepPreviousData: true`, `dedupingInterval: 5000` | The page number belongs in the key, while previous data stays visible during the next request. |
| Menu search | `/api/search?q=${term}` | 500 ms debounce, `keepPreviousData: true` | Debouncing prevents a request per keystroke and previous results stay visible until the new results arrive. |

### Empty search

An empty search term produces a `null` SWR key, so no search request is sent.

### Server fallback

Order Status receives its current orders from the server and passes them as `fallbackData`, so the first paint has data instead of a loading spinner.

Menu paging also receives the requested page from the server as `fallbackData`.

### Deduplication

The application-level `SWRConfig` uses a five-second `dedupingInterval`. Components using the same key share SWR's cache instead of starting duplicate requests during that interval.

## Freshness note

SWR uses `refreshInterval` and `dedupingInterval` rather than React Query's `staleTime`. The five-second dedupe window prevents duplicate requests while order polling is deliberately every five seconds.
