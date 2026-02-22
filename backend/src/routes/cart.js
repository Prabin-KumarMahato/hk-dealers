import express from "express";
import { cartTotals, getCart, getUserId, store } from "../data/store.js";

const router = express.Router();

router.get("/", (req, res) => {
  const userId = getUserId(req);
  const cart = getCart(userId);
  res.json(cartTotals(cart));
});

router.post("/", (req, res, next) => {
  const userId = getUserId(req);
  const { productId, quantity } = req.body;
  const parsedQuantity = Number(quantity || 1);

  if (!productId || Number.isNaN(parsedQuantity) || parsedQuantity < 1) {
    return next({ status: 400, message: "Invalid product or quantity" });
  }

  const product = store.products.find((item) => item.id === Number(productId));
  if (!product) {
    return next({ status: 404, message: "Product not found" });
  }

  const cart = getCart(userId);
  const existing = cart.find((item) => item.productId === product.id);

  if (existing) {
    existing.quantity += parsedQuantity;
  } else {
    cart.push({ productId: product.id, quantity: parsedQuantity });
  }

  return res.status(201).json(cartTotals(cart));
});

router.patch("/:id", (req, res, next) => {
  const userId = getUserId(req);
  const productId = Number(req.params.id);
  const { quantity } = req.body;
  const parsedQuantity = Number(quantity);

  if (Number.isNaN(parsedQuantity) || parsedQuantity < 1) {
    return next({ status: 400, message: "Invalid quantity" });
  }

  const cart = getCart(userId);
  const existing = cart.find((item) => item.productId === productId);

  if (!existing) {
    return next({ status: 404, message: "Item not in cart" });
  }

  existing.quantity = parsedQuantity;
  return res.json(cartTotals(cart));
});

router.delete("/:id", (req, res, next) => {
  const userId = getUserId(req);
  const productId = Number(req.params.id);
  const cart = getCart(userId);
  const index = cart.findIndex((item) => item.productId === productId);

  if (index === -1) {
    return next({ status: 404, message: "Item not in cart" });
  }

  cart.splice(index, 1);
  return res.json(cartTotals(cart));
});

export default router;
