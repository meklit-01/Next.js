import { NextResponse } from "next/server";

const dishes = [
  {
    id: "1",
    name: "Doro Wet",
    price: 250,
  },
  {
    id: "2",
    name: "Kitfo",
    price: 300,
  },
  {
    id: "3",
    name: "Shiro",
    price: 150,
  },
];

export async function GET(request, { params }) {
  const { id } = await params;

  const dish = dishes.find((dish) => dish.id === id);

  if (!dish) {
    return NextResponse.json(
      {
        error: {
          code: "not-found",
          message: "Dish not found",
        },
      },
      { status: 404 }
    );
  }

  return NextResponse.json(dish);
}