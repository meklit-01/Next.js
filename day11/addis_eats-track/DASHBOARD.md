# Addis Eats Dashboard Mini-Project

## Run locally

Requirements: Node.js 20.9 or newer.

1. Extract the ZIP.
2. Open a terminal in the `d08-mini-project` folder.
3. Run:

   ```bash
   npm install
   npm run dev
   ```

4. Open `http://localhost:3000/dashboard`.

No deployment environment variable is required. The site URL metadata falls back to `http://localhost:3000`.

## Dashboard features

- Server component aggregates revenue by neighbourhood and date.
- Only the small summary arrays are passed to the client chart components.
- SVG charts use axes that start at zero, textual values, patterns/dashes, and labels so colour is not required.
- Both charts have equivalent HTML data tables.
- Orders use a native HTML table with caption, `thead`, and column header `th scope="col"`.
- Sorting and paging are stored in the URL. Pagination uses Next.js `Link`.
- Sample dashboard data is used only when the in-memory order store has no orders, to make the successful dashboard demonstrable. A brand-new signed-in customer still sees “No orders yet” on `/orders` because that page only shows that customer's orders.

## Demonstrate all four states

- Success: `/dashboard`
- Loading: `/dashboard?state=loading`
- Empty: `/dashboard?state=empty`
- Error: `/dashboard?state=error`

## Demonstrate URL sorting and paging

- Sort by total: `/dashboard?page=1&sort=total&direction=desc`
- Page three sorted by total: `/dashboard?page=3&sort=total&direction=desc`

Available sort keys: `date`, `customer`, `area`, and `total`. The table has five rows per page.

## Note about sample storage

This starter project uses an in-memory order array in `lib/orders.js`. Real orders disappear when the server process restarts, and separate server instances do not share data. A production dashboard should use a database and calculate totals from the saved order line items.
