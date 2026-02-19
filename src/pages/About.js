import React from "react";
import { Link } from "react-router-dom";
import "./About.css"; // Create this CSS file

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Nepal's Premier{" "}
              <span className="highlight">Luxury Watch Dealer</span>
            </h1>
            <p className="hero-subtitle">
              We're on a mission to bring the world's finest timepieces to
              Nepal, empowering watch enthusiasts to own their dream watches
              with authenticity and trust, backed by expert horological
              knowledge.
            </p>
          </div>
        </div>
        <div className="hero-overlay"></div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-content">
              <h2 className="section-title">Our Mission</h2>
              <p className="mission-text">
                HK Dealers was born from a simple belief: every watch enthusiast
                in Nepal deserves access to authentic luxury timepieces with
                complete transparency and expert guidance.
              </p>
              <p className="mission-text">
                We've combined decades of horological expertise with rigorous
                authentication processes to create Nepal's most trusted luxury
                watch destination. Each timepiece in our collection undergoes
                meticulous verification by our team of certified watch
                specialists.
              </p>
              <div className="stats-container">
                <div className="stat-item">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Happy Clients</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Authentic</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">Luxury Brands</span>
                </div>
              </div>
            </div>
            <div className="mission-image">
              <img
                src="/images/adviting-online1 .png"
                alt="HK Dealers Luxury Showroom"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/adviting-online1.png";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured In Section */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title text-center">HK Dealers Featured In</h2>
          <div className="featured-grid">
            <div className="featured-card">
              <div className="magazine-cover">
                <img
                  src="/adviting2online.png"
                  alt="Nepal Luxury Magazine"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/adviting2online.png";
                  }}
                />
              </div>
              <div className="featured-content">
                <h3>Nepal Luxury Magazine</h3>
                <p>
                  Discover the story behind HK Dealers, our mission to bring
                  authentic luxury timepieces to Nepal, and our vision for the
                  future of horology in the region.
                </p>
                <button className="read-more-link" onClick={() => {}}>
                  Read the Full Article →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title text-center">What Sets Us Apart</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🔍</div>
              <h3>Authenticity Guaranteed</h3>
              <p>
                Every watch comes with a certificate of authenticity and has
                been thoroughly inspected by our expert horologists. 100%
                genuine luxury timepieces, guaranteed.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">👨‍💼</div>
              <h3>Expert Knowledge</h3>
              <p>
                Our team consists of certified watch specialists with decades of
                combined experience in luxury horology, ready to guide you
                through your purchase.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">🔧</div>
              <h3>Complete Service</h3>
              <p>
                From purchase to after-sales support, we provide comprehensive
                service including warranty coverage, maintenance, and trade-in
                options.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">🌍</div>
              <h3>Free Worldwide Shipping</h3>
              <p>
                Enjoy free insured shipping on all orders, with careful
                packaging and tracking provided for your peace of mind.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">⭐</div>
              <h3>2-Year Warranty</h3>
              <p>
                All our timepieces come with a comprehensive 2-year warranty,
                ensuring your investment is protected.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Trade-In Services</h3>
              <p>
                Looking to upgrade your collection? We offer competitive
                trade-in values for your pre-owned luxury watches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section className="partner-section">
        <div className="container">
          <div className="partner-content">
            <h2 className="section-title">Partnered With</h2>
            <p className="partner-text">
              We are proud to be partnered with Nepal's leading luxury
              organizations, working together to advance horological excellence
              in the region.
            </p>
            <div className="partner-logos">
              <div className="partner-logo">
                <img
                  src="/third-bannerimage.jpg"
                  alt="Partner Organization"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/third-bannerimage.jpg";
                  }}
                />
              </div>
            </div>
            <button className="partner-link" onClick={() => {}}>
              Visit Our Partner →
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Join Our Community</h2>
            <p className="cta-text">
              Be part of Nepal's growing luxury watch community. Whether you're
              a seasoned collector or starting your journey, we're here to help
              you find the perfect timepiece.
            </p>
            <div className="cta-buttons">
              <Link to="/products" className="btn btn-primary btn-large">
                Explore Collection
              </Link>
              <Link to="/contact" className="btn btn-outline btn-large">
                Visit Our Showroom
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
