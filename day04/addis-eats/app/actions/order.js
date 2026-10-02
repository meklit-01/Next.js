"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { validateOrder } from "@/lib/schema";
import { createOrder, getOrderById, deleteOrder } from "@/lib/orders";

export async function placeOrder(previousState, formData) {
  const name = formData.get("name")?.toString() || "";
  const phone = formData.get("phone")?.toString() || "";
  const area = formData.get("area")?.toString() || "";
  const notes = formData.get("notes")?.toString() || "";

  const data = {
    name,
    phone,
    area,
    notes,
  };

  const validation = validateOrder(data);

  if (!validation.success) {
    return {
      success: false,
      fieldErrors: validation.fieldErrors,
      message: "Please fix the errors.",
    };
  }

  const cookieStore = await cookies();

  let session = cookieStore.get("session");

  if (!session) {
    const sessionId = crypto.randomUUID();

    cookieStore.set("session", sessionId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    session = {
      value: sessionId,
    };
  }

  const order = createOrder(data, session.value);

  revalidatePath("/orders");

  return {
    success: true,
    fieldErrors: {},
    message: "Order placed successfully.",
    order,
  };
}

export async function cancelOrder(orderId) {

    const cookieStore = await cookies();

    const session = cookieStore.get("session");

    if(!session){
        return {
            success: false,
            message: "You must be logged in.",
        };
    }

    const order = getOrderById(orderId);

    if(!order){
        return{
            success: false,
            message: "Order not found.",
        };
    }
    
    if(order.userId !== session.value){
        return{
            success: false,
            message: "You are not allowed to cancel this order."
        };
    }

    deleteOrder(orderId);

    revalidatePath("/orders");

    return{
        success: true,
        message:"Order cancelled.",
    }
}