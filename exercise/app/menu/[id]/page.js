import { notFound } from "next/navigation";

export default async function EachDish({ params }){
    const { id } = await params;

    const validDishes = ["1", "2","3"];

    if(!validDishes.includes(id)){
        notFound();
    }

    return(
        <div>
            <h1>Dish Details</h1>
            <p>Dish ID: {id}</p>
        </div>
    )
}