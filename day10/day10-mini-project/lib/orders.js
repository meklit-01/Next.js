let orders = [];

export function createOrder(data, userId) {
  const order = {
    id: String(Date.now()),
    name: data.name,
    phone: data.phone,
    area: data.area,
    notes: data.notes || "",
    userId,
    status: "processing",
    createdAt: new Date().toISOString(),
  };

  orders.push(order);
  return order;
}

export function getOrdersByUserId(userId) {
  return orders.filter((order) => order.userId === userId);
}

export function getOrderByIdForUser(id, userId) {
  return orders.find(
    (order) =>
      String(order.id) === String(id) &&
      order.userId === userId
  );
}

export function getAllOrders() {
  return orders;
}

export function deleteOrder(id, userId) {
  const order = getOrderByIdForUser(id, userId);

  if (!order) {
    return false;
  }

  orders = orders.filter((item) => item.id !== order.id);
  return true;
}
