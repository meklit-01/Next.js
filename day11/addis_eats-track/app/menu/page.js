import { getDishes } from "@/lib/dishes";
import PageMenu from "./PageMenu";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const page = Math.max(1, Number(params?.page) || 1);

  return {
    title: `Menu — Page ${page}`,
    description: `Browse page ${page} of the Addis Eats Ethiopian food menu.`,
    alternates: {
      canonical: `/menu?page=${page}`,
    },
  };
}

export const revalidate = 60;

export default async function MenuPage({ searchParams }) {
  const params = await searchParams;
  const requestedPage = Math.max(1, Number(params?.page) || 1);

  const allDishes = await getDishes();
  const limit = 6;
  const totalPages = Math.max(1, Math.ceil(allDishes.length / limit));
  const page = Math.min(requestedPage, totalPages);
  const start = (page - 1) * limit;

  const initialData = {
    dishes: allDishes.slice(start, start + limit),
    page,
    totalPages,
  };

  return (
    <div>
      <h1>Our Menu</h1>
      <PageMenu initialData={initialData} />
    </div>
  );
}
