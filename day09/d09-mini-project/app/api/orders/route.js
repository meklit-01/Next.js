import { getSession } from "@/lib/session";
import { createOrder, getOrdersByUserId } from "@/lib/orders";
import { validateOrder } from "@/lib/schema";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  return Response.json(getOrdersByUserId(session.id));
}

export async function POST(request) {
  const session = await getSession();

  if (!session) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validation = validateOrder(body);

    if (!validation.success) {
      return Response.json(
        { fieldErrors: validation.fieldErrors },
        { status: 422 }
      );
    }

    const order = createOrder(
      {
        name: body.name.trim(),
        phone: body.phone.trim(),
        area: body.area.trim(),
        notes: body.notes?.trim() || "",
      },
      session.id
    );

    return Response.json(order, { status: 201 });
  } catch {
    return Response.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}
