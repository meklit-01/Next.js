import Image from "next/image";
import Link from "next/link";

export default function DishList({ dishes }) {
  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <article key={dish.id}>
          <Image
            src={`/${dish.image}`}
            alt={dish.name}
            width={320}
            height={220}
            sizes="(max-width: 700px) 100vw, 320px"
          />
          <h2>{dish.name}</h2>
          <p>{dish.description}</p>
          <p>{dish.price} ETB</p>
          <Link href={`/menu/${dish.id}`}>View Details</Link>
        </article>
      ))}
    </div>
  );
}
