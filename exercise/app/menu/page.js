
import CategoryBar from "./catagoryBar";
import DishList from "./DishList";
import MenuButton from "./MenuButton";

export default async function Menu(){

    // throw new Error("error"); testing menu error

    await new Promise((resolve) => setTimeout(resolve, 5000));
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