import Link from "next/link";
import dishes from "@/lib/dishes";

export const metadata = {
  title: "Menu",
  description:
    "Browse Ethiopian dishes, prices, and delicious food from Addis Eats.",
};

export default function MenuPage() {
  return (
    <main>
      <h1>Our Menu</h1>

      {dishes.map((dish) => (
        <div key={dish.id}>
          <h2>{dish.name}</h2>
          <p>{dish.summary}</p>
          <p>{dish.price} ETB</p>

          <Link href={`/menu/${dish.id}`}>
            View dish
          </Link>
        </div>
      ))}
    </main>
  );
}