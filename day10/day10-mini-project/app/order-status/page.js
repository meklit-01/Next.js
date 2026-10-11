export const metadata = {
  title: "Order Status",
  description: "Track the current status of your Addis Eats orders.",
};

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getOrdersByUserId } from "@/lib/orders";
import OrderStatus from "./OrderStatus";

export default async function OrderStatusPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login?next=/order-status");
  }

  const orders = getOrdersByUserId(session.id);

  return (
    <div>
      <OrderStatus initialOrders={orders} />
    </div>
  );
}
