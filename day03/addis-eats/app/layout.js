import "./globals.css";
import Link from "next/link";
import Providers from "./Providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Link href="/">Addis Eats</Link>

          <nav>
            <Link href="/">Home</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/checkout">Checkout</Link>
          </nav>
        </header>

        <Providers>
          {children}
        </Providers>

        <footer>
          <p>© 2026 Addis Eats</p>
        </footer>
      </body>
    </html>
  );
}