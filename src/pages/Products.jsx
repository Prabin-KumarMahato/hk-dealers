import React, { useState, useEffect } from "react";
import WatchCard from "../components/WatchCard.jsx";
import { api } from "../api/client.js";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    brand: "",
    condition: "",
    minPrice: "",
    maxPrice: ""
  });

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setLoading(true);

        // ✅ Fetch products
        const data = await api.get("/api/products");

        console.log("Products API response:", data);

        if (isMounted) {
          // ✅ Backend returns array directly
          setProducts(Array.isArray(data) ? data : []);
          setError("");
        }
      } catch (err) {
        console.error("Product load error:", err);

        if (isMounted) {
          setError(err.message || "Failed to load products");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  /* =========================
     FILTER HANDLING
  ========================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      brand: "",
      condition: "",
      minPrice: "",
      maxPrice: ""
    });
  };

  const parsedMin = filters.minPrice ? Number(filters.minPrice) : null;
  const parsedMax = filters.maxPrice ? Number(filters.maxPrice) : null;

  const filteredWatches = products.filter((watch) => {
    if (filters.brand && watch.brand !== filters.brand) return false;
    if (filters.condition && watch.condition !== filters.condition)
      return false;
    if (parsedMin !== null && watch.price < parsedMin) return false;
    if (parsedMax !== null && watch.price > parsedMax) return false;
    return true;
  });

  const brands = [...new Set(products.map((w) => w.brand).filter(Boolean))];

  /* =========================
     RENDER
  ========================= */

  return (
    <div
      className="container"
      style={{ paddingTop: "2rem", paddingBottom: "3rem" }}
    >
      <h1 style={{ marginBottom: "1rem" }}>Our Watch Collection</h1>

      <p style={{ color: "#666", marginBottom: "2rem" }}>
        Curated selection of luxury timepieces from the world's finest brands
      </p>

      {/* FILTER PANEL */}
      <div
        style={{
          background: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          marginBottom: "2rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "1rem"
          }}
        >
          {/* BRAND */}
          <div>
            <label style={{ fontWeight: "600" }}>Brand</label>
            <select
              name="brand"
              value={filters.brand}
              onChange={handleChange}
              className="input"
            >
              <option value="">All Brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* CONDITION */}
          <div>
            <label style={{ fontWeight: "600" }}>Condition</label>
            <select
              name="condition"
              value={filters.condition}
              onChange={handleChange}
              className="input"
            >
              <option value="">Any Condition</option>
              <option value="New">New</option>
              <option value="Pre-owned">Pre-owned</option>
            </select>
          </div>

          {/* MIN PRICE */}
          <div>
            <label style={{ fontWeight: "600" }}>Min Price (HKD)</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              placeholder="0"
              className="input"
            />
          </div>

          {/* MAX PRICE */}
          <div>
            <label style={{ fontWeight: "600" }}>Max Price (HKD)</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              placeholder="No limit"
              className="input"
            />
          </div>
        </div>

        <button className="btn btn-secondary" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      {/* COUNT */}
      <div style={{ marginBottom: "1rem", color: "#666" }}>
        Showing {filteredWatches.length} of {products.length} watches
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="spinner" />
      ) : error ? (
        <div className="error-box">{error}</div>
      ) : (
        <div className="products-grid">
          {filteredWatches.length > 0 ? (
            filteredWatches.map((watch) => (
              // ✅ MongoDB uses _id
              <WatchCard key={watch._id} watch={watch} />
            ))
          ) : (
            <div className="empty-box">
              <h3>No watches found</h3>
              <p>Try adjusting your filters to see more results</p>
              <button className="btn btn-primary" onClick={clearFilters}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;