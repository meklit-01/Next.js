"use client";

import { useEffect, useState } from "react";
import { relative, when } from "@/lib/format";

export default function TrackingLive({ orderId, initialStatus, initialUpdatedAt }) {
  const [status, setStatus] = useState(initialStatus || "processing");
  const [updatedAt, setUpdatedAt] = useState(initialUpdatedAt || null);
  const [connection, setConnection] = useState("Connecting to live updates…");

  useEffect(() => {
    const source = new EventSource(`/api/orders/${encodeURIComponent(orderId)}/stream`);
    source.onopen = () => setConnection("Live updates connected");
    source.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.status) setStatus(data.status);
        if (data.updatedAt) setUpdatedAt(data.updatedAt);
        setConnection("Live updates connected");
      } catch {
        setConnection("Received an unreadable update");
      }
    };
    source.onerror = () => setConnection("Reconnecting to live updates…");
    return () => source.close();
  }, [orderId]);

  return (
    <section className="tracking-status" aria-live="polite">
      <h2>Delivery status: {status}</h2>
      <p>{connection}</p>
      <p>Last update: {when(updatedAt)} ({relative(updatedAt)})</p>
    </section>
  );
}
