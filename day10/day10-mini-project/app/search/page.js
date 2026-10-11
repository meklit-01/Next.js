export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const term = params?.q?.trim() || "";

  return {
    title: "Search",
    description: term
      ? `Search results for ${term} on the Addis Eats menu.`
      : "Search the Addis Eats menu for Ethiopian dishes and drinks.",
    alternates: {
      canonical: term
        ? `/search?q=${encodeURIComponent(term)}`
        : "/search",
    },
  };
}

import SearchBox from "./SearchBox";

export default function SearchPage() {
  return <SearchBox />;
}
