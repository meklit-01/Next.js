import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
    >
      <body className="min-h-full flex flex-col">
        <header><h1>Addis Eats</h1></header>
        {children}
        <footer>@2026 ALL RIGHTS ARE RESERVERD</footer>
      </body>
    </html>
  );
}
