import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Addis Eats home">Addis Eats</Link>
      <nav aria-label="Main navigation" className="main-nav">
        <Link href="/menu">Menu</Link>
        <Link href="/checkout">Checkout</Link>
        <Link href="/orders">Orders</Link>
       
      </nav>
    </header>
  );
}
