export default function robots() {
  const baseUrl = "https://example.com";

  return {
    rules: {
      userAgent: "*",
      disallow: ["/cart", "/checkout"],
    },

    sitemap: `${baseUrl}/sitemap.xml`,
  };
}