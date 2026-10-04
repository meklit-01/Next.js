# SWR Exercise

## Data Fetching

This exercise uses SWR for client-side data fetching.

## Fetcher

The shared fetcher is in:

`lib/fetcher.js`

## Polling

The order status uses:

`refreshInterval: 3000`

This refreshes the data every 3 seconds.

## Fallback Data

The order is provided by the server and passed to SWR as:

`fallbackData`

## Search

The search uses a debounced input.

When the search term is empty, the SWR key is `null`, so no request is made.

## Keep Previous Data

The search uses:

`keepPreviousData: true`

This keeps the previous results visible while new results are loading.

## Pagination

The page number is included in the query string.

Example:

`/api/search?q=pizza&page=2`
