import React, { useState, useEffect } from "react";
import WatchCard from "../components/WatchCard";

const Products = () => {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brand: "",
    condition: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    // Sample data - replace with API call
    const sampleWatches = [
      {
        id: 1,
        brand: "Rolex",
        model: "Submariner Date",
        price: 98500,
        condition: "New",
      },
      {
        id: 2,
        brand: "Patek Philippe",
        model: "Nautilus 5711",
        price: 1250000,
        condition: "Pre-owned",
      },
      {
        id: 3,
        brand: "Audemars Piguet",
        model: "Royal Oak",
        price: 420000,
        condition: "New",
      },
      {
        id: 4,
        brand: "Omega",
        model: "Speedmaster",
        price: 58000,
        condition: "New",
      },
      {
        id: 5,
        brand: "Rolex",
        model: "Daytona",
        price: 350000,
        condition: "Pre-owned",
      },
      {
        id: 6,
        brand: "Cartier",
        model: "Santos",
        price: 75000,
        condition: "New",
      },
    ];

    setTimeout(() => {
      setWatches(sampleWatches);
      setLoading(false);
    }, 800);
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
      className='container'
      style={{ paddingTop: "2rem" }}>
      <h1 style={{ marginBottom: "1rem" }}> Our Watch Collection </h1>{" "}
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        {" "}
        Curated selection of luxury timepieces{" "}
      </p>
      {/* Filters */}{" "}
      <div
        style={{
          background: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          marginBottom: "2rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "1rem",
          }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              {" "}
              Brand{" "}
            </label>{" "}
            <select
              name='brand'
              value={filters.brand}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px" }}>
              <option value=''> All Brands </option>{" "}
              {brands.map((b) => (
                <option
                  key={b}
                  value={b}>
                  {" "}
                  {b}{" "}
                </option>
              ))}{" "}
            </select>{" "}
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              {" "}
              Condition{" "}
            </label>{" "}
            <select
              name='condition'
              value={filters.condition}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px" }}>
              <option value=''> Any </option> <option value='New'> New </option>{" "}
              <option value='Pre-owned'> Pre - owned </option>{" "}
            </select>{" "}
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              {" "}
              Min Price(HKD){" "}
            </label>{" "}
            <input
              type='number'
              name='minPrice'
              value={filters.minPrice}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px" }}
            />{" "}
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              {" "}
              Max Price(HKD){" "}
            </label>{" "}
            <input
              type='number'
              name='maxPrice'
              value={filters.maxPrice}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px" }}
            />{" "}
          </div>{" "}
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            className='btn btn-primary'
            onClick={() => setFilters((f) => ({ ...f }))}>
            Apply{" "}
          </button>{" "}
          <button
            className='btn btn-secondary'
            onClick={clearFilters}>
            Clear{" "}
          </button>{" "}
        </div>{" "}
      </div>
      {/* Products list */}{" "}
      {loading ? (
        <div className='spinner' />
      ) : (
        <div className='products-grid'>
          {" "}
          {filteredWatches.length ? (
            filteredWatches.map((watch) => (
              <WatchCard
                key={watch.id}
                watch={watch}
              />
            ))
          ) : (
            <div
              style={{
                gridColumn: "1/-1",
                textAlign: "center",
                padding: "2rem",
              }}>
              {" "}
              No watches found.{" "}
            </div>
          )}{" "}
        </div>
      )}{" "}
    </div>
  );
};

export default Products;
