"use server";

export async function cancelOrder(orderId) {
  // 1. Get the current session.
  const session = await getSession();

  // 2. Make sure the user is logged in.
  if (!session) {
    return {
      success: false,
      error: "You must be logged in.",
    };
  }

  // 3. Find the order.
  const order = await getOrder(orderId);

  // 4. Check that the order exists.
  if (!order) {
    return {
      success: false,
      error: "Order not found.",
    };
  }

  // 5. Check that the logged-in user owns the order.
  if (order.userId !== session.user.id) {
    return {
      success: false,
      error: "You are not allowed to cancel this order.",
    };
  }

  // 6. Only now modify the database.
  await updateOrder(orderId, {
    status: "cancelled",
  });

  return {
    success: true,
    message: "Order cancelled.",
  };
}