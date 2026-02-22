import { products } from "./products.js";

export const store = {
  products: [...products],
  users: [],
  carts: new Map(),
  orders: []
};

export function getUserId(req) {
  return req.header("x-user-id") || "guest";
}

export function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
}

export function getCart(userId) {
  if (!store.carts.has(userId)) {
    store.carts.set(userId, []);
  }

  return store.carts.get(userId);
}

export function cartTotals(cartItems) {
  const items = cartItems.map((item) => {
    const product = store.products.find((entry) => entry.id === item.productId);
    return {
      ...item,
      product,
      lineTotal: product ? product.price * item.quantity : 0
    };
  });

  const total = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return { items, total, count };
}
