import Link from "next/link";
import OrderStatus from "../orderStatus";
import MapLoader from "../MapLoader";
import ExportButton from "../ExportButton";
import { etb, when } from "@/lib/format";

export default async function OrderPage({ params }) {
  const { id } = await params;

  // Example data. Replace with your real order lookup.
  const order = {
    id,
    customer: "Abebe Kebede",
    dish: "Doro Wet",
    price: 250,
    status: "Preparing",
    createdAt: "2026-10-13T12:00:00Z",
  };

  const ordersForExport = [
    {
      id: order.id,
      customer: order.customer,
      dish: order.dish,
      price: order.price,
      status: order.status,
    },
  ];

  return (
    <main className="order-page">
      <Link href="/orders">← All orders</Link>

      <h1>Track Your Order</h1>

      <section className="order-card">
        <h2>Order Information</h2>

        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Customer:</strong> {order.customer}</p>
        <p><strong>Dish:</strong> {order.dish}</p>
        <p><strong>Price:</strong> {etb(order.price)}</p>
        <p><strong>Order date:</strong> {when(order.createdAt)}</p>
       
      </section>

      <section className="order-card">
        <h2>Live Order Status</h2>

        <OrderStatus
          orderId={id}
          initialStatus={order.status}
          createdAt={order.createdAt}
        />
      </section>

      <section className="order-card">
        <h2>Delivery Map</h2>

        <p>Courier coordinates: 9.03, 38.74</p>
        <p>Delivery coordinates: 9.04, 38.75</p>

        <MapLoader />
      </section>

      <section className="order-card">
        <h2>Export Orders</h2>
        <ExportButton orders={ordersForExport} />
      </section>
    </main>
  );
}
