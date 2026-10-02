import fs from "fs/promises";
import path from "path";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const filePath = path.join(
      process.cwd(),
      "public",
      "dishes.json"
    );

    const file = await fs.readFile(filePath, "utf-8");
    const dishes = JSON.parse(file);

    const dish = dishes.find(
      (item) => String(item.id) === String(id)
    );

    if (!dish) {
      return Response.json(
        {
          error: "Dish not found.",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(dish, {
      status: 200,
    });
  } catch (error) {
    return Response.json(
      {
        error: "Failed to load dish.",
      },
      {
        status: 500,
      }
    );
  }
}