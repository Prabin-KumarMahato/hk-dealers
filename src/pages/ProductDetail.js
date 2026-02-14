import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import watches from "../data/watches";
import { CartContext } from "../context/CartContext";
import "./ProductDetail.css"; // You'll need to create this CSS file

const ProductDetail = () => {
  const { id } = useParams();
  const product = watches.find((w) => w.id === Number(id));
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalPrice = product.price * quantity;
    const emailSubject = `New Order: ${product.brand} ${product.model}`;
    const emailBody = `
CUSTOMER DETAILS:
----------------
Full Name: ${form.name}
Address: ${form.address}
Mobile Number: ${form.mobile}
Email: ${form.email}

ORDER DETAILS:
--------------
Product: ${product.brand} ${product.model}
Quantity: ${quantity}
Unit Price: Rs. ${product.price}
Total Price: Rs. ${totalPrice}
Condition: ${product.condition}

CUSTOMER MESSAGE:
----------------
${form.message || "No additional message"}

DELIVERY PREFERENCE:
-------------------
Standard Delivery Available
Cash on Delivery Available

---
This order is from Watch Nepal website.
    `.trim();

    window.location.href = `mailto:admin@watchnepal.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Reset form after submission
    setForm({ name: "", address: "", mobile: "", email: "", message: "" });
    setQuantity(1);
    alert("Email client opened! Please send the email to complete your order.");
  };

  // Calculate discounted price (if you have original price)
  const originalPrice = product.price * 1.55; // Example: if current is 55% off
  const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <div className="product-detail-container">
      <div className="container">
        {/* Breadcrumb */}
        <Link to="/products" className="back-link">
          ← Back to Products
        </Link>

        <div className="product-main">
          {/* Left Column - Product Image */}
          <div className="product-image-section">
            <img
              src={product.image}
              alt={`${product.brand} ${product.model}`}
              className="product-detail-image"
            />
          </div>

          {/* Right Column - Product Info */}
          <div className="product-info-section">
            <div className="product-brand">{product.brand}</div>
            <h1 className="product-title">{product.model}</h1>
            
            {/* Ratings */}
            <div className="product-ratings">
             
              
            </div>

            {/* Brand Info */}
            <div className="brand-info">
              Brand: No Brand | More Computer Components from No Brand
            </div>

            {/* Price Section */}
            <div className="price-section">
              <span className="current-price">Rs. {product.price}</span>
              <span className="original-price">Rs. {Math.round(originalPrice)}</span>
              <span className="discount">-{discount}%</span>
            </div>

            {/* Color Family */}
            <div className="color-family">
              <span className="label">Color Family</span>
              <span className="value">Black</span>
            </div>

            {/* Quantity */}
            <div className="quantity-section">
              <span className="label">Quantity</span>
              <div className="quantity-control">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="quantity-btn"
                >−</button>
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
                >+</button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="buy-now-btn">Buy Now</button>
              <button 
                onClick={() => addToCart(product)}
                className="add-to-cart-btn"
              >
                Add to Cart
              </button>
            </div>

            {/* Delivery Options */}
            <div className="delivery-options">
              <h3>Delivery Options</h3>
              
              <div className="delivery-item">
                <span className="delivery-label">📍 Bagmati, Kathmandu Metro</span>
                <span className="delivery-value">22 - Newroad Area, Newroad</span>
                <button className="change-btn">CHANGE</button>
              </div>

              <div className="delivery-item">
                <span className="delivery-label">📦 Standard Delivery</span>
                <span className="delivery-value">Guaranteed by 10-11 Dec</span>
                <span className="delivery-price">Rs. 83</span>
              </div>

              <div className="delivery-item">
                <span className="delivery-label">💵 Cash on Delivery Available</span>
              </div>

              <div className="delivery-item">
                <span className="delivery-label">↩️ Return & Warranty</span>
                <span className="delivery-value">Change of Mind</span>
              </div>

              <div className="delivery-item">
                <span className="delivery-label">🔄 14 Days Free Returns</span>
              </div>

              <div className="delivery-item">
                <span className="delivery-label">⚠️ Warranty not available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Form */}
        <div className="order-form-section">
          <h2>Place Your Order</h2>
          <p className="form-subtitle">Fill in your details to complete the purchase</p>

          <form onSubmit={handleSubmit} className="order-form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Delivery Address *</label>
              <textarea
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Street address, city, district"
                rows="3"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="mobile">Mobile Number *</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="98XXXXXXXX"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Additional Message (Optional)</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Any special instructions or requests..."
                rows="4"
              />
            </div>

            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-item">
                <span>Product:</span>
                <span>{product.brand} {product.model}</span>
              </div>
              <div className="summary-item">
                <span>Quantity:</span>
                <span>{quantity}</span>
              </div>
              <div className="summary-item">
                <span>Unit Price:</span>
                <span>Rs. {product.price}</span>
              </div>
              <div className="summary-item total">
                <span>Total Amount:</span>
                <span>Rs. {product.price * quantity}</span>
              </div>
            </div>

            <button type="submit" className="submit-order-btn">
              Submit Order
            </button>

            <p className="form-note">* Required fields</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;