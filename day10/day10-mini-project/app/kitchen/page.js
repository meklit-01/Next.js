export const metadata = {
  title: "Kitchen",
  description: "Staff-only Addis Eats order management.",
};

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getAllOrders } from "@/lib/orders";

export default async function KitchenPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login?next=/kitchen");
  }

  if (session.role !== "staff") {
    return (
      <div>
        <h1>Access denied</h1>
        <p>Staff access is required.</p>
      </div>
    );
  }

  const orders = getAllOrders();

  return (
    <div>
      <h1>Kitchen</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id}>
            <h2>Order #{order.id}</h2>
            <p>{order.name} — {order.area}</p>
            <p>Status: {order.status}</p>
          </div>
        ))
      )}
    </div>
  );
}
