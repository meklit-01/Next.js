export default async function EachDish({ params }){
    const { id } = await params;

    return(
        <div>
            <h1>Dish Details</h1>
            <p>Dish ID: {id}</p>
        </div>
    )
}