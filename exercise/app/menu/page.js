import CategoryBar from "./catagoryBar";
import DishList from "./DishList";
import MenuButton from "./MenuButton";

export default function Menu(){
    return(
        <div>
            <h1>Menu</h1>
            <p>Here are our dishes.</p>
            <CategoryBar/>
            <DishList/>
            <MenuButton/>
        </div>
    );
}