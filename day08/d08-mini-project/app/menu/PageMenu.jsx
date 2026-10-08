"use client";

import useSWR from "swr";
import Link from "next/link";
import { fetcher } from "@/lib/fetcher";
import DishList from "./DishList";

export default function PagedMenu({ initialData, page }) {
  const key = `/api/dishes?page=${page}`;

  const { data, error } = useSWR(key, fetcher, {
    fallbackData: initialData,
    keepPreviousData: true,
  });

  if (error) {
    return <p>Failed to load dishes.</p>;
  }

  return (
    <div>
      <DishList dishes={data.dishes} />

      <div>
        {page > 1 && (
          <Link href={`/menu?page=${page - 1}`}>
            Previous
          </Link>
        )}

        <span>
          {" "} Page {page} of {data.totalPages} {" "}
        </span>

        {page < data.totalPages && (
          <Link href={`/menu?page=${page + 1}`}>
            Next
          </Link>
        )}
      </div>
    </div>
  );
}