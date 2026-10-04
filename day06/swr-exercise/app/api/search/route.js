import { json } from "express";

export default function GET(request){
    const { searchParams } = new URL(request.url);
    const q = searchParamsget("q") || "";

    return Response,json(
        {
            results: q
        ? [`Result for "${q}`]
        :[],
        }
    );
}