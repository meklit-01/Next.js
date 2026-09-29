import { NextResponse } from "next/server";

const dishes =[
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

export async function GET() {
    return NextResponse.json(dishes);
}
