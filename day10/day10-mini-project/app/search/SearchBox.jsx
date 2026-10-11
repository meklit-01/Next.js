"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function SearchBox() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const term = search.trim();
      setDebouncedSearch(term);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const key = debouncedSearch
    ? `/api/search?q=${encodeURIComponent(debouncedSearch)}`
    : null;

  const { data = [], error, isValidating } = useSWR(key, fetcher, {
    keepPreviousData: true,
    dedupingInterval: 500,
    revalidateOnFocus: false,
  });

  return (
    <div>
      <h1>Search Menu</h1>

      <label htmlFor="menu-search">Search dishes</label>
      <input
        id="menu-search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Try kitfo"
      />

      {error && <p>Failed to search.</p>}
      {isValidating && debouncedSearch && <p>Updating results...</p>}

      {debouncedSearch && data.length === 0 && !error ? (
        <p>No dishes found.</p>
      ) : null}

      {data.map((dish) => (
        <div key={dish.id}>
          <h2>{dish.name}</h2>
          <p>{dish.price} ETB</p>
        </div>
      ))}
    </div>
  );
}
