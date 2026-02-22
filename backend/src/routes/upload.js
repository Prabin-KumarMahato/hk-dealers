// src/routes/upload.js

import express from "express";
import { upload } from "../middleware/upload.js";

const router = express.Router();

function hasCloudinaryEnv() {
  return (
    process.env.CLOUD_NAME &&
    process.env.CLOUD_KEY &&
    process.env.CLOUD_SECRET
  );
}

router.post("/", (req, res, next) => {
  if (!hasCloudinaryEnv()) {
    return res.status(503).json({
      message:
        "Image upload not configured. Set CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET in server .env",
    });
  }

  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error("[Upload] Middleware error:", err.message || err);
      return next(err);
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const imageUrl =
      req.file.path || req.file.secure_url || req.file.url || "";
    if (!imageUrl) {
      console.error("[Upload] No URL in req.file:", req.file);
      return res
        .status(500)
        .json({ message: "Upload succeeded but no URL returned" });
    }
    return res.json({ imageUrl });
  });
});

export default router;