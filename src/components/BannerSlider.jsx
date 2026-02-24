import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client.js";
import "../styles/BannerSlider.css";

const fallbackSlides = [
  { image: "/first-bannerimage.png", linkURL: "/products" },
  { image: "/second-bannerimage.jpg", linkURL: "/products" },
  { image: "/third-bannerimage.jpg", linkURL: "/products" },
];

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchBanners = async () => {
      try {
        const data = await api.get("/api/banners");
        if (isMounted) {
          if (data && data.length > 0) {
            setSlides(data);
          } else {
            setSlides(fallbackSlides);
          }
        }
      } catch (err) {
        console.error("Failed to fetch banners", err);
        if (isMounted) setSlides(fallbackSlides);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBanners();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goPrev = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  if (loading) {
    return (
      <div
        className="banner-slider"
        style={{ background: "rgba(28, 25, 23, 0.4)" }}
      />
    );
  }

  return (
    <div className="banner-slider">
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slider-slide ${currentSlide === index ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {slide.linkURL && slide.title && (
              <Link
                to={slide.linkURL}
                className="absolute inset-0 z-10"
                aria-label={slide.title}
                style={{ display: "block", width: "100%", height: "100%" }}
              />
            )}
          </div>
        ))}

        {slides.length > 1 && (
          <>
            <button className="slider-prev z-20" onClick={goPrev}>
              ‹
            </button>
            <button className="slider-next z-20" onClick={goNext}>
              ›
            </button>
            <div className="slider-dots z-20">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${currentSlide === index ? "active" : ""}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BannerSlider;
