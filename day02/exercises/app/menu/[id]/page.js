import { notFound } from "next/navigation"
import { menu } from "../../data/menu"

export default async function SingleDish({ params }) {
  const { id } = await params

  const dish = menu.find((item) => String(item.id) === String(id))

  if (!dish) {
    notFound()
  }

  return (
    <div>
      <h1>{dish.name}</h1>
      <p>{dish.description}</p>
      <p>Price: {dish.price} ETB</p>
      <p>Category: {dish.category}</p>
    </div>
  )
}