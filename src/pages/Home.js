import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WatchCard from "../components/WatchCard";

const Home = () => {
  const [featuredWatches, setFeaturedWatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sample data - replace with API call
    const sampleWatches = [
      {
        id: 1,
        brand: "Rolex",
        model: "Submariner Date",
        price: 98500,
        condition: "New",
        image:
          "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 2,
        brand: "Patek Philippe",
        model: "Nautilus 5711",
        price: 1250000,
        condition: "Pre-owned",
        image:
          "https://images.unsplash.com/photo-1547996160-81f58f6e7b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 3,
        brand: "Audemars Piguet",
        model: "Royal Oak",
        price: 420000,
        condition: "New",
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
    ];

    setTimeout(() => {
      setFeaturedWatches(sampleWatches);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div>
      {" "}
      {/* Hero Section */}{" "}
      <section className='hero'>
        <div className='container'>
          <h1> Luxury Watches in Hong Kong </h1>{" "}
          <p>
            Discover authentic timepieces from the world 's finest watchmakers.
            Verified authenticity, expert service.{" "}
          </p>
          <div style={{ marginTop: "2rem" }}>
            <Link
              to='/products'
              className='btn btn-primary'>
              Browse Collection{" "}
            </Link>{" "}
            <Link
              to='/about'
              className='btn btn-secondary'
              style={{ marginLeft: "1rem" }}>
              Learn More{" "}
            </Link>{" "}
          </div>{" "}
        </div>{" "}
      </section>
      {/* Featured Brands */}{" "}
      <section
        className='container'
        style={{ marginBottom: "3rem" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
          Trusted Brands{" "}
        </h2>{" "}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}>
          {[
            "ROLEX",
            "PATEK PHILIPPE",
            "AUDEMARS PIGUET",
            "OMEGA",
            "CARTIER",
          ].map((brand) => (
            <div
              key={brand}
              style={{
                padding: "1rem 2rem",
                border: "1px solid #eee",
                borderRadius: "4px",
                fontWeight: "600",
              }}>
              {brand}{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </section>
      {/* Featured Watches */}{" "}
      <section className='container'>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
          Featured Timepieces{" "}
        </h2>
        {loading ? (
          <div className='spinner' />
        ) : (
          <div className='products-grid'>
            {" "}
            {featuredWatches.map((watch) => (
              <WatchCard
                key={watch.id}
                watch={watch}
              />
            ))}{" "}
          </div>
        )}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link
            to='/products'
            className='btn btn-secondary'>
            View All Watches{" "}
          </Link>{" "}
        </div>{" "}
      </section>
      {/* Trust Section */}{" "}
      <section
        style={{
          background: "#1a1a1a",
          color: "white",
          padding: "4rem 0",
          marginTop: "3rem",
        }}>
        <div className='container'>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
            }}>
            <div style={{ textAlign: "center" }}>
              <h3 style={{ color: "#d4af37" }}> ✓100 % Authentic </h3>{" "}
              <p> Expert verification </p>{" "}
            </div>{" "}
            <div style={{ textAlign: "center" }}>
              <h3 style={{ color: "#d4af37" }}> ✓2 - Year Warranty </h3>{" "}
              <p> Comprehensive coverage </p>{" "}
            </div>{" "}
            <div style={{ textAlign: "center" }}>
              <h3 style={{ color: "#d4af37" }}> ✓Global Shipping </h3>{" "}
              <p> Secure worldwide delivery </p>{" "}
            </div>{" "}
            <div style={{ textAlign: "center" }}>
              <h3 style={{ color: "#d4af37" }}> ✓Trade - In </h3>{" "}
              <p> Upgrade your collection </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </div>
  );
};

export default Home;
