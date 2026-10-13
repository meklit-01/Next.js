
"use client";

import dynamic from "next/dynamic";

const OrdersMap = dynamic(() => import("./OrdersMap"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "350px",
        display: "grid",
        placeItems: "center",
        background: "#f1f1f1",
        borderRadius: "8px",
      }}
    >
      Loading map...
    </div>
  ),
});

export default function MapLoader() {
  return <OrdersMap />;
}
