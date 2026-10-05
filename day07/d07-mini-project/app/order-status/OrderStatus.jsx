"use client";

import userSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function OrderStatus({ initialOrder }){
    const { data, error, isLoading } = userSWR(
         "/api/orders",
         fetcher,
         {
            fallback: initialOrder,
            refreshInterval: 5000,
         }
    );

    // if (isLoading) {
    //     return <p>Loading...</p>; 
    //    }  
    if (error){
        return <p>Failed to load orders.</p>
    }
   
    return(
        <div>
            <h1>Order Status</h1>

            {!data || data.length === 0 ? (<p>No orders yet.</p>) : (
                data.map((order) => (
                    <div key={order.id}>
                        <h2>Order #{order.id}</h2>
                        <p>Name: {order.name}</p>
                        <p>Area: {order.area}</p>
                        <p>Status: processing</p>
                    </div> 
                ))
            )}
        </div>
    );

}