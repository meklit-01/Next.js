"use client";

import { useState } from "react";

export default function MenuLayout({ children }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <aside>
        <h2>Menu</h2>

        <p>Counter: {count}</p>

        <button onClick={() => setCount(count + 1)}>
          +
        </button>
      </aside>

      <main>
        {children}
      </main>
    </div>
  );
}