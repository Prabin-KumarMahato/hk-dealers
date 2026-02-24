import { v2 as cloudinary } from "cloudinary";

const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.CLOUD_KEY;
const api_secret = process.env.CLOUD_SECRET;

if (!cloud_name || !api_key || !api_secret) {
  console.warn(
    "⚠️ Cloudinary env missing (CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET). Image upload will fail.",
  );
}

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

export default cloudinary;
