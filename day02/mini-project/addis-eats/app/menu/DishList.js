import Link from "next/link";

async function getDishes() {
  const response = await fetch("/dishes.json")

  if (!response.ok) {
    throw new Error("Failed to load dishes");
  }

  return response.json();
}

export default async function DishList() {
  const dishes = await getDishes();

  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <article className="dish-card" key={dish.id}>
          <h2>{dish.name}</h2>

          <p>{dish.description}</p>

          <p className="price">
            {dish.price} ETB
          </p>

          <Link href={`/menu/${dish.id}`}>
            View Details
          </Link>
        </article>
      ))}
    </div>
  );
}

