"use client";


import { useState } from "react";
import { CreateOrder } from "./actions";
export default function checkOut(){
     const [form, setForm] = useState({
        name:"",
        phone:"",
        area:"Bole",
        notes:"",
     });


    const [errors, setErrors] = useState({});
    const [massage, setMessage] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        setErrors({});
        setMessage("");

        const data = await response.json();

        if(response.status === 422){
          setErrors(data.fieldErrors);
          return;
        }
        if(!response.ok){
            setMessage("something went wrong. ");
            return;
        }

        setMessage("Order created successfully!");
    }

    function handleChange(event){
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    }
    return(
        <main>
            <h1>CheckOut</h1>

            <form action={CreateOrder}>
                <input name="name" placeholder="Name" value={form.name}
                onChange={handleChange}/>
                {errors.name && <p>{errors.name}</p>}

                <input name="phone" placeholder="phone"
                value={form.phone}
                onChange={handleChange}/>
                {errors.name && <p>{errors.phone}</p>}

                <select
                  name="area"
                  value={form.area}
                  onChange={handleChange}
                  >
                    <option value="Bole">Bole</option>
                    <option value="Kasanchis">Kasanchis</option>
                    <option value="Megenagna">Megenagna</option>
                    <option value="piassa">piassa</option>
                  </select>

                  {errors.area && <p>{errors.area}</p>}

                  <textarea
                    name="notes"
                    placeholder="Notes"
                    value={form.notes}
                    onChange={handleChange}/>

                <button type="submit">
                    order
                </button>


            </form>
            {massage && <p>{massage}</p>}
        </main>
    )
}
