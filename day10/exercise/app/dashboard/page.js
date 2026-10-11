import orders from "@/lib/orders";
import RevenueChart from "./components/RevenueChart";
import OrdersChart from "./components/OrdersChart";
import ChartDataTable from "./components/ChartDataTable";
import OrdersTable from "./components/OrdersTable";

export const metadata = {
  title: "Orders Dashboard",
  description: "View order totals, daily revenue, and order history.",
};

const PAGE_SIZE = 5;

const allowedSorts = ["id", "customer", "date", "status", "total"];

export default async function DashboardPage({ searchParams }) {
  const params = await searchParams;

  const state = params.state || "data";

  if (state === "error") {
    throw new Error("Dashboard error state requested for testing.");
  }

  if (state === "loading") {
    return (
      <main>
        <h1>Orders Dashboard</h1>
        <p role="status">Loading dashboard...</p>
      </main>
    );
  }

  const allOrders = state === "empty" ? [] : orders;

  const sort = allowedSorts.includes(params.sort)
    ? params.sort
    : "date";

  const direction = params.direction === "asc" ? "asc" : "desc";

  const requestedPage = Number(params.page);
  const page =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  // Aggregate data on the server.
  const summary = {};

  for (let day = 5; day <= 10; day++) {
    const date = `2026-10-${String(day).padStart(2, "0")}`;

    summary[date] = {
      date,
      revenue: 0,
      orders: 0,
    };
  }

  for (const order of allOrders) {
    if (summary[order.date]) {
      summary[order.date].revenue += order.total;
      summary[order.date].orders += 1;
    }
  }

  const chartData = Object.values(summary);

  const totalRevenue = allOrders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  const sortedOrders = [...allOrders].sort((a, b) => {
    const first = a[sort];
    const second = b[sort];

    const result =
      typeof first === "number" && typeof second === "number"
        ? first - second
        : String(first).localeCompare(String(second));

    return direction === "asc" ? result : -result;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(sortedOrders.length / PAGE_SIZE)
  );

  const safePage = Math.min(page, totalPages);

  const pagedOrders = sortedOrders.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  if (allOrders.length === 0) {
    return (
      <main className="dashboard">
        <h1>Orders Dashboard</h1>
        <section className="empty-state">
          <h2>No orders yet</h2>
          <p>Your dashboard will show revenue and order details when orders arrive.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="dashboard">
      <h1>Orders Dashboard</h1>

      <section className="summary-cards" aria-label="Order summary">
        <article>
          <h2>Total orders</h2>
          <p>{allOrders.length}</p>
        </article>

        <article>
          <h2>Total revenue</h2>
          <p>{totalRevenue.toLocaleString("en-US")} ETB</p>
        </article>
      </section>

      <RevenueChart data={chartData} />

      <OrdersChart data={chartData} />

      <ChartDataTable data={chartData} />

      <OrdersTable
        orders={pagedOrders}
        sort={sort}
        direction={direction}
        page={safePage}
        totalPages={totalPages}
      />
    </main>
  );
}