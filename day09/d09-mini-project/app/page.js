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
        alt="Addis Eats Ethiopian food"
        width={960}
        height={540}
        sizes="(max-width: 960px) 100vw, 960px"
        priority
      />

      <p>Delicious Ethiopian food and drinks.</p>

      <Link href="/menu">View Menu</Link>
    </div>
  );
}
