let orders = [];

export function createOrder(data, userId) {
  const order = {
    id: String(Date.now()),
    name: data.name,
    phone: data.phone,
    area: data.area,
    notes: data.notes || "",
    userId,
    createdAt: new Date().toISOString(),
  };

  orders.push(order);

  return order;
}

export function getOrders() {
  return orders;
}

export function getOrderById(id) {
  return orders.find(
    (order) => String(order.id) === String(id)
  );
}

export function deleteOrder(id) {
  orders = orders.filter(
    (order) => String(order.id) !== String(id)
  );
}