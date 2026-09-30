"use server";

import { revalidatePath } from "next/cache";

export async function createOrder(previousState, formData) {
  const name = formData.get("name");
  const phone = formData.get("phone");
  const area = formData.get("area");
  const notes = formData.get("notes");

  const fieldErrors = {};

  if (!name || name.trim() === "") {
    fieldErrors.name = "Name is required.";
  }

  if (!phone || phone.trim() === "") {
    fieldErrors.phone = "Phone number is required.";
  }

  if (!["Bole", "Kazanchis", "Megenagna", "Piassa"].includes(area)) {
    fieldErrors.area = "Please select a valid area.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      fieldErrors,
    };
  }

  // Save the order here.

  revalidatePath("/checkout");

  return {
    success: true,
    message: "Order created successfully!",
    fieldErrors: {},
  };
}