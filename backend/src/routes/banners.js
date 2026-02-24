import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import Banner from "../models/Banner.js";

const router = express.Router();

/**
 * @desc Get all banners (Active only or all if admin)
 * @route GET /api/banners
 * @access Public
 */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const isAdmin = req.user && req.user.role === "admin";
    // If not admin fetching, only show active banners
    const filter = isAdmin ? {} : { isActive: true };
    const banners = await Banner.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(banners);
  }),
);

/**
 * @desc Create a new banner
 * @route POST /api/banners
 * @access Private/Admin
 */
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  asyncHandler(async (req, res, next) => {
    const { title, subtitle, image, linkURL, isActive, order } = req.body;

    if (!title || !image) {
      res.status(400);
      throw new Error("Title and Image are required for a banner");
    }

    const banner = new Banner({
      title,
      subtitle,
      image,
      linkURL,
      isActive,
      order,
    });

    const createdBanner = await banner.save();
    res.status(201).json(createdBanner);
  }),
);

/**
 * @desc Update a banner
 * @route PUT /api/banners/:id
 * @access Private/Admin
 */
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  asyncHandler(async (req, res, next) => {
    const { title, subtitle, image, linkURL, isActive, order } = req.body;
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      res.status(404);
      throw new Error("Banner not found");
    }

    banner.title = title || banner.title;
    if (subtitle !== undefined) banner.subtitle = subtitle;
    banner.image = image || banner.image;
    if (linkURL !== undefined) banner.linkURL = linkURL;
    if (isActive !== undefined) banner.isActive = isActive;
    if (order !== undefined) banner.order = order;

    const updatedBanner = await banner.save();
    res.json(updatedBanner);
  }),
);

/**
 * @desc Delete a banner
 * @route DELETE /api/banners/:id
 * @access Private/Admin
 */
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  asyncHandler(async (req, res, next) => {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      res.status(404);
      throw new Error("Banner not found");
    }
    await banner.deleteOne();
    res.json({ message: "Banner removed successfully" });
  }),
);

export default router;
