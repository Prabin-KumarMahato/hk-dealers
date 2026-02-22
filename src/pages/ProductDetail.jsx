import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { CartContext } from "../context/CartContext.jsx";
import { api } from "../api/client.js";
import "./ProductDetail.css";

const NO_IMAGE_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23e5e7eb' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='sans-serif' font-size='18'%3ENo image%3C/text%3E%3C/svg%3E";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, createOrder } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    address: "",
    mobile: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    let isMounted = true;

    const loadProduct = async () => {
      try {
        setPageLoading(true);
        const data = await api.get(`/api/products/${id}`);
        if (isMounted) {
          setProduct(data);
          setPageError("");
        }
      } catch (error) {
        if (isMounted) {
          setPageError(error.message || "Product not found");
        }
      } finally {
        if (isMounted) {
          setPageLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (pageLoading) {
    return (
      <div
        className="container"
        style={{ paddingTop: "3rem", textAlign: "center" }}
      >
        <div className="spinner" />
      </div>
    );
  }

  if (pageError || !product) {
    return (
      <div
        className="container"
        style={{ paddingTop: "3rem", textAlign: "center" }}
      >
        <h2>{pageError || "Product not found"}</h2>
        <Link
          to="/products"
          className="btn btn-primary"
          style={{ marginTop: "1rem" }}
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value) || 1);
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(product, quantity);
    } catch (error) {
      console.error(error);
      alert("❌ Failed to add to cart. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const totalPrice = (product.price || 0) * (quantity || 1);
    const orderData = {
      name: form.name.trim(),
      address: form.address.trim(),
      mobile: form.mobile.trim(),
      email: form.email.trim(),
      message: (form.message || "").trim(),
      items: [{ productId: product._id, qty: quantity || 1 }],
      totalPrice,
    };
    console.log("Submitting order (ProductDetail):", orderData);
    try {
      await createOrder(orderData);
      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_x2sy4ov",
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_2mtyx2p",
          {
            name: form.name,
            email: form.email,
            subject: `New Order - ${form.name}`,
            message: `Order from ${form.name}\nEmail: ${form.email}\nMobile: ${form.mobile}\nAddress: ${form.address}\nProduct: ${product.name || product.model}\nQty: ${quantity}\nTotal: Rs. ${totalPrice}`,
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "1_0YGRViezqRkyJFD"
        );
      } catch (emailErr) {
        console.error("EmailJS error (order still saved):", emailErr);
      }
      setShowSuccessModal(true);
      setForm({ name: "", address: "", mobile: "", email: "", message: "" });
      setQuantity(1);
      setShowOrderForm(false);
      setTimeout(() => setShowSuccessModal(false), 4000);
    } catch (error) {
      console.error("Order submit error:", error);
      alert(error?.message || "❌ Failed to submit order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNowClick = () => {
    setShowOrderForm(true);
    setTimeout(() => {
      document.querySelector(".order-form-section")?.scrollIntoView({
        behavior: "smooth"
      });
    }, 100);
  };

  const closeForm = () => {
    setShowOrderForm(false);
  };

  const originalPrice = product.price * 1.55;
  const discount = Math.round(
    ((originalPrice - product.price) / originalPrice) * 100
  );

  return (
    <div className="product-detail-container">
      {showSuccessModal && (
        <div
          className="success-modal-overlay"
          onClick={() => setShowSuccessModal(false)}
        >
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="success-animation">
              <div className="success-checkmark">
                <div className="check-icon">
                  <span className="icon-line line-tip"></span>
                  <span className="icon-line line-long"></span>
                  <div className="icon-circle"></div>
                  <div className="icon-fix"></div>
                </div>
              </div>
            </div>
            <h2 className="success-title">Order Sent Successfully!</h2>
            <p className="success-message">
              Thank you for your order! We've received your request and will
              contact you shortly to confirm the details.
            </p>
            <div className="success-details">
              <div className="detail-item">
                <span className="detail-icon">✓</span>
                <span>Order confirmation sent to your email</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">✓</span>
                <span>We'll contact you within 2-4 hours</span>
              </div>
            </div>
            <button
              className="success-btn"
              onClick={() => setShowSuccessModal(false)}
            >
              Got it, Thanks!
            </button>
          </div>
        </div>
      )}

      <div className="container">
        <Link to="/products" className="back-link">
          ← Back to Products
        </Link>

        <div className="product-main">
          <div className="product-image-section">
            <img
              src={product.image?.trim() || NO_IMAGE_PLACEHOLDER}
              alt={product.image ? `${product.brand} ${product.name}` : "No product image"}
              className="product-detail-image"
            />
          </div>

          <div className="product-info-section">
            <div className="product-brand">{product.brand}</div>
            <h1 className="product-title">{product.name || product.model}</h1>

            <div className="price-section">
              <span className="current-price">Rs. {product.price}</span>
              <span className="original-price">
                Rs. {Math.round(originalPrice)}
              </span>
              <span className="discount">-{discount}%</span>
            </div>

            <div className="quantity-section">
              <span className="label">Quantity</span>
              <div className="quantity-control">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="quantity-btn"
                >
                  −
                </button>

                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="quantity-input"
                />

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
            </div>

            <div className="action-buttons">
              <button className="buy-now-btn" onClick={handleBuyNowClick}>
                Buy Now
              </button>

              <button onClick={handleAddToCart} className="add-to-cart-btn">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {showOrderForm && (
          <div className="order-form-section">
            <div className="form-header">
              <h2>Complete Your Purchase</h2>
              <button className="close-form-btn" onClick={closeForm}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="order-form">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <textarea
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="mobile"
                placeholder="Mobile"
                value={form.mobile}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="submit-order-btn"
                disabled={loading}
              >
                {loading ? "Sending..." : "Submit Order"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
