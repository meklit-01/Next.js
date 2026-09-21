import Link from "next/link";

export default function CartPage() {
  return (
    <div className="container">
      <h1>Your Cart</h1>

      <p>Your cart is currently empty.</p>

      <Link href="/menu" className="button">
        Browse Menu
      </Link>
    </div>
  );
}