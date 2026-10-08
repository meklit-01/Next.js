import Image from "next/image";
import { notFound } from "next/navigation";
import { getDishes } from "@/lib/dishes";

export async function generateStaticParams() {
  const dishes = await getDishes();

  return dishes.map((dish) => ({
    id: String(dish.id),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dishes = await getDishes();
  const dish = dishes.find((item) => String(item.id) === String(id));

  if (!dish) {
    return {
      title: "Dish not found",
      description: "The requested Addis Eats dish could not be found.",
    };
  }

  return {
    title: dish.name,
    description: `${dish.name}: ${dish.description}`,
    alternates: {
      canonical: `/menu/${dish.id}`,
    },
    openGraph: {
      title: dish.name,
      description: dish.description,
      images: [`/menu/${dish.id}/opengraph-image`],
    },
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dishes = await getDishes();

  const dish = dishes.find(
    (item) => String(item.id) === String(id)
  );

  if (!dish) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.description,
    offers: {
      "@type": "Offer",
      price: String(dish.price),
      priceCurrency: "ETB",
    },
  };

  return (
    <article>
      <h1>{dish.name}</h1>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <Image
        src={`/${dish.image}`}
        alt={`${dish.name} from the Addis Eats menu`}
        width={dish.width}
        height={dish.height}
        sizes="(max-width: 800px) 100vw, 640px"
      />

      <p>{dish.description}</p>
      <p>{dish.price} ETB</p>
    </article>
  );
}
