import "./src/index.js";
import authRoutes from "./routes/authRoutes.js";

app.use("/api/auth", authRoutes);