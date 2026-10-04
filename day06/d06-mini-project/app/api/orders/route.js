import { validateOrder } from "@/lib/schema";
import { createOrder, getOrders } from "@/lib/orders";

export async function GET() {
  return Response.json(getOrders(), {
    status: 200,
  });
}

export async function POST(request) {
  try{
    const body = await request.json();

    const validation = validateOrder(body);

    if(!validation.success){
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
        note: body.note?.trim() || "",
      },

      "api-user"
    );
  } catch (error){
    return Response.json(
      {
        massage: "Order created successfully.",
        order,
      },
      {
        status:400,
      }
    );
  }
}