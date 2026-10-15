import { Suspense } from "react";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <main id="main-content" className="container">
      <p className="eyebrow">Safe form submission</p>
      <h1>Checkout</h1>
      <p>Complete the form to test pending states and duplicate-submission protection.</p>
      <Suspense fallback={<p role="status">Loading checkout form…</p>}><CheckoutForm /></Suspense>
    </main>
  );
}
