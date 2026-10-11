export const metadata = {
  title: "My Orders",
  description: "View and manage your Addis Eats orders.",
};

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getOrdersByUserId } from "@/lib/orders";
import CancelButton from "./CancelButton";

export default async function OrdersPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login?next=/orders");
  }

  const orders = getOrdersByUserId(session.id);

  return (
    <div>
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id}>
            <h2>Order #{order.id}</h2>
            <p>Name: {order.name}</p>
            <p>Phone: {order.phone}</p>
            <p>Area: {order.area}</p>
            <p>Notes: {order.notes || "None"}</p>
            <p>Status: {order.status}</p>
            <CancelButton orderId={order.id} />
          </div>
        ))
      )}
    </div>
  );
}
