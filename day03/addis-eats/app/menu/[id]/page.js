import { getDishes } from "@/app/lib/dishes";
import { notFound } from "next/navigation";

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
    <div>
      <h1>{dish.name}</h1>

      <p>{dish.description}</p>

      <p>{dish.price} ETB</p>
    </div>
  );
}