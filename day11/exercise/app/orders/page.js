
import Link from "next/link";

export default function OrdersPage() {
  const orders = [
    { id: "1", customer: "Abebe Kebede", dish: "Doro Wet" },
    { id: "2", customer: "Sara", dish: "Shiro" },
  ];

  return (
    <main className="order-page">
      <h1>My Orders</h1>

      {orders.map((order) => (
        <section className="order-card" key={order.id}>
          <h2>Order #{order.id}</h2>
          <p>Customer: {order.customer}</p>
          <p>Dish: {order.dish}</p>

          <Link href={`/orders/${order.id}`}>
            Track this order
          </Link>
        </section>
      ))}
    </main>
  );
}
