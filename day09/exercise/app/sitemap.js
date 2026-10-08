import dishes from "@/lib/dishes";

export default function sitemap() {
  const baseUrl = "https://example.com";

  const staticRoutes = [
    "",
    "/menu",
  ];

  const dishRoutes = dishes.map((dish) => `/menu/${dish.id}`);

  return [...staticRoutes, ...dishRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}