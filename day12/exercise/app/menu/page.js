import Link from "next/link";
import dishes from "@/lib/menu";
import { etb } from "@/lib/format";

export const metadata = { title: "Menu" };

export default function MenuPage() {
  return (
    <main id="main-content" className="container">
      <p className="eyebrow">Our sample menu</p>
      <h1>Choose a dish</h1>
      <p>Every action is a real link or button, not a clickable div.</p>
      <div className="card-grid">
        {dishes.map((dish) => (
          <article className="card" key={dish.id}>
            <h2>{dish.name}</h2>
            <p>{dish.description}</p>
            <p className="price">{etb(dish.price)}</p>
            <Link className="button-link" href={`/checkout?dish=${dish.id}`}>Order {dish.name}</Link>
          </article>
        ))}
      </div>
    </main>
  );
}
