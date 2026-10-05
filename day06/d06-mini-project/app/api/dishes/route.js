import fs from "fs/promises";
import { request } from "http";
import path from "path";

export async function GET(request) {
  try {
   const { searchParams } = new URL(request.url);
   const page = Number(searchParams.get("page")) || 1;
   const limit = 3;

  const filePath = path.join(
    process.cwd(),
    "public",
    "dishes.json"
   );
   
    const file = await fs.readFile(filePath, "utf-8");
    const dishes = JSON.parse(file);

    const start = (page - 1) * limit;
    const end = start + limit;

   const results = dishes.slice(start, end); 

    return Response.json({
      dishes: results,
      page: page,
      totalPages: Math.ceil(dishes.length / limit),
    });
  } catch (error) {
    console.error("Dishes API error: ", error);

    return Response.json(
      {
        error: "Failed to load dishes.",
      },
      {
        status: 500,
      }
    );
  }
}