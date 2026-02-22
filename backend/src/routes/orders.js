import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

/**
 * POST /api/orders — customer creates order (no auth)
 * Body: { name, address, mobile, email, message?, items: [{ productId, qty } or { productId, quantity }], totalPrice? }
 */
router.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const { name, address, mobile, email, message, items, totalPrice: clientTotal } = req.body;

      if (!name || !address || !mobile || !email) {
        return res.status(400).json({
          message: "name, address, mobile and email are required",
        });
      }

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "items array is required" });
      }

      let totalPrice = 0;
      const orderItems = [];

      for (const item of items) {
        const productId = item.productId;
        if (!productId) {
          return res.status(400).json({ message: "Each item must have productId" });
        }
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({ message: `Product not found: ${productId}` });
        }
        const qty = Math.max(1, Number(item.qty ?? item.quantity) || 1);
        if (product.stock < qty) {
          return res.status(400).json({
            message: `Not enough stock for ${product.name}. Available: ${product.stock}`,
          });
        }
        const price = product.price;
        totalPrice += price * qty;
        orderItems.push({ product: product._id, qty, price });
      }

      const order = await Order.create({
        name: String(name).trim(),
        address: String(address).trim(),
        mobile: String(mobile).trim(),
        email: String(email).trim().toLowerCase(),
        message: message != null ? String(message).trim() : "",
        items: orderItems,
        totalPrice,
        status: "pending",
      });

      for (const item of orderItems) {
        await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.qty } });
      }

      const populated = await Order.findById(order._id)
        .populate("items.product", "name image price")
        .lean();

      res.status(201).json(populated);
    } catch (error) {
      console.error("Order create error:", error);
      return res.status(500).json({ message: error.message || "Order failed" });
    }
  })
);

/**
 * GET /api/orders — admin only, all orders
 */
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate("items.product", "name image price");
    res.json(orders);
  })
);

/**
 * PUT /api/orders/:id/status — admin only
 * Body: { status: "pending" | "paid" | "shipped" | "delivered" }
 */
router.put(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  asyncHandler(async (req, res) => {
    const { status } = req.body;
    const allowed = ["pending", "paid", "shipped", "delivered"];
    if (!status || !allowed.includes(status)) {
      return res.status(400).json({
        message: `status must be one of: ${allowed.join(", ")}`,
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate("items.product", "name image price");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  })
);

export default router;
