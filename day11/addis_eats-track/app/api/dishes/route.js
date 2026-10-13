import fs from "fs/promises";
import path from "path";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestedPage = Number(searchParams.get("page")) || 1;
    const page = Math.max(1, requestedPage);
    const limit = 6;

    const filePath = path.join(
      process.cwd(),
      "public",
      "dishes.json"
    );

    const file = await fs.readFile(filePath, "utf-8");
    const dishes = JSON.parse(file);

    const totalPages = Math.max(1, Math.ceil(dishes.length / limit));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * limit;

    return Response.json({
      dishes: dishes.slice(start, start + limit),
      page: safePage,
      totalPages,
    });
  } catch {
    return Response.json(
      { error: "Failed to load dishes." },
      { status: 500 }
    );
  }
}
