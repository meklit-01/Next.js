import DeliveryMapLoader from "./DeliveryMapLoader";
import StatusStream from "./StatusStream";
import { etb, when } from "@/lib/format";


export default async function OrderPage({ params }) {
  const { id } = await params;

  // Demo order data. Replace with your database lookup.
  const order = {
    id,
    total: 750,
    createdAt: "2026-10-12T12:00:00Z",
    status: "preparing",
  };

  return (
    <main>
      <h1>Order #{order.id}</h1>
      <p>Total: {etb(order.total)}</p>
      <p>Placed: {when(order.createdAt)}</p>

      <StatusStream
        orderId={order.id}
        initialStatus={order.status}
      />

      <DeliveryMapLoader />
      
    </main>
  );
}
