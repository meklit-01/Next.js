"use client";

import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(dish) {
    setCart((current) => [
      ...current,
      dish,
    ]);
  }

  function removeFromCart(id) {
    setCart((current) =>
      current.filter(
        (dish) => dish.id !== id
      )
    );
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}