
"use client";

import { useEffect, useState } from "react";
import { relative, when } from "@/lib/format";

export default function StatusStream({
  orderId,
  initialStatus,
  initialUpdatedAt,
}) {
  const [status, setStatus] = useState(initialStatus);
  const [message, setMessage] = useState("Waiting for updates...");
  const [connected, setConnected] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(initialUpdatedAt);

  useEffect(() => {
    if (status === "delivered") {
      setConnected(false);
      return;
    }

    const source = new EventSource(
      `/api/orders/${encodeURIComponent(orderId)}/status`
    );

    source.onopen = () => setConnected(true);

    source.addEventListener("status", (event) => {
      const update = JSON.parse(event.data);
      const receivedAt = new Date().toISOString();

      setStatus(update.status);
      setMessage(update.message);
      setUpdatedAt(receivedAt);

      if (update.status === "delivered") {
        source.close();
        setConnected(false);
      }
    });

    source.onerror = () => {
      setConnected(false);
      // EventSource retries automatically while it is open.
    };

    return () => {
      source.close();
    };
  }, [orderId, status === "delivered"]);

  return (
    <section>
      <h2>Order status</h2>

      <p>
        Connection:{" "}
        <strong>
          {connected ? "Connected" : "Disconnected"}
        </strong>
      </p>

      <p>Status: {status.replaceAll("_", " ")}</p>
      <p>{message}</p>
      <p>Last updated: {when(updatedAt)}</p>
      <p>Updated {relative(updatedAt)}</p>
    </section>
  );
}
