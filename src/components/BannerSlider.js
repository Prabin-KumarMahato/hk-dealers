import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/BannerSlider.css";

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      // title: "Luxury Timepieces",
      // subtitle: "Nepal's Premier Watch Dealer",
      image: "/first-bannerimage.png"
    },
    {
      // title: "Authentic Watches",
      // subtitle: "100% Verified & Certified",
      image: "/second-bannerimage.jpg"
    },
    {
      // title: "Expert Service",
      // subtitle: "Professional Guidance & Support",
      image: "/third-bannerimage.jpg"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goPrev = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <div className="banner-slider">
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slider-slide ${currentSlide === index ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Slide content can go here */}
          </div>
        ))}

        {/* Navigation buttons */}
        <button className="slider-prev" onClick={goPrev}>
          ‹
        </button>
        <button className="slider-next" onClick={goNext}>
          ›
        </button>

        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${currentSlide === index ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;