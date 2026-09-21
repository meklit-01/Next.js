import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="menu-sidebar">
      <h2>Menu</h2>

      <nav className="sidebar-nav">
        <Link href="/menu">All Dishes</Link>
        <Link href="/menu?category=breakfast">
          Breakfast
        </Link>
        <Link href="/menu?category=lunch">
          Lunch
        </Link>
        <Link href="/menu?category=dinner">
          Dinner
        </Link>
      </nav>
    </aside>
  );
}