# Data Fetching

## 1. Order Status

- Query key: `/api/orders`
- Refresh rule: `refreshInterval: 5000`
- Reason: Orders should update automatically every 5 seconds so the status stays current.

## 2. Menu Search

- Query key: `/api/search?q=${searchTerm}`
- Refresh rule: No automatic refresh.
- Reason: Search results only need to update when the user changes the search term.

- Empty search key: `null`
- Reason: When there is no search term, SWR should not make a request.

- Previous data: `keepPreviousData: true`
- Reason: Keep the previous results visible while the new search results load.

## 3. Paged Menu

- Query key: `/api/dishes?page=${page}`
- Refresh rule: No automatic refresh.
- Reason: The user changes pages manually, so automatic polling is unnecessary.

- Previous data: `keepPreviousData: true`
- Reason: Keep the current page visible while the next page loads.

## Shared Fetcher

All SWR queries use:

`lib/fetcher.js`

The fetcher throws an error when the server response is not OK.