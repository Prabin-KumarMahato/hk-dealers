import express from "express";
import User from "../models/User.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

// All user routes require admin
router.use(authMiddleware);
router.use(adminMiddleware);

/**
 * GET /api/users — admin: list all users
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 });
    res.json(users);
  }),
);

/**
 * GET /api/users/:id — admin: get one user
 */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  }),
);

/**
 * DELETE /api/users/:id — admin: delete user
 */
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User removed" });
  }),
);

export default router;
