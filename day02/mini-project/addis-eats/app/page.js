import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container">
      <section className="hero">
        <h1>Welcome to Addis Eats</h1>

        <p>
          Discover delicious Ethiopian dishes and order your favorite meals.
        </p>

        <Link href="/menu" className="button">
          View Menu
        </Link>
      </section>
    </div>
  );
}