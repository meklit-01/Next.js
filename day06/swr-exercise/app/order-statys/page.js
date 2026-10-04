"use client"

import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function OrderStatus(){
    const { data , error, isLoading } = useSWR(
        "/api/orders",
        fetcher
    );

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading order</p>;

    return(
        <div>
            <h1>Order Status</h1>
            <p>order #{data.id}</p>
            <p>Status: {data.status}</p>
        </div>
    );
}