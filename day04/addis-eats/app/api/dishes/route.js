import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "dishes.json"
    );

    const file = await fs.readFile(filePath, "utf-8");
    const dishes = JSON.parse(file);

    return Response.json(dishes, {
      status: 200,
    });
  } catch (error) {
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