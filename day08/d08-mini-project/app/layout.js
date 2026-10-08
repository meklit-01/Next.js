import "./globals.css";
import Link from "next/link";
import localFont from "next/font/local";
import Providers from "./Providers";
import LogoutButton from "./LogoutButton";

const geist = localFont({
  src: "./fonts/Geist-Regular.woff2",
  variable: "--font-geist",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL
  ),
  title: {
    default: "Addis Eats",
    template: "%s | Addis Eats",
  },
  description:
    "Order Ethiopian food and drinks from Addis Eats.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.variable}>
        <header>
          <Link href="/">Addis Eats</Link>

          <nav aria-label="Main navigation">
            <Link href="/">Home</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/search">Search</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/checkout">Checkout</Link>
            <Link href="/orders">Orders</Link>
            <Link href="/order-status">Order Status</Link>
            <Link href="/login">Sign in</Link>
            <LogoutButton />
          </nav>
        </header>

        <main>
          <Providers>{children}</Providers>
        </main>

        <footer>
          <p>© 2026 Addis Eats</p>
        </footer>
      </body>
    </html>
  );
}
