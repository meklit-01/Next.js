import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Home",
  description:
    "Discover Ethiopian dishes and drinks from the Addis Eats menu.",
};

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Addis Eats</h1>

      <Image
        src="/images/homePage.png"
        alt="Ethiopian food and drinks from Addis Eats"
        width={1774}
        height={887}
        sizes="(max-width: 1100px) 100vw, 1100px"
        priority
      />

      <p>Delicious Ethiopian food and drinks.</p>

      <Link href="/menu">View Menu</Link>
    </div>
  );
}
