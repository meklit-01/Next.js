
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { validateOrder } from "@/lib/schema";
import {
  createOrder,
  getOrderById,
  deleteOrder,
} from "@/lib/orders";

export async function placeOrder(previousState, formData) {
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
      fieldErrors: validation.fieldErrors,
    };
  }

  const cookieStore = await cookies();

  let sessionId = cookieStore.get("session")?.value;

  if (!sessionId) {
    sessionId = crypto.randomUUID();

    cookieStore.set("session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }

  const order = createOrder({
    name,
    phone,
    area,
    notes,
    userId: sessionId,
  });

  revalidatePath("/orders");

  return {
    success: true,
    order,
    fieldErrors: {},
  };
}

export async function cancelOrder(orderId) {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get("session")?.value;

  if (!sessionId) {
    return {
      error: "You must be signed in.",
    };
  }

  const order = getOrderById(orderId);

  if (!order) {
    return {
      error: "Order not found.",
    };
  }

  if (order.userId !== sessionId) {
    return {
      error: "You are not allowed to cancel this order.",
    };
  }

  deleteOrder(orderId);

  revalidatePath("/orders");

  return {
    success: true,
  };
}

