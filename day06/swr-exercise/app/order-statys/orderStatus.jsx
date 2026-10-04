"use client";

import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function OrderStatus({ order }){
    const { data, error } = useSWR(
        "/api/orders",
        fetcher,
        {
            refreshInterval: 3000,
            fallbackData: order,
        }
    );

    if (error) return <p>Error loading order</p>

    return(
        <div>
            <h1>Order Status</h1>
            <p>Order #{data.id}</p>
            <p>Status: {data.status}</p>
        </div>
    );
}