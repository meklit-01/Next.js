"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const key = debouncedSearch
    ? `/api/search?q=${encodeURIComponent(debouncedSearch)}&page=${page}`
    : null;

  const { data, isLoading } = useSWR(key, fetcher, {
    keepPreviousData: true,
  });

  return (
    <div>
      <h1>Search</h1>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {isLoading && <p>Searching...</p>}

      {data?.results.map((result) => (
        <p key={result}>{result}</p>
      ))}
      <div>
        <button
         onClick={()=> setPage(page - 1)}>
            previous
         </button>
         <span>Page {page}</span>

         <button onClick={()=> setPage(page +1)}>Next</button>
      </div>
    </div>
  );
}