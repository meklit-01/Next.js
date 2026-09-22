import fs from "fs/promises";
import path from "path";

export async function getDishes() {
  const filePath = path.join(
    process.cwd(),
    "public",
    "dishes.json"
  );

  const file = await fs.readFile(filePath, "utf-8");

  return JSON.parse(file);
}