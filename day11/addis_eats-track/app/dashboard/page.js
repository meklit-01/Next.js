import Link from "next/link";
import { getAllOrders } from "@/lib/orders";
import RevenueChart from "./components/RevenueChart";
import OrdersChart from "./components/OrdersChart";

export const metadata = {
  title: "Dashboard",
  description: "Addis Eats revenue and order dashboard",
};

const demoOrders = [
  { id: "DEMO-1001", name: "Sara", area: "Bole", total: 1250, status: "delivered", createdAt: "2026-10-05T10:00:00.000Z" },
  { id: "DEMO-1002", name: "Abel", area: "Kirkos", total: 850, status: "processing", createdAt: "2026-10-05T12:00:00.000Z" },
  { id: "DEMO-1003", name: "Hana", area: "Bole", total: 1750, status: "delivered", createdAt: "2026-10-06T09:00:00.000Z" },
  { id: "DEMO-1004", name: "Dawit", area: "Arada", total: 650, status: "cancelled", createdAt: "2026-10-06T13:00:00.000Z" },
  { id: "DEMO-1005", name: "Mimi", area: "Kirkos", total: 1450, status: "processing", createdAt: "2026-10-07T11:00:00.000Z" },
  { id: "DEMO-1006", name: "Yonas", area: "Bole", total: 950, status: "delivered", createdAt: "2026-10-08T14:00:00.000Z" },
  { id: "DEMO-1007", name: "Liya", area: "Arada", total: 1150, status: "processing", createdAt: "2026-10-09T08:00:00.000Z" },
  { id: "DEMO-1008", name: "Meron", area: "Kirkos", total: 700, status: "delivered", createdAt: "2026-10-10T15:00:00.000Z" },
  { id: "DEMO-1009", name: "Kaleb", area: "Bole", total: 1350, status: "processing", createdAt: "2026-10-10T17:00:00.000Z" },
  { id: "DEMO-1010", name: "Betty", area: "Arada", total: 550, status: "delivered", createdAt: "2026-10-04T10:00:00.000Z" },
  { id: "DEMO-1011", name: "Samuel", area: "Kirkos", total: 2100, status: "processing", createdAt: "2026-10-03T12:00:00.000Z" },
  { id: "DEMO-1012", name: "Rahel", area: "Bole", total: 900, status: "delivered", createdAt: "2026-10-02T09:00:00.000Z" },
  { id: "DEMO-1013", name: "Nati", area: "Arada", total: 1600, status: "processing", createdAt: "2026-10-01T13:00:00.000Z" },
  { id: "DEMO-1014", name: "Eden", area: "Kirkos", total: 450, status: "delivered", createdAt: "2026-10-01T11:00:00.000Z" },
  { id: "DEMO-1015", name: "Marta", area: "Bole", total: 1850, status: "processing", createdAt: "2026-10-09T15:00:00.000Z" },
  { id: "DEMO-1016", name: "Robel", area: "Arada", total: 750, status: "delivered", createdAt: "2026-10-08T17:00:00.000Z" },
];

const money = (value) => `ETB ${Number(value || 0).toLocaleString("en-US")}`;
const dateLabel = (value) => new Date(value).toISOString().slice(5, 10);

function makeHref(page, sort, direction) {
  return `/dashboard?page=${page}&sort=${sort}&direction=${direction}`;
}

function DataTable({ title, headers, rows }) {
  return (
    <table className="dashboard-table">
      <caption>{title}</caption>
      <thead>
        <tr>{headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>{row.map((cell, i) => <td key={i}>{cell}</td>)}</tr>
        ))}
      </tbody>
    </table>
  );
}

