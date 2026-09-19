import Link  from "next/link";

export default function Navbar(){
    return(
        <div>
            <nav>
                <Link href="/">Home</Link>
                {" | "}
                 <Link href="/menu">Menu</Link>
                 {" | "}
                  <Link href="/cart">Cart</Link>
                  {" | "}
                   <Link href="/checkout">Checkout</Link>
            </nav>
        </div>
    )
}