
import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "30px" }}>
      <h1>Addis Eats</h1>

      <p>Welcome to the Addis Eats delivery dashboard.</p>

      <h2>Track a sample order</h2>

      <ul>
        <li>
          <Link href="/orders/201">Order 201 — Mimi</Link>
        </li>
        <li>
          <Link href="/orders/202">Order 202 — Dawit</Link>
        </li>
        <li>
          <Link href="/orders/203">Order 203 — Sara</Link>
        </li>
      </ul>
    </main>
  );
}
