
import Link from "next/link";

export default function Home() {
  return (
    <div >
      <h1>WHELCOME HOME</h1>
      <Link href={"/dashboard"}>Go to Dashboard</Link>
    </div>
  );
}
