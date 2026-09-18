"use client";

import { useRouter } from "next/router";

export default function MenuButton(){
    const router = useRouter();

    function goToCart(){
        router.push("/cart");
    }

    return(
        <button onClick={goToCart}>Go to Cart</button>
    );
}