import { getSession } from "@/lib/session";
import { getOrdersByUserId } from "@/lib/orders";
import { etb, when } from "@/lib/format";

function csvCell(value) {
  const text = value == null ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized." }, { status: 401 });
  const orders = getOrdersByUserId(session.id);
  const rows = [
    ["Order ID", "Customer", "Phone", "Neighbourhood", "Notes", "Status", "Created At", "Total ETB"],
    ...orders.map((order) => [order.id, order.name, order.phone, order.area, order.notes, order.status, when(order.createdAt), (order.total ?? order.amount) == null ? "" : etb(order.total ?? order.amount)]),
  ];
  const csv = rows.map((row) => row.map(csvCell).join(",")).join("\r\n") + "\r\n";
  return new Response("\uFEFF" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="addis-eats-order-history.csv"',
      "Cache-Control": "private, no-store",
    },
  });
}
