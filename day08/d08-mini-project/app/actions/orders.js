"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { validateOrder } from "@/lib/schema";
import {
  createOrder,
  deleteOrder,
  getOrderByIdForUser,
} from "@/lib/orders";

export async function placeOrder(previousState, formData) {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message: "You must be signed in before placing an order.",
      fieldErrors: {},
    };
  }

  const name = formData.get("name")?.trim();
  const phone = formData.get("phone")?.trim();
  const area = formData.get("area")?.trim();
  const notes = formData.get("notes")?.trim();

  const validation = validateOrder({
    name,
    phone,
    area,
    notes,
  });

  if (!validation.success) {
    return {
      success: false,
      message: "",
      fieldErrors: validation.fieldErrors,
    };
  }

  const order = createOrder(
    { name, phone, area, notes },
    session.id
  );

  revalidatePath("/orders");
  revalidatePath("/order-status");

  return {
    success: true,
    message: "Order placed successfully.",
    order,
    fieldErrors: {},
  };
}

export async function cancelOrder(orderId) {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message: "You must be signed in.",
    };
  }

  const order = getOrderByIdForUser(orderId, session.id);

  if (!order) {
    return {
      success: false,
      message: "Order not found or you do not own this order.",
    };
  }

  deleteOrder(orderId, session.id);

  revalidatePath("/orders");
  revalidatePath("/order-status");

  return {
    success: true,
    message: "Order cancelled.",
  };
}
