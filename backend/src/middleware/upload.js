import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",
    resource_type: "image",
    // Unique name inside folder: e.g. products/1736123456789-a1b2c3
    public_id: (req, file) =>
      `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  },
});

const imageMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
const maxSize = 5 * 1024 * 1024; // 5 MB

export const upload = multer({
  storage,
  limits: { fileSize: maxSize },
  fileFilter: (req, file, cb) => {
    if (imageMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG, and WebP images are allowed"), false);
    }
  },
});
