export function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
}

export function getOrders() {
  return readJSON('unheladito_orders', []);
}

export function saveOrder(order) {
  const orders = getOrders();
  const next = [{ ...order, id: order.id || `UH-${Date.now()}`, createdAt: new Date().toISOString() }, ...orders];
  writeJSON('unheladito_orders', next);
  return next[0];
}
