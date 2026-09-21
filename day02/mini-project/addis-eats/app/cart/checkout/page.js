import Link from "next/link";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  // Dynamic because this route reads the request-time session cookie.
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  return (
    <div className="container">
      <h1>Checkout</h1>

      <p>
        {session
          ? "Your session is active."
          : "Please complete your order."}
      </p>

      <form className="checkout-form">
        <label>
          Name
          <input type="text" name="name" required />
        </label>

        <label>
          Phone
          <input type="tel" name="phone" required />
        </label>

        <label>
          Address
          <input type="text" name="address" required />
        </label>

        <button type="submit">
          Place Order
        </button>
      </form>

      <Link href="/cart">
        Back to Cart
      </Link>
    </div>
  );
}