import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import watches from "../data/watches";
import { CartContext } from "../context/CartContext";
import emailjs from "@emailjs/browser";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const product = watches.find((w) => w.id === Number(id));
  const { addToCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    address: "",
    mobile: "",
    email: "",
    message: ""
  });

  if (!product) {
    return (
      <div className="container" style={{ paddingTop: "3rem", textAlign: "center" }}>
        <h2>Product not found</h2>
        <Link to="/products" className="btn btn-primary" style={{ marginTop: "1rem" }}>
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

  // ✅ EMAILJS SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      name: form.name,
      address: form.address,
      mobile: form.mobile,
      email: form.email,
      message: form.message,
      product: `${product.brand} ${product.model}`,
      quantity: quantity,
      total: product.price * quantity
    };

    emailjs
      .send(
        "service_x2sy4ov",
        "template_2mtyx2p",
        templateParams,
        "1_0YGRViezqRkyJFD"
      )
      .then(() => {
        alert("✅ Order sent successfully!");

        setForm({
          name: "",
          address: "",
          mobile: "",
          email: "",
          message: ""
        });

        setQuantity(1);
        setShowOrderForm(false);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        alert("❌ Failed to send order");
        setLoading(false);
      });
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
  const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <div className="product-detail-container">
      <div className="container">

        <Link to="/products" className="back-link">
          ← Back to Products
        </Link>

        <div className="product-main">

          {/* Image */}
          <div className="product-image-section">
            <img
              src={product.image}
              alt={`${product.brand} ${product.model}`}
              className="product-detail-image"
            />
          </div>

          {/* Info */}
          <div className="product-info-section">

            <div className="product-brand">{product.brand}</div>
            <h1 className="product-title">{product.model}</h1>

            <div className="price-section">
              <span className="current-price">Rs. {product.price}</span>
              <span className="original-price">Rs. {Math.round(originalPrice)}</span>
              <span className="discount">-{discount}%</span>
            </div>

            {/* Quantity */}
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

            {/* Buttons */}
            <div className="action-buttons">
              <button className="buy-now-btn" onClick={handleBuyNowClick}>
                Buy Now
              </button>

              <button
                onClick={() => addToCart(product,quantity)}
                className="add-to-cart-btn"
              >
                Add to Cart
              </button>
            </div>

          </div>
        </div>

        {/* ORDER FORM */}
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

              <button type="submit" className="submit-order-btn" disabled={loading}>
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
