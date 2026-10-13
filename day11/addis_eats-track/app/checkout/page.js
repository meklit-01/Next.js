export const metadata = {
  title: "Checkout",
  description: "Enter delivery details and place an Addis Eats order.",
};

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import CheckoutForm from "./chekoutForm";

export default async function CheckoutPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login?next=/checkout");
  }

  return (
    <div>
      <h1>Checkout</h1>
      <p>Enter your information to place your order.</p>
      <CheckoutForm />
    </div>
  );
}
