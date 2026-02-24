import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import Banner from "../models/Banner.js";

const router = express.Router();

/**
 * @desc Get all banners (Active only or all if admin)
 * @route GET /api/banners
 * @access Public
 */
router.get("/", async (req, res, next) => {
  try {
    const isAdmin = req.user && req.user.role === "admin";
    // If not admin fetching, only show active banners
    const filter = isAdmin ? {} : { isActive: true };
    const banners = await Banner.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(banners);
  } catch (error) {
    next(error);
  }
});

/**
 * @desc Create a new banner
 * @route POST /api/banners
 * @access Private/Admin
 */
router.post("/", protect, admin, async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
});

/**
 * @desc Update a banner
 * @route PUT /api/banners/:id
 * @access Private/Admin
 */
router.put("/:id", protect, admin, async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
});

/**
 * @desc Delete a banner
 * @route DELETE /api/banners/:id
 * @access Private/Admin
 */
router.delete("/:id", protect, admin, async (req, res, next) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      res.status(404);
      throw new Error("Banner not found");
    }
    await banner.deleteOne();
    res.json({ message: "Banner removed successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;
