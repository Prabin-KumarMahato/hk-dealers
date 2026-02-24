import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WatchCard from "../components/WatchCard.jsx";
import BannerSlider from "../components/BannerSlider.jsx";
import { api } from "../api/client.js";
import { ShieldCheck, Award, Globe, RefreshCw } from "lucide-react";
import "./Home.css";

const Home = () => {
  const [featuredWatches, setFeaturedWatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadFeatured = async () => {
      try {
        setLoading(true);
        const data = await api.get("/api/products");
        if (isMounted) {
          const items = Array.isArray(data) ? data : data.items || [];
          setFeaturedWatches(items.slice(0, 3));
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setFeaturedWatches([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadFeatured();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <section className="banner-section">
        <div className="container">
          <BannerSlider />
          <h1 className="banner-heading">The Art of Fine Watchmaking</h1>
          <Link to="/products" className="btn btn-primary">
            Explore Collection
          </Link>
        </div>
      </section>

      <section className="container" style={{ marginTop: "4rem" }}>
        <h2 className="section-title" style={{ color: "#fff" }}>
          Trusted Brands
        </h2>
        <div className="brands-container scrollable">
          {[
            { name: "ROLEX", logo: "https://logo.clearbit.com/rolex.com" },
            {
              name: "PATEK PHILIPPE",
              logo: "https://logo.clearbit.com/patek.com",
            },
            {
              name: "AUDEMARS PIGUET",
              logo: "https://logo.clearbit.com/audemarspiguet.com",
            },
            {
              name: "OMEGA",
              logo: "https://logo.clearbit.com/omegawatches.com",
            },
            { name: "CARTIER", logo: "https://logo.clearbit.com/cartier.com" },
          ].map((brand) => (
            <div
              key={brand.name}
              className="brand-item"
              style={{
                padding: "1rem 2rem",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "0.95rem",
                letterSpacing: "1px",
                transition: "all 0.3s ease",
                cursor: "pointer",
                border: "1px solid rgba(250, 250, 249, 0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                style={{
                  height: "40px",
                  objectFit: "contain",
                  filter: "grayscale(100%) brightness(200%)",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <span style={{ color: "#fff" }}>{brand.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="container">
        <h2 className="section-title" style={{ color: "#fff" }}>
          Featured Timepieces
        </h2>
        {loading ? (
          <div className="spinner" />
        ) : (
          <div className="products-grid">
            {featuredWatches.map((watch) => (
              <WatchCard key={watch.id} watch={watch} />
            ))}
          </div>
        )}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link to="/products" className="btn btn-secondary">
            View Full Collection
          </Link>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <h2 className="section-title">The HK Standard</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
            }}
          >
            <div className="value-card">
              <Award className="value-icon" />
              <h3 className="value-title">100% Authentic</h3>
              <p className="value-text">
                Every watch is rigorously authenticated by our expert
                horologists before entering our vault.
              </p>
            </div>
            <div className="value-card">
              <ShieldCheck className="value-icon" />
              <h3 className="value-title">2-Year Warranty</h3>
              <p className="value-text">
                Comprehensive international coverage on all timepieces for your
                complete peace of mind.
              </p>
            </div>
            <div className="value-card">
              <Globe className="value-icon" />
              <h3 className="value-title">Insured Shipping</h3>
              <p className="value-text">
                Secure, fully-insured global delivery via armored courier
                services.
              </p>
            </div>
            <div className="value-card">
              <RefreshCw className="value-icon" />
              <h3 className="value-title">Bespoke Trade-Ins</h3>
              <p className="value-text">
                Elevate your collection with our discreet and competitive
                valuation program.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Acquire Your Legacy</h2>
          <p className="cta-text">
            Whether you seek a rare vintage horological masterpiece or the
            latest release from haute horlogerie maisons, our concierge is at
            your service.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link to="/products" className="btn btn-primary">
              Discover Watches
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Contact Concierge
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
