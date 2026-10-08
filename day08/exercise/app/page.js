import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div>
          <h1>Welcome</h1>

          <p>
            Explore Foods
          </p>

          <button>Explore</button>
        </div>

        <Image
          src="/hero.jfif"
          alt="Beautiful landscape"
          width={1200}
          height={800}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </section>

      <section className="content">
        <h2>Our Content</h2>

        <p>
          Next.js Image automatically helps optimize images,
          while next/font helps reduce layout shift.
        </p>

        <Image
          src="/food.jfif"
          alt="Delicious food"
          width={800}
          height={600}
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </section>
    </main>
  );
}