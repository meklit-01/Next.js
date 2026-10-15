"use client";

import { useEffect, useState } from "react";
import { etb } from "@/lib/format";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/orders")
      .then((response) => {
        if (!response.ok) throw new Error("Could not load orders.");
        return response.json();
      })
      .then((data) => { if (active) setOrders(data.orders || []); })
      .catch(() => { if (active) setError("Could not load orders. Please refresh the page."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  if (loading) return <p role="status">Loading orders…</p>;
  if (error) return <p role="alert">{error}</p>;
  if (orders.length === 0) return <section className="empty-state"><h2>No orders yet</h2><p>Place an order at checkout to see it here.</p><a href="/checkout">Go to checkout</a></section>;

  return (
    <div className="table-scroll">
      <table>
        <caption>Orders created during this server session</caption>
        <thead><tr><th scope="col">Order ID</th><th scope="col">Customer</th><th scope="col">Dish</th><th scope="col">Status</th><th scope="col" className="number">Total</th></tr></thead>
        <tbody>{orders.map((order) => <tr key={order.id}><td>{order.id}</td><td>{order.customer}</td><td>{order.dishName}</td><td>{order.status}</td><td className="number">{etb(order.total)}</td></tr>)}</tbody>
      </table>
    </div>
  );
}
