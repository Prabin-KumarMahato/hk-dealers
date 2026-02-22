import express from "express";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

/**
 * GET /api/admin/stats
 * Returns: totalUsers, totalOrders, totalProducts, totalRevenue
 */
router.get(
  "/stats",
  asyncHandler(async (req, res) => {
    const [totalUsers, totalProducts, orderStats] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.aggregate([
        { $group: { _id: null, count: { $sum: 1 }, totalRevenue: { $sum: "$totalPrice" } } },
      ]),
    ]);

    const totalOrders = orderStats[0]?.count ?? 0;
    const totalRevenue = orderStats[0]?.totalRevenue ?? 0;

    res.json({
      totalUsers,
      totalOrders,
      totalProducts,
      totalRevenue,
    });
  })
);

export default router;
