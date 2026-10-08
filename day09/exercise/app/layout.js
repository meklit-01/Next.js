import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://example.com"),

  title: {
    default: "Addis Eats",
    template: "%s | Addis Eats",
  },

  description:
    "Discover delicious Ethiopian food from Addis Eats.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Navbar/>
      <body>{children}</body>
    </html>
  );
}