import { Suspense } from "react";
import DishList from "./DishList";

export const revalidate = 60;

function DishListLoading() {
  return (
    <div className="loading">
      <p>Loading dishes...</p>
    </div>
  );
}

export default function MenuPage() {
  return (
    <div>
      <h1>Our Menu</h1>

      <p>
        Explore delicious Ethiopian dishes.
      </p>

      <Suspense fallback={<DishListLoading />}>
        <DishList />
      </Suspense>
    </div>
  );
}