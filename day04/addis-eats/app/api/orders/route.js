import { validateOrder } from "@/lib/schema";
import { createOrder } from "@/lib/orders";

export async function POST(request) {
  try {
    const body = await request.json();

    const validation = validateOrder(body);

    if (!validation.success) {
      return Response.json(
        {
          fieldErrors: validation.fieldErrors,
        },
        {
          status: 422,
        }
      );
    }

    const order = createOrder(
      {
        name: body.name.trim(),
        phone: body.phone.trim(),
        area: body.area.trim(),
        notes: body.notes?.trim() || "",
      },
      "api-user"
    );

    return Response.json(
      {
        message: "Order created successfully.",
        order,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return Response.json(
      {
        error: "Invalid request.",
      },
      {
        status: 400,
      }
    );
  }
}