
import orders from "@/lib/orders";
import { etb, when } from "@/lib/format";
import OrdersCsvExport from "../OrdersCsvExport";
import StatusStream from "./StatusStream";
import DeliveryMapLoader from "./DeliveryMapLoader";
import { notFound } from "next/navigation";

export default async function OrderPage({ params }) {
  const { id } = await params;
  const order = orders.find((item) => item.id === id);

  if (!order) {
    notFound();
  }

  return (
    <main className="order-page">
      <h1>Order #{order.id}</h1>

      <section>
        <h2>Order details</h2>
        <p>Customer: {order.customer}</p>
        <p>Total: {etb(order.total)}</p>
        <p>Order date: {when(order.createdAt)}</p>
      </section>

      <StatusStream
        orderId={order.id}
        initialStatus={order.status}
        initialUpdatedAt={order.createdAt}
      />

      <DeliveryMapLoader />

      <section>
        <h2>All orders</h2>
        <p>Export the sample orders to a CSV file.</p>
        <OrdersCsvExport orders={orders} />
      </section>
    </main>
  );
}