export default async function DashboardPage({ searchParams }) {
  const params = await searchParams;
  const state = params.state || "success";
  const page = Math.max(1, Number.parseInt(params.page || "1", 10) || 1);
  const sort = ["total", "date", "area", "customer"].includes(params.sort) ? params.sort : "date";
  const direction = params.direction === "asc" ? "asc" : "desc";

  if (state === "loading") {
    return <section aria-live="polite"><h1>Addis Eats Dashboard</h1><p role="status">Loading dashboard data…</p><p>This loading state is available with <code>?state=loading</code>.</p></section>;
  }
  if (state === "error") {
    return <section><h1>Addis Eats Dashboard</h1><h2>Could not load dashboard</h2><p>Something went wrong while loading the report. Try the dashboard again.</p><p><Link href="/dashboard">Try again</Link> · Demonstration URL: <code>?state=error</code></p></section>;
  }

  const liveOrders = getAllOrders();
  const isEmptyDemo = state === "empty";
  const orders = isEmptyDemo ? [] : liveOrders.length ? liveOrders.map((o) => ({ ...o, total: Number(o.total || 0) })) : demoOrders;
  const revenueByArea = Object.values(orders.reduce((acc, order) => {
    const area = order.area || "Not specified";
    if (!acc[area]) acc[area] = { area, revenue: 0, orders: 0 };
    acc[area].revenue += Number(order.total || 0);
    acc[area].orders += 1;
    return acc;
  }, {})).sort((a, b) => a.area.localeCompare(b.area));

  const byDate = Object.values(orders.reduce((acc, order) => {
    const date = dateLabel(order.createdAt || new Date().toISOString());
    if (!acc[date]) acc[date] = { date, revenue: 0, orders: 0 };
    acc[date].revenue += Number(order.total || 0);
    acc[date].orders += 1;
    return acc;
  }, {})).sort((a, b) => a.date.localeCompare(b.date)).slice(-7);

  const sortField = { total: "total", date: "createdAt", area: "area", customer: "name" }[sort];
  const sorted = [...orders].sort((a, b) => {
    const av = a[sortField] ?? "";
    const bv = b[sortField] ?? "";
    const result = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv));
    return direction === "asc" ? result : -result;
  });
  const pageSize = 5;
  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageRows = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const nextDirection = direction === "asc" ? "desc" : "asc";

  return (
    <div className="dashboard">
      <h1>Addis Eats Dashboard</h1>
      <p>Revenue and order summaries are calculated on the server. The charts receive only their small summary rows.</p>
      <p className="demo-note">When there are no saved orders, sample report data is shown for demonstration. Use the empty-state link to preview a brand-new report.</p>
      <nav aria-label="Dashboard state demonstrations" className="dashboard-state-links">
        <Link href="/dashboard">Success</Link>
        <Link href="/dashboard?state=loading">Loading state</Link>
        <Link href="/dashboard?state=empty">Empty state</Link>
        <Link href="/dashboard?state=error">Error state</Link>
      </nav>

      {orders.length === 0 ? (
        <section><h2>No orders yet</h2><p>When customers place orders, your revenue summaries and order table will appear here.</p></section>
      ) : (
        <>
          <div className="dashboard-chart-grid">
            <RevenueChart rows={revenueByArea} />
            <OrdersChart rows={byDate} />
          </div>
          <div className="dashboard-data-grid">
            <DataTable title="Revenue by neighbourhood — data table (ETB)" headers={["Neighbourhood", "Orders", "Revenue (ETB)"]} rows={revenueByArea.map((r) => [r.area, r.orders, money(r.revenue)])} />
            <DataTable title="Orders over time — data table (ETB)" headers={["Date (MM-DD)", "Orders", "Revenue (ETB)"]} rows={byDate.map((r) => [r.date, r.orders, money(r.revenue)])} />
          </div>

          <section aria-labelledby="orders-heading">
            <h2 id="orders-heading">Orders</h2>
            <p>Sort by:{" "}
              <Link href={makeHref(1, "date", sort === "date" ? nextDirection : "desc")}>Date</Link>{" · "}
              <Link href={makeHref(1, "customer", sort === "customer" ? nextDirection : "asc")}>Customer</Link>{" · "}
              <Link href={makeHref(1, "area", sort === "area" ? nextDirection : "asc")}>Neighbourhood</Link>{" · "}
              <Link href={makeHref(1, "total", sort === "total" ? nextDirection : "desc")}>Total</Link>
            </p>
            <p>Current sort: {sort}, {direction}. Page {currentPage} of {pageCount}.</p>
            <table className="dashboard-table orders-table">
              <caption>Customer orders, sorted by {sort} ({direction})</caption>
              <thead><tr>
                <th scope="col">Order ID</th><th scope="col">Customer</th><th scope="col">Neighbourhood</th><th scope="col">Date</th><th scope="col">Status</th><th scope="col">Total (ETB)</th>
              </tr></thead>
              <tbody>
                {pageRows.map((order) => <tr key={order.id}>
                  <td>{order.id}</td><td>{order.name || "Customer"}</td><td>{order.area || "Not specified"}</td><td>{new Date(order.createdAt).toLocaleDateString("en-CA", { timeZone: "UTC" })}</td><td>{order.status || "processing"}</td><td>{money(order.total)}</td>
                </tr>)}
              </tbody>
            </table>
            <nav aria-label="Order table pages" className="dashboard-pagination">
              {currentPage > 1 ? <Link href={makeHref(currentPage - 1, sort, direction)}>Previous page</Link> : <span aria-disabled="true">Previous page</span>}
              <span>Page {currentPage} / {pageCount}</span>
              {currentPage < pageCount ? <Link href={makeHref(currentPage + 1, sort, direction)}>Next page</Link> : <span aria-disabled="true">Next page</span>}
            </nav>
            <p>Shareable URL example: <Link href="/dashboard?page=3&sort=total&direction=desc">Page 3 sorted by total</Link>.</p>
          </section>
        </>
      )}
    </div>
  );
}
