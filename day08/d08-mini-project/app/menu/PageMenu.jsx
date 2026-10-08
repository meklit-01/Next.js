"use client";

import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import DishList from "./DishList";

export default function PageMenu({ initialData }) {
  const key = `/api/dishes?page=${initialData.page}`;

  const { data = initialData, error, isValidating } = useSWR(
    key,
    fetcher,
    {
      fallbackData: initialData,
      keepPreviousData: true,
      dedupingInterval: 5000,
      revalidateOnFocus: false,
    }
  );

  return (
    <div>
      {error && <p>Could not refresh the menu.</p>}
      {isValidating && <p>Updating menu...</p>}

      <DishList dishes={data.dishes} />

      <nav aria-label="Menu pages" className="pages">
        {data.page > 1 && (
          <Link href={`/menu?page=${data.page - 1}`}>
            Previous
          </Link>
        )}

        <span>
          Page {data.page} of {data.totalPages}
        </span>

        {data.page < data.totalPages && (
          <Link href={`/menu?page=${data.page + 1}`}>
            Next
          </Link>
        )}
      </nav>
    </div>
  );
}
