import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WatchCard from "../components/WatchCard";
import watches from "../data/watches";
import BannerSlider from "../components/BannerSlider";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";

const Home = () => {
  const [featuredWatches, setFeaturedWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFeaturedWatches(watches.slice(0, 3));
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div>
      <section className="banner-section">
        <div className="container">
          <BannerSlider />
          <h1 className="banner-heading"></h1>{" "}
          <Link
            to="/products"
            className="btn btn-primary"
            style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}
          >
            Explore Collection{" "}
          </Link>{" "}
        </div>{" "}
      </section>{" "}
      <section
        className="container"
        style={{ marginTop: "4rem", marginBottom: "3rem" }}
      >
        <h2 className="section-title">Trusted Brands </h2>{" "}
        {isMobile ? (
          <div className="brands-slider-wrapper">
            <Slider
              {...{
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000,
                arrows: true
              }}
            >
              {[
                "ROLEX",
                "PATEK PHILIPPE",
                "AUDEMARS PIGUET",
                "OMEGA",
                "CARTIER"
              ].map((brand) => (
                <div key={brand} className="brand-slide">
                  <div
                    className="brand-item"
                    style={{
                      padding: "1.25rem 2.5rem",
                      border: "2px solid #070000",
                      borderRadius: "8px",
                      fontWeight: "700",
                      fontSize: "1.05rem",
                      letterSpacing: "1px",
                      transition: "all 0.3s ease",
                      cursor: "default",
                      margin: "0 10px",
                      textAlign: "center"
                    }}
                  >
                    {brand}
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div className="brands-container">
            {[
              "ROLEX",
              "PATEK PHILIPPE",
              "AUDEMARS PIGUET",
              "OMEGA",
              "CARTIER"
            ].map((brand) => (
              <div
                key={brand}
                className="brand-item"
                style={{
                  padding: "1.25rem 2.5rem",
                  border: "2px solid #070000",
                  borderRadius: "8px",
                  fontWeight: "700",
                  fontSize: "1.05rem",
                  letterSpacing: "1px",
                  transition: "all 0.3s ease",
                  cursor: "default"
                }}
              >
                {brand}
              </div>
            ))}
          </div>
        )}{" "}
      </section>{" "}
      <section className="container" style={{ marginBottom: "4rem" }}>
        <h2 className="section-title">Featured Timepieces </h2>{" "}
        {loading ? (
          <div className="spinner" />
        ) : isMobile ? (
          <div className="featured-watches-slider">
            <Slider
              {...{
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 4000,
                arrows: true
              }}
            >
              {featuredWatches.map((watch) => (
                <div key={watch.id} className="watch-slide">
                  <WatchCard watch={watch} />
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div className="products-grid">
            {featuredWatches.map((watch) => (
              <WatchCard key={watch.id} watch={watch} />
            ))}
          </div>
        )}{" "}
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Link
            to="/products"
            className="btn btn-secondary"
            style={{ fontSize: "1.1rem", padding: "0.9rem 2rem" }}
          >
            View All Watches{" "}
          </Link>{" "}
        </div>{" "}
      </section>{" "}
      <section
        style={{
          background: "#1a1a1a",
          color: "white",
          padding: "4rem 0",
          marginTop: "3rem"
        }}
      >
        <div className="container">
          <h2
            style={{
              textAlign: "center",
              marginBottom: "3rem",
              fontSize: "2.5rem"
            }}
          >
            Why Choose Us{" "}
          </h2>{" "}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "3rem"
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}> ✓ </div>{" "}
              <h3
                style={{
                  color: "#d4af37",
                  marginBottom: "0.75rem",
                  fontSize: "1.4rem"
                }}
              >
                100 % Authentic{" "}
              </h3>{" "}
              <p style={{ color: "#ccc", lineHeight: "1.8" }}>
                Every watch is verified by our expert team to ensure complete
                authenticity{" "}
              </p>{" "}
            </div>{" "}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}> 🛡️ </div>{" "}
              <h3
                style={{
                  color: "#d4af37",
                  marginBottom: "0.75rem",
                  fontSize: "1.4rem"
                }}
              >
                2 - Year Warranty{" "}
              </h3>{" "}
              <p style={{ color: "#ccc", lineHeight: "1.8" }}>
                Comprehensive coverage on all timepieces for your peace of
                mind{" "}
              </p>{" "}
            </div>{" "}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}> 🌍 </div>{" "}
              <h3
                style={{
                  color: "#d4af37",
                  marginBottom: "0.75rem",
                  fontSize: "1.4rem"
                }}
              >
                Global Shipping{" "}
              </h3>{" "}
              <p style={{ color: "#ccc", lineHeight: "1.8" }}>
                Secure worldwide delivery with full insurance and tracking{" "}
              </p>{" "}
            </div>{" "}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}> 🔄 </div>{" "}
              <h3
                style={{
                  color: "#d4af37",
                  marginBottom: "0.75rem",
                  fontSize: "1.4rem"
                }}
              >
                Trade - In Service{" "}
              </h3>{" "}
              <p style={{ color: "#ccc", lineHeight: "1.8" }}>
                Upgrade your collection with our flexible trade - in
                program{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="container" style={{ padding: "4rem 0" }}>
        <div
          style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}
        >
          <h2 style={{ marginBottom: "1.5rem", fontSize: "2.5rem" }}>
            Ready to Find Your Perfect Timepiece ?
          </h2>{" "}
          <p
            style={{
              color: "#666",
              marginBottom: "2rem",
              fontSize: "1.1rem",
              lineHeight: "1.8"
            }}
          >
            Browse our exclusive collection or contact us for personalized
            assistance in finding the watch of your dreams.{" "}
          </p>{" "}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >
            <Link
              to="/products"
              className="btn btn-primary"
              style={{ fontSize: "1.05rem" }}
            >
              Browse Collection{" "}
            </Link>{" "}
            <Link
              to="/contact"
              className="btn btn-secondary"
              style={{ fontSize: "1.05rem" }}
            >
              Contact Us{" "}
            </Link>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </div>
  );
};

export default Home;
