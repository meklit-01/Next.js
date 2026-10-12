
import "./globals.css";

export const metadata = {
  title: "Addis Eats",
  description: "Track your Ethiopian food delivery orders.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
