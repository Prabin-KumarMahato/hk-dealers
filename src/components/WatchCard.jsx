import React from "react";
import { Link } from "react-router-dom";

// Neutral placeholder when product has no image (so we don't show the same image for every product)
const NO_IMAGE_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23e5e7eb' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='sans-serif' font-size='18'%3ENo image%3C/text%3E%3C/svg%3E";

const WatchCard = ({ watch }) => {
  const imageUrl = watch.image?.trim() || NO_IMAGE_PLACEHOLDER;
  return (
    <div className="product-card">
      <img
        src={imageUrl}
        alt={watch.image ? `${watch.brand} ${watch.name}` : "No product image"}
        className="product-image"
      />

      <div className="product-info">
        <div className="product-brand">
          {watch.brand || "Unknown Brand"}
        </div>

        {/* ✅ use name instead of model */}
        <h3 className="product-name">
          {watch.name || "Unnamed Product"}
        </h3>

        <div className="product-price">
          HKD{" "}
          {watch.price
            ? watch.price.toLocaleString()
            : "—"}
        </div>

        <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "1rem" }}>
          {watch.condition || ""}
        </p>

        {/* ✅ use _id instead of id */}
        <Link
          to={`/product/${watch._id}`}
          className="btn btn-primary"
          style={{ width: "100%", textAlign: "center" }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default WatchCard;