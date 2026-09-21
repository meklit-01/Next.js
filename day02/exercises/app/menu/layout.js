 "use client"
 import { useState } from "react";
export default function Menu({children}){
   
    const [counter, setCouter] = useState(0)

    function add(){
        setCouter(counter+1);
    }

     return(
        <div> 
            <button onClick={add}>Counter:{counter}</button>
            <div className="menu-layout">
            <aside>
                <ul>
                    <li>All</li>
                    <li>Main</li>
                    <li>side</li>
                </ul>
            </aside>

            {children} 
            
        </div>
        </div>
        
     );
          
}