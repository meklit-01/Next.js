"use client"

import OrderStatus from "./orderStatus";
export default async function Page() {
  const order = {
    id: 1,
    status: "Preparing",
  };
    return(
        <div>
         <OrderStatus order={order}/>
        </div>
    );
}