import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  // This cookie read requires dynamic rendering.
  const cookieStore = await cookies();

  const session = cookieStore.get("session");

  return (
    <div>
      <h1>Checkout</h1>

      {session ? (
        <p>Session found.</p>
      ) : (
        <p>No session found.</p>
      )}

      <form>
        <input
          type="text"
          placeholder="Name"
        />

        <input
          type="tel"
          placeholder="Phone"
        />

        <button type="submit">
          Place Order
        </button>
      </form>
    </div>
  );
}