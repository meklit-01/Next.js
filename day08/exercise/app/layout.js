import { Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Performance Exercise",
  description: "Next.js performance optimization exercise",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}

        <Script
          src="https://example.com/example.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}