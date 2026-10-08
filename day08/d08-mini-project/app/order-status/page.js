import { getOrders } from "@/lib/orders";
import OrderStatus from "./OrderStatus";

export default function OrderStatusPage() {
  const orders = getOrders();

  return (<div > <OrderStatus initialOrders={orders} /></div>);
}