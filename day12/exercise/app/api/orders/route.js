import dishes from "@/lib/menu";

// In-memory demo store only. A production app must use a database unique constraint.
const globalForOrders = globalThis;
if (!globalForOrders.day48Orders) globalForOrders.day48Orders = [];
if (!globalForOrders.day48Idempotency) globalForOrders.day48Idempotency = new Map();

export async function GET() {
  return Response.json({ orders: globalForOrders.day48Orders });
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Please submit valid form data." }, { status: 400 });
  }

  const customer = typeof body.customer === "string" ? body.customer.trim() : "";
  const dish = dishes.find((item) => item.id === body.dishId);
  const submissionId = request.headers.get("Idempotency-Key") || body.submissionId;

  if (customer.length < 2 || customer.length > 80) {
    return Response.json({ error: "Enter a name between 2 and 80 characters." }, { status: 422 });
  }
  if (!dish) return Response.json({ error: "Choose a valid dish." }, { status: 422 });
  if (typeof submissionId !== "string" || submissionId.length < 8 || submissionId.length > 100) {
    return Response.json({ error: "Missing or invalid submission ID." }, { status: 400 });
  }

  const previous = globalForOrders.day48Idempotency.get(submissionId);
  if (previous) return Response.json({ order: previous, duplicate: true });

  const order = {
    id: `AE-${Date.now().toString(36).toUpperCase()}-${(globalForOrders.day48Orders.length + 1).toString().padStart(3, "0")}`,
    customer,
    dishId: dish.id,
    dishName: dish.name,
    total: dish.price,
    status: "received",
    createdAt: new Date().toISOString(),
  };

  globalForOrders.day48Idempotency.set(submissionId, order);
  globalForOrders.day48Orders.push(order);
  return Response.json({ order, duplicate: false }, { status: 201 });
}
