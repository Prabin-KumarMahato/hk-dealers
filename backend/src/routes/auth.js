import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Auth API OK", endpoints: ["POST /login"] });
});

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Returns: JWT (id, role) + user fields. 401 on invalid credentials.
 */
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: String(email).trim().toLowerCase() }).select(
      "+password"
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(String(password), user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  })
);

export default router;
