import React, { useState, useEffect } from "react";
import WatchCard from "../components/WatchCard.jsx";
import watches from "../data/watches.jsx";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brand: "",
    condition: "",
    minPrice: "",
    maxPrice: ""
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({ brand: "", condition: "", minPrice: "", maxPrice: "" });
  };

  const parsedMin = filters.minPrice ? Number(filters.minPrice) : null;
  const parsedMax = filters.maxPrice ? Number(filters.maxPrice) : null;

  const filteredWatches = watches.filter((watch) => {
    if (filters.brand && watch.brand !== filters.brand) return false;
    if (filters.condition && watch.condition !== filters.condition)
      return false;
    if (parsedMin !== null && watch.price < parsedMin) return false;
    if (parsedMax !== null && watch.price > parsedMax) return false;
    return true;
  });

  const brands = [...new Set(watches.map((w) => w.brand))];

  return (
    <div
      className="container"
      style={{ paddingTop: "2rem", paddingBottom: "3rem" }}
    >
      <h1 style={{ marginBottom: "1rem" }}> Our Watch Collection </h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        Curated selection of luxury timepieces from the world 's finest brands
      </p>
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
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "600"
              }}
            >
              Brand
            </label>
            <select
              name="brand"
              value={filters.brand}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "1rem"
              }}
            >
              <option value=""> All Brands </option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "600"
              }}
            >
              Condition
            </label>
            <select
              name="condition"
              value={filters.condition}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "1rem"
              }}
            >
              <option value=""> Any Condition </option>
              <option value="New"> New </option>
              <option value="Pre-owned"> Pre - owned </option>
            </select>
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "600"
              }}
            >
              Min Price(HKD)
            </label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              placeholder="0"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "1rem"
              }}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "600"
              }}
            >
              Max Price(HKD)
            </label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              placeholder="No limit"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "1rem"
              }}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button className="btn btn-secondary" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>
      <div
        style={{
          marginBottom: "1rem",
          color: "#666",
          fontSize: "0.95rem"
        }}
      >
        Showing {filteredWatches.length}
        of {watches.length}
        watches
      </div>
      {loading ? (
        <div className="spinner" />
      ) : (
        <div className="products-grid">
          {filteredWatches.length ? (
            filteredWatches.map((watch) => (
              <WatchCard key={watch.id} watch={watch} />
            ))
          ) : (
            <div
              style={{
                gridColumn: "1/-1",
                textAlign: "center",
                padding: "3rem",
                background: "white",
                borderRadius: "8px"
              }}
            >
              <h3 style={{ marginBottom: "0.5rem" }}> No watches found </h3>
              <p style={{ color: "#666", marginBottom: "1.5rem" }}>
                Try adjusting your filters to see more results
              </p>
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
