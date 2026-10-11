import Link from "next/link";

export default function OrdersTable({
  orders,
  sort,
  direction,
  page,
  totalPages,
}) {
  function sortLink(column) {
    const nextDirection =
      sort === column && direction === "asc" ? "desc" : "asc";

    return `/dashboard?sort=${column}&direction=${nextDirection}&page=1`;
  }

  function ariaSort(column) {
    if (sort !== column) return "none";

    return direction === "asc" ? "ascending" : "descending";
  }

  return (
    <section>
      <h2>Orders</h2>

      <table>
        <caption>Customer orders, sorted by the selected column</caption>

        <thead>
          <tr>
            <th scope="col" aria-sort={ariaSort("id")}>
              <Link href={sortLink("id")}>Order ID</Link>
            </th>

            <th scope="col" aria-sort={ariaSort("customer")}>
              <Link href={sortLink("customer")}>Customer</Link>
            </th>

            <th scope="col" aria-sort={ariaSort("date")}>
              <Link href={sortLink("date")}>Date</Link>
            </th>

            <th scope="col" aria-sort={ariaSort("status")}>
              <Link href={sortLink("status")}>Status</Link>
            </th>

            <th scope="col" className="number" aria-sort={ariaSort("total")}>
              <Link href={sortLink("total")}>Total (ETB)</Link>
            </th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.date}</td>
              <td>{order.status}</td>
              <td className="number">
                {order.total.toLocaleString("en-US")}
              </td>
            </tr>
          ))}

          {orders.length === 0 && (
            <tr>
              <td colSpan={5}>No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <nav className="pagination" aria-label="Order pages">
        {page > 1 && (
          <Link
            href={`/dashboard?sort=${sort}&direction=${direction}&page=${page - 1}`}
          >
            Previous
          </Link>
        )}

        <span>
          Page {page} of {totalPages}
        </span>

        {page < totalPages && (
          <Link
            href={`/dashboard?sort=${sort}&direction=${direction}&page=${page + 1}`}
          >
            Next
          </Link>
        )}
      </nav>
    </section>
  );
}