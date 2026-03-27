import "dotenv/config";
import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";
import User from "./models/User.js";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import userRoutes from "./routes/users.js";
import adminRoutes from "./routes/admin.js";
import uploadRoutes from "./routes/upload.js";
import bannerRoutes from "./routes/banners.js";

import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";

/* =========================
   CONNECT DATABASE
========================= */
await connectDB();

/* =========================
   ADMIN AUTO-CREATION
========================= */
const DEFAULT_ADMIN_EMAIL = "admin@example.com";
const DEFAULT_ADMIN_PASSWORD = "admin123";

async function createOrUpdateAdmin() {
  try {
    const adminEmail = (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL)
      .trim()
      .toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;

    const existing = await User.findOne({ email: adminEmail }).select(
      "+password",
    );

    if (!existing) {
      await User.create({
        name: "Admin",
        email: adminEmail,
        password: adminPassword,
        role: "admin",
      });
      console.log(
        "✅ Admin user created. Login:",
        adminEmail,
        "/",
        adminPassword,
      );
    } else {
      existing.password = adminPassword;
      await existing.save();
      console.log(
        "✅ Admin password updated. Login:",
        adminEmail,
        "/",
        adminPassword,
      );
    }
  } catch (err) {
    console.error("❌ Admin create/update error:", err.message);
  }
}

await createOrUpdateAdmin();

/* =========================
   EXPRESS APP
========================= */
const app = express();
const PORT = Number(process.env.PORT) || 5000;

/* ✅ CORS */
app.use(cors({
  origin: [
    "https://hkdealers.me",
    "https://www.hkdealers.me",
    "https://admin.hkdealers.me"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/banners", bannerRoutes);

/* ERRORS */
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
