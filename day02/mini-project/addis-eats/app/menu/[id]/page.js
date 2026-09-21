import { notFound } from "next/navigation";

async function getDishes() {
  const response = await fetch(
    "http://localhost:3000/dishes.json",
    {
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load dishes");
  }

  return response.json();
}

export async function generateStaticParams() {
  const dishes = await getDishes();

  return dishes.map((dish) => ({
    id: String(dish.id),
  }));
}

export default async function DishPage({ params }) {
  const { id } = await params;

  const dishes = await getDishes();

  const dish = dishes.find(
    (item) => String(item.id) === String(id)
  );

  if (!dish) {
    notFound();
  }

  return (
    <article className="dish-detail">
      <h1>{dish.name}</h1>

      <p>{dish.description}</p>

      <p>
        <strong>Price:</strong> {dish.price} ETB
      </p>

      {dish.category && (
        <p>
          <strong>Category:</strong> {dish.category}
        </p>
      )}

      <button>
        Add to Cart
      </button>
    </article>
  );
}