"use client"

export default function Error({ error, reset }){
   return(
     <div>
        <h1>something went wrong!</h1>

        <p>{error.massage}</p>

        <button onClick={() => reset()}>Try Again</button>
    </div>
   )
}