/**
 * Seed script: populates the database with initial products.
 * Run: npm run seed
 * Requires MONGODB_URI in .env
 */
import "dotenv/config";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import { seedProducts } from "../data/products.js";

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    const existing = await Product.countDocuments();
    if (existing > 0) {
      console.log(`Database already has ${existing} product(s). Clearing products collection for fresh seed...`);
      await Product.deleteMany({});
    }

    const inserted = await Product.insertMany(seedProducts);
    console.log(`Seeded ${inserted.length} products.`);
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  }
}

seed();
