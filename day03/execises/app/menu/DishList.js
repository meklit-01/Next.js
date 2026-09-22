import Link from "next/link";

export default function DishList({ dishes }) {
  return (
    <div>
      {dishes.map((dish) => (
        <div key={dish.id}>
          <h2>{dish.name}</h2>

          <p>{dish.description}</p>

          <p>{dish.price} ETB</p>

          <Link href={`/menu/${dish.id}`}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}