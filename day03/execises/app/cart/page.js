"use client";

import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../components/CartProvider";

export default function CartPage() {
  const { cart, removeFromCart } =
    useContext(CartContext);

  return (
    <div>
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((dish) => (
          <div key={dish.id}>
            <h2>{dish.name}</h2>

            <p>{dish.price} ETB</p>

            <button
              onClick={() =>
                removeFromCart(dish.id)
              }
            >
              Remove
            </button>
          </div>
        ))
      )}

      <Link href="/menu">
        Back to Menu
      </Link>
    </div>
  );
}