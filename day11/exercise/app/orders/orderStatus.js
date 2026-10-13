
"use client";

import { useEffect, useState } from "react";
import { relative } from "@/lib/format";

export default function OrderStatus({
  orderId,
  initialStatus,
  createdAt,
}) {
  const [status, setStatus] = useState(initialStatus);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (status === "Delivered") return;

    const source = new EventSource(
      `/api/order-status/${encodeURIComponent(orderId)}`
    );

    source.onopen = () => {
      setConnected(true);
    };

    source.onerror = () => {
      setConnected(false);
    };

    source.addEventListener("status", (event) => {
      const data = JSON.parse(event.data);

      setStatus(data.status);

      if (data.status === "Delivered") {
        source.close();
        setConnected(false);
      }
    });

    return () => {
      source.close();
    };
  }, [orderId, initialStatus]);

  return (
    <section>
      <p>
        Connection:{" "}
        <strong>
          {connected ? "Connected" : "Disconnected"}
        </strong>
      </p>

      <p>
        Status: <strong>{status}</strong>
      </p>

      {createdAt && (
        <p>Ordered: {relative(createdAt)}</p>
      )}
    </section>
  );
}
