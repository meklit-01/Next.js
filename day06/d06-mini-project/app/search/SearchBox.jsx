"use client";

import { useEffect, useState } from "react";
import useSwR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function SearchBox() {
    const [search, setSearch ] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer)
    }, [search]);

    const key = debouncedSearch
    ? `/api/search?q=${encodeURIComponent(debouncedSearch)}`
    : null;

    const { data, error, isLoading } = useSwR(
        key,
        fetcher,
        {
            keepPreviousData: true,
        }
    );
    return(
        <div>
            <h1>Serch Menu</h1>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}/>

              {error && <p>Failed to search.</p>}
              {isLoading && <p>serching...</p>}
              {data && data.lengh === 0 && (<p>No dishes found.</p>)}

              {data?.map((dish)=>(
                <div key={dish.id}>
                  <h2>{dish.name}</h2>
                  <p>{dish.price} ETB</p>
                  </div>
              ))}
        </div>
    );
}