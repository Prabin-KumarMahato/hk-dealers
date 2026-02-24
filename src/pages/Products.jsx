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
    maxPrice: "",
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
      maxPrice: "",
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
    <div>
      <div
        style={{
          background:
            "radial-gradient(circle at center, rgba(44, 40, 36, 0.8) 0%, var(--color-background) 100%)",
          padding: "6rem 0 4rem",
          textAlign: "center",
          borderBottom: "1px solid rgba(250, 250, 249, 0.05)",
          marginBottom: "3rem",
        }}
      >
        <div className="container">
          <h1
            style={{
              fontSize: "3.5rem",
              marginBottom: "1rem",
              color: "var(--color-text)",
              fontFamily: "'Cormorant', serif",
              fontWeight: "600",
            }}
          >
            Our Exquisite Collection
          </h1>
          <p
            style={{
              color: "rgba(250, 250, 249, 0.6)",
              fontSize: "1.2rem",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            A curated selection of the world's finest luxury timepieces,
            meticulously authenticated by our master horologists.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: "6rem" }}>
        {/* FILTER PANEL */}
        <div
          style={{
            background: "rgba(28, 25, 23, 0.6)",
            backdropFilter: "blur(12px)",
            padding: "2rem",
            borderRadius: "16px",
            marginBottom: "3rem",
            border: "1px solid rgba(250, 250, 249, 0.05)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            {/* BRAND */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label
                style={{ fontWeight: "500", color: "rgba(250, 250, 249, 0.8)" }}
              >
                Brand
              </label>
              <select
                name="brand"
                value={filters.brand}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  backgroundColor: "rgba(12, 10, 9, 0.5)",
                  border: "1px solid rgba(250, 250, 249, 0.1)",
                  color: "var(--color-text)",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  transition: "all 300ms ease",
                }}
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label
                style={{ fontWeight: "500", color: "rgba(250, 250, 249, 0.8)" }}
              >
                Condition
              </label>
              <select
                name="condition"
                value={filters.condition}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  backgroundColor: "rgba(12, 10, 9, 0.5)",
                  border: "1px solid rgba(250, 250, 249, 0.1)",
                  color: "var(--color-text)",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  transition: "all 300ms ease",
                }}
              >
                <option value="">Any Condition</option>
                <option value="New">New</option>
                <option value="Pre-owned">Pre-owned</option>
              </select>
            </div>

            {/* MIN PRICE */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label
                style={{ fontWeight: "500", color: "rgba(250, 250, 249, 0.8)" }}
              >
                Min Price (HKD)
              </label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleChange}
                placeholder="0"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  backgroundColor: "rgba(12, 10, 9, 0.5)",
                  border: "1px solid rgba(250, 250, 249, 0.1)",
                  color: "var(--color-text)",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  transition: "all 300ms ease",
                }}
              />
            </div>

            {/* MAX PRICE */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label
                style={{ fontWeight: "500", color: "rgba(250, 250, 249, 0.8)" }}
              >
                Max Price (HKD)
              </label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleChange}
                placeholder="No limit"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  backgroundColor: "rgba(12, 10, 9, 0.5)",
                  border: "1px solid rgba(250, 250, 249, 0.1)",
                  color: "var(--color-text)",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  transition: "all 300ms ease",
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "1rem",
            }}
          >
            <button className="btn btn-secondary" onClick={clearFilters}>
              Reset Filters
            </button>
          </div>
        </div>

        {/* COUNT */}
        <div
          style={{
            marginBottom: "2rem",
            color: "rgba(250, 250, 249, 0.6)",
            fontSize: "1.1rem",
          }}
        >
          Showing{" "}
          <span style={{ color: "var(--color-cta)", fontWeight: "600" }}>
            {filteredWatches.length}
          </span>{" "}
          of {products.length} magnificent timepieces
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="spinner" />
        ) : error ? (
          <div
            style={{
              background: "rgba(220, 38, 38, 0.1)",
              color: "#FCA5A5",
              padding: "1.5rem",
              borderRadius: "8px",
              border: "1px solid rgba(220, 38, 38, 0.2)",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        ) : (
          <div className="products-grid">
            {filteredWatches.length > 0 ? (
              filteredWatches.map((watch) => (
                <WatchCard key={watch._id} watch={watch} />
              ))
            ) : (
              <div
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  padding: "4rem 0",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.8rem",
                    marginBottom: "1rem",
                    color: "var(--color-text)",
                  }}
                >
                  No timepieces match your criteria
                </h3>
                <p
                  style={{
                    color: "rgba(250, 250, 249, 0.6)",
                    marginBottom: "2rem",
                  }}
                >
                  Try adjusting your filters or contact our concierge for
                  bespoke sourcing.
                </p>
                <button className="btn btn-primary" onClick={clearFilters}>
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
