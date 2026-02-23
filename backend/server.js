import express from "express";
import cors from "cors";

// import your DB / config if needed
import "./src/index.js";

import authRoutes from "./routes/authRoutes.js";

const app = express();

// ✅ CORS (temporary allow all for testing)
app.use(cors());

// If you want restricted domains later, use this instead:
/*
app.use(cors({
  origin: [
    "https://hk-dealers.vercel.app",
    "https://hk-dealers-admin.vercel.app"
  ],
  credentials: true,
}));
*/

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});