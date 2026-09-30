"use client";


import { useState } from "react";
import { createOrder } from "./actions";
import { useActionState } from "react";

 const initialState = {
  success: false,
  fieldErrors: {},
  message: "",
}; 
export default function checkOut(){
     const [state, formAction, pending] = useActionState(
    createOrder,
    initialState
  );


    return(
        <main>
            <h1>CheckOut</h1>

            <form action={formAction}>
                <input name="name" placeholder="Name" />
               
               {state.fieldErrors?.name && ( <p>{state.fieldErrors.name}</p>)}

                <input name="phone" placeholder="phone"
               />
                {state.fieldErrors?.phone && ( <p>{state.fieldErrors.phone}</p>)}

                <select
                  name="area"
                  defaultValue={"Bole"}
                  >
                    <option value="Bole">Bole</option>
                    <option value="Kasanchis">Kasanchis</option>
                    <option value="Megenagna">Megenagna</option>
                    <option value="piassa">piassa</option>
                  </select>

                  {state.fieldErrors.area && (<p>{state.fieldErrors.area}</p>)}

                  <textarea
                    name="notes"
                    placeholder="Notes"
                    />

                <button type="submit" disabled={pending}>
                    {pending ? "submitting..." : "Place order"}
                </button>


            </form>
            {state.message && <p>{state.message}</p>}
        </main>
    )
}
