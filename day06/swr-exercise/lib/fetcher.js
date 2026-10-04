export default async function fetcher(url) {

    const response = await fetch(url);
    
    if(!response.ok){
        throw new Error("Filed to fetch");
    }

    return response.json();
}