import Link from "next/link"
import { menu } from "../data/menu"

export default function DishList() {
  return (
    <div>
      {menu.map((dish) => (
        <div key={dish.id}>
          <h2>{dish.name}</h2>

          <p>{dish.description}</p>

          <p>Price: {dish.price} ETB</p>

          <Link href={`/menu/${dish.id}`}>
            View Details
          </Link>

          <hr />
        </div>
      ))}
    </div>
  )
}