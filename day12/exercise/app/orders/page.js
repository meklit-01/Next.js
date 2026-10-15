import OrdersList from "@/components/OrdersList";

export const metadata = { title: "Orders" };

export default function OrdersPage() {
  return (
    <main id="main-content" className="container">
      <p className="eyebrow">Order history</p>
      <h1>Orders</h1>
      <p>Orders created in this demo server session appear below. The sample API uses memory, so the list resets when the server restarts.</p>
      <OrdersList />
      <p><a href="/api/orders">View orders API JSON</a></p>
    </main>
  );
}
