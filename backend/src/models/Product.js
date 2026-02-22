import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true
    },
    brand: {
      type: String,
      trim: true,
      default: ""
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0
    },
    image: {
      type: String,
      default: "",
      trim: true
    },
    description: {
      type: String,
      default: "",
      trim: true
    },
    stock: {
      type: Number,
      default: 0,
      min: 0
    },
    category: {
      type: String,
      trim: true,
      default: ""
    }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
