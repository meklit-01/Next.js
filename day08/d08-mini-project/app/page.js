import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Addis Eats</h1>

      <p>
        Delicious Ethiopian food.
      </p>

      <Link href="/menu">
        View Menu
      </Link>
    </div>
  );
}