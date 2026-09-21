import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container not-found">
      <h1>Dish Not Found</h1>

      <p>
        Sorry, we couldn't find that dish.
      </p>

      <Link href="/menu" className="button">
        Back to Menu
      </Link>
    </div>
  );
}