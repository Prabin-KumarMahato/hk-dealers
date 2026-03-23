import React, { memo, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// Neutral placeholder when product has no image
const NO_IMAGE_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='rgba(0,0,0,0.2)' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='rgba(250,250,249,0.5)' font-family='sans-serif' font-size='18'%3ENo image%3C/text%3E%3C/svg%3E";

/**
 * Lazy-loaded product image: only starts loading when the card enters
 * the viewport (with a 200px rootMargin for pre-loading).
 */
const LazyImage = memo(({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    // Use IntersectionObserver for lazy-loading
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className="product-image-container">
      {inView ? (
        <img
          src={src}
          alt={alt}
          className={`product-image ${loaded ? "img-loaded" : "img-loading"}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
        />
      ) : (
        <div className="product-image img-placeholder" />
      )}
    </div>
  );
});
LazyImage.displayName = "LazyImage";

const WatchCard = memo(({ watch }) => {
  const imageUrl = watch.image?.trim() || NO_IMAGE_PLACEHOLDER;

  return (
    <div className="product-card" style={{ textDecoration: "none" }}>
      <LazyImage
        src={imageUrl}
        alt={
          watch.image ? `${watch.brand} ${watch.name}` : "No product image"
        }
      />

      <div className="product-info">
        <div className="product-brand">{watch.brand || "Unknown Brand"}</div>
        <h3 className="product-name">{watch.name || "Unnamed Product"}</h3>

        <div className="product-price">
          HKD {watch.price ? watch.price.toLocaleString() : "—"}
        </div>

        <p
          style={{
            color: "rgba(250, 250, 249, 0.5)",
            fontSize: "0.9rem",
            marginBottom: "var(--space-md)",
          }}
        >
          {watch.condition || ""}
        </p>

        <Link
          to={`/product/${watch._id}`}
          className="btn btn-primary"
          style={{ width: "100%", textAlign: "center", marginTop: "auto" }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
});
WatchCard.displayName = "WatchCard";

export default WatchCard;
