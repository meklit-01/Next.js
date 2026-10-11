"use client";

import { useActionState } from "react";
import { placeOrder } from "../actions/orders";

const initialState = {
  success: false,
  fieldErrors: {},
  message: "",
};

export default function CheckoutForm() {
  const [state, formAction, pending] = useActionState(
    placeOrder,
    initialState
  );

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" required />
        {state.fieldErrors?.name && <p>{state.fieldErrors.name}</p>}
      </div>

      <div>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="0912345678"
          required
        />
        {state.fieldErrors?.phone && <p>{state.fieldErrors.phone}</p>}
      </div>

      <div>
        <label htmlFor="area">Area</label>
        <input id="area" name="area" type="text" required />
        {state.fieldErrors?.area && <p>{state.fieldErrors.area}</p>}
      </div>

      <div>
        <label htmlFor="notes">Notes</label>
        <textarea id="notes" name="notes" />
      </div>

      {state.message && <p>{state.message}</p>}

      <button type="submit" disabled={pending}>
        {pending ? "Placing Order..." : "Place Order"}
      </button>
    </form>
  );
}
