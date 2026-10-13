"use client";

import dynamic from "next/dynamic";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => <div className="delivery-map map-loading" role="status">Loading delivery map…</div>,
});

export default function TrackingMap({ area }) {
  return <DeliveryMap area={area} />;
}
