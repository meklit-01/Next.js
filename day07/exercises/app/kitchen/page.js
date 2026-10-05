import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function KitchenPage() {
  const session = await getSession();

  if (!session || session.role !== "staff") {
    redirect("/");
  }

  return (
    <div>
      <h1>Kitchen</h1>
      <p>Staff only.</p>
    </div>
  );
}