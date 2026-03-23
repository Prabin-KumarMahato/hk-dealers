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
        const data = await api.get("/api/products", { cache: true });
        if (isMounted) {
          const items = Array.isArray(data) ? data : data.items || [];
          setFeaturedWatches(items);
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

      <section style={{ marginTop: "3rem", overflow: "hidden" }}>
        <div className="container">
          <h2 className="section-title" style={{ color: "#fff" }}>
            Trusted Brands
          </h2>
        </div>
        <div className="brands-marquee">
          <div className="brands-marquee-track">
            {/* First set */}
            {["ROLEX", "PATEK PHILIPPE", "AUDEMARS PIGUET", "OMEGA", "CARTIER"].map(
              (name) => (
                <div key={name} className="brand-marquee-item">
                  <span className="brand-marquee-text">{name}</span>
                </div>
              )
            )}
            {/* Duplicate set for seamless loop */}
            {["ROLEX", "PATEK PHILIPPE", "AUDEMARS PIGUET", "OMEGA", "CARTIER"].map(
              (name) => (
                <div key={`dup-${name}`} className="brand-marquee-item">
                  <span className="brand-marquee-text">{name}</span>
                </div>
              )
            )}
          </div>
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
