import { getSession } from "@/lib/session";
import orders from "@/lib/orders";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const userOrders = orders.filter(
    (order) => order.sessionId === session.id
  );

  return Response.json(userOrders);
}