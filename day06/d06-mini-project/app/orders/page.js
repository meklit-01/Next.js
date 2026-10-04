import { getOrders } from "@/lib/orders";
import CancelButton from "./CancelButton";

export const revalidate = 60;

export default function OrdersPage() {
  const orders = getOrders();

  return (
    <div>
      <h1>Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id}>
            <h2>Order #{order.id}</h2>

            <p>Name: {order.name}</p>
            <p>Phone: {order.phone}</p>
            <p>Area: {order.area}</p>
            <p>
              Notes: {order.notes || "None"}
            </p>

            <CancelButton orderId={order.id} />
          </div>
        ))
      )}
    </div>
  );
}