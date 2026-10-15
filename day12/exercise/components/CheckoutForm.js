"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import dishes from "@/lib/menu";
import { etb } from "@/lib/format";

export default function CheckoutForm() {
  const searchParams = useSearchParams();
  const requestedDish = searchParams.get("dish");
  const [dishId, setDishId] = useState(dishes.some((dish) => dish.id === requestedDish) ? requestedDish : dishes[0].id);
  const [customer, setCustomer] = useState("");
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [order, setOrder] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (pending || order) return;

    setPending(true);
    setFeedback("");
    const submissionId = crypto.randomUUID();
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": submissionId },
        body: JSON.stringify({ customer: customer.trim(), dishId, submissionId }),
      });
      const result = await response.json();
      if (!response.ok) {
        setFeedback(result.error || "We could not place your order. Please try again.");
        return;
      }
      setOrder(result.order);
      setFeedback("Your order was placed successfully.");
    } catch {
      setFeedback("Network error. Please check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  const selectedDish = dishes.find((dish) => dish.id === dishId) || dishes[0];

  return (
    <div className="checkout-layout">
      <form className="card form-card" onSubmit={handleSubmit}>
        <h2>Customer details</h2>
        <label htmlFor="customer">Your name</label>
        <input id="customer" name="customer" autoComplete="name" value={customer} onChange={(event) => setCustomer(event.target.value)} required minLength={2} maxLength={80} disabled={pending || Boolean(order)} />

        <label htmlFor="dish">Choose a dish</label>
        <select id="dish" name="dish" value={dishId} onChange={(event) => setDishId(event.target.value)} disabled={pending || Boolean(order)}>
          {dishes.map((dish) => <option value={dish.id} key={dish.id}>{dish.name} — {etb(dish.price)}</option>)}
        </select>

        <p className="order-total">Total: {etb(selectedDish.price)}</p>
        <button type="submit" disabled={pending || Boolean(order)}>
          {pending ? "Placing order…" : order ? "Order placed" : "Place order"}
        </button>
        <p className="hint">The button is disabled while the request is pending. The server also checks the submission ID to prevent duplicate processing.</p>
        <p aria-live="polite" role={feedback && !order ? "alert" : "status"}>{feedback}</p>
        {order && <div className="success-panel"><h3>Order confirmed</h3><p>Order ID: <strong>{order.id}</strong></p><p>Customer: {order.customer}</p><p>Dish: {order.dishName}</p><p>Total: {etb(order.total)}</p></div>}
      </form>
      <aside className="card"><h2>Keyboard test</h2><ol><li>Press Tab to reach each input and button.</li><li>Use arrow keys to change the dish selection.</li><li>Press Enter to submit the form.</li><li>Try a quick double-click; only one order should be created.</li></ol></aside>
    </div>
  );
}
