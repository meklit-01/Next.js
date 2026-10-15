import "./globals.css";
import SiteHeader from "@/components/SiteHeader";

export const metadata = {
  title: { default: "Addis Eats | Day 48 Accessibility Lab", template: "%s | Addis Eats" },
  description: "A learning demo for keyboard accessibility, safe form submission, and deployment pre-flight checks.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <SiteHeader />
        {children}
        <footer className="site-footer"><p>IBT College Canada CodeOps · Module 3 · Day 48 practice app</p></footer>
      </body>
    </html>
  );
}
