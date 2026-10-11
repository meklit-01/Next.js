"use client";

import { SWRConfig } from "swr";
import { fetcher } from "@/lib/fetcher";
import { CartProvider } from "@/components/CartProvider";

export default function Providers({ children }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        dedupingInterval: 5000,
        revalidateOnFocus: false,
      }}
    >
      <CartProvider>{children}</CartProvider>
    </SWRConfig>
  );
}
