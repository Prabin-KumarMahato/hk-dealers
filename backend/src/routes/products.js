import express from "express";
import Product from "../models/Product.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

/**
 * GET /api/products — public, list all
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products);
  })
);

/**
 * GET /api/products/:id — public, single product
 */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  })
);

/**
 * POST /api/products — admin only
 */
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  })
);

/**
 * PUT /api/products/:id — admin only
 */
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  })
);

/**
 * DELETE /api/products/:id — admin only
 */
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product removed" });
  })
);

export default router;
