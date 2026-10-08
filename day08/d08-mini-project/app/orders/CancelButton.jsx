"use client";

import { useState } from "react";
import { cancelOrder } from "../actions/orders";

export default function CancelButton({ orderId }) {
  const [message, setMessage] = useState("");

  async function handleCancel() {
    const result = await cancelOrder(orderId);
    setMessage(result.message);
  }

  return (
    <div>
      <button type="button" onClick={handleCancel}>
        Cancel Order
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
