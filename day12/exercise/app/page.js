import Link from "next/link";

export default function HomePage() {
  return (
    <main id="main-content" className="container">
      <section className="hero">
        <p className="eyebrow">Module 3 · Day 48</p>
        <h1>Accessible ordering, from keyboard to deployment.</h1>
        <p>This demo app helps you practise keyboard access, visible focus, safe order submission, touch targets, production builds, and deployment checks.</p>
        <div className="button-row">
          <Link className="button-link" href="/menu">Browse menu</Link>
       
        </div>
      </section>
      <section className="card-grid" aria-label="Exercise demonstrations">
        <article className="card"><h2>1–2. Keyboard access</h2><p>Use semantic links and buttons, visible focus, and an Escape-dismissible dialog.</p><Link href="/menu">Try the menu</Link></article>
        <article className="card"><h2>3. Prevent duplicate orders</h2><p>The submit button disables while sending, and the server uses an idempotency key for this demo.</p><Link href="/checkout">Try checkout</Link></article>
        <article className="card"><h2>4. Touch targets</h2><p>Interactive controls are styled with a minimum 44-pixel target size.</p><Link href="/menu">Check controls</Link></article>
        <article className="card"><h2>5–7. Build and deploy</h2><p>Follow the local build and live-site checklists before submitting your work.</p></article>
      </section>
    </main>
  );
}
