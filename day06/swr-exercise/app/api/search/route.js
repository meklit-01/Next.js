

export async function GET(request){
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";
    const page = searchParams.get("page") || "1";

    return Response.json(
        {
            results: q
        ? [`Result for "${q}" - page ${page}`,
            `Another result - page ${page}`,
        ]
        :[],
        }
    );
}