"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function OrderStatus({ initialOrders }) {
  const { data, error } = useSWR("/api/orders", fetcher, {
    fallbackData: initialOrders,
    refreshInterval: 5000,
    dedupingInterval: 5000,
    revalidateOnFocus: false,
  });

  if (error) {
    return <p>Failed to load order status.</p>;
  }

  return (
    <div>
      <h1>Order Status</h1>

      {data.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        data.map((order) => (
          <div key={order.id}>
            <h2>Order #{order.id}</h2>
            <p>Name: {order.name}</p>
            <p>Area: {order.area}</p>
            <p>Status: {order.status}</p>
          </div>
        ))
      )}
    </div>
  );
}
