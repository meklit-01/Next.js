import  Link  from "next/link";
import { getDishes } from "../../lib/dishes";
import DishList from "./DishList";
import FilterShell from "./FilterShell";
import PageMenu from "./PageMenu";

export const revalidate = 60;

export default async function MenuPage({ searchParams }) {

  const params = await searchParams;
  const page = Number(params.page) || 1;
 

  const allDishes = await getDishes();

  const limit = 3;
  const start = (page - 1) * limit;
  const dishes = allDishes.slice(start, start + limit);

  const totalPages = Math.ceil(
    allDishes.length / limit
  );
 const initialData ={
  dishes,
  page,
  totalPages,
 }

  return (
    <div>
      <h1>Our Menu</h1>

      <FilterShell>
        <PageMenu
          initialData={initialData}
          page={page}
          />
      </FilterShell>
    </div>
  );
}