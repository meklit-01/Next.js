import fs from "fs/promises";
import path from "path";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim().toLowerCase() || "";

    if(!query){
        return Response.json([]);
    }
    
    try {
        const filePath = path.join(
            process.cwd(),
            "public",
            "dishes.json"
        );

        const file = await fs.readFile(filePath, "utf8");
        const dishes = JSON.parse(file);

        const results = dishes.filter((dish)=> dish.name.toLowerCase().includes(query));
        return Response.json(results);
    }catch (error){
        return Response.json(
            {
                error: "Failed to search dishes.",
            },
            {
                status: 500,
            }
        );
    }
}