import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Cart.css"; // Create this CSS file

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    address: "",
    mobile: "",
    email: "",
    message: ""
  });

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBuyNowClick = () => {
    setShowOrderForm(true);
    // Scroll to form smoothly
    setTimeout(() => {
      document.querySelector('.order-form-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

  const closeForm = () => {
    setShowOrderForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productList = cartItems
      .map((item, index) => `${index + 1}. ${item.brand} ${item.model}
   Price: Rs. ${item.price.toLocaleString()}
   Condition: ${item.condition}`)
      .join("\n\n");

    const emailSubject = `New Order - ${cartItems.length} Item${cartItems.length > 1 ? 's' : ''}`;
    const emailBody = `
CUSTOMER DETAILS:
----------------
Full Name: ${form.name}
Address: ${form.address}
Mobile Number: ${form.mobile}
Email: ${form.email}

ORDER DETAILS:
--------------
${productList}

TOTAL AMOUNT: Rs. ${totalPrice.toLocaleString()}

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
    setShowOrderForm(false);
    alert("Email client opened! Please send the email to complete your order.");
  };

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ paddingTop: "3rem", paddingBottom: "3rem", textAlign: "center" }}>
        <h2 style={{ marginBottom: "1rem" }}>Your Cart is Empty</h2>
        <p style={{ color: "#666", marginBottom: "2rem" }}>
          Looks like you haven't added any watches to your cart yet.
        </p>
        <Link to="/products" className="btn btn-primary">
          Browse Watches
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="container">
        <h1 className="cart-title">Your Shopping Cart</h1>

        <div className="cart-grid">
          {/* Left Column - Cart Items */}
          <div className="cart-items-section">
            <div className="cart-items-card">
              <div className="cart-items-header">
                <h3>Cart Items ({cartItems.length})</h3>
              </div>

              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={`${item.brand} ${item.model}`}
                    className="cart-item-image"
                  />

                  <div className="cart-item-details">
                    <div className="cart-item-brand">{item.brand}</div>
                    <h4 className="cart-item-name">{item.model}</h4>
                    <div className={`cart-item-condition ${item.condition === "New" ? "condition-new" : "condition-used"}`}>
                      {item.condition}
                    </div>
                    <div className="cart-item-price">Rs. {item.price.toLocaleString()}</div>
                  </div>

                  <div className="cart-item-actions">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="cart-footer">
                <button
                  onClick={clearCart}
                  className="clear-cart-btn"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="order-summary-section">
            <div className="order-summary-card">
              <h3>Order Summary</h3>
              
              <div className="summary-details">
                <div className="summary-row">
                  <span>Items:</span>
                  <span>{cartItems.length}</span>
                </div>
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>Rs. {totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="summary-total">
                <span>Total:</span>
                <span className="total-amount">Rs. {totalPrice.toLocaleString()}</span>
              </div>

              <button 
                className="buy-now-btn"
                onClick={handleBuyNowClick}
              >
                Buy Now
              </button>

              <div className="summary-features">
                <ul>
                  <li>Free worldwide shipping</li>
                  <li>2-year warranty included</li>
                  <li>Authentic guarantee</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Order Form - Shows when Buy Now is clicked */}
        {showOrderForm && (
          <div className="order-form-section">
            <div className="form-header">
              <h2>Complete Your Purchase</h2>
              <button className="close-form-btn" onClick={closeForm}>×</button>
            </div>
            <p className="form-subtitle">
              Fill in your details to complete the order for {cartItems.length} item{cartItems.length > 1 ? 's' : ''}
            </p>

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

              <div className="order-summary-box">
                <h4>Order Summary</h4>
                {cartItems.map((item, index) => (
                  <div key={item.id} className="summary-item">
                    <span>{item.brand} {item.model} x 1</span>
                    <span>Rs. {item.price.toLocaleString()}</span>
                  </div>
                ))}
                <div className="summary-item total">
                  <span>Total Amount:</span>
                  <span>Rs. {totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button type="submit" className="submit-order-btn">
                Submit Order
              </button>

              <p className="form-note">* Required fields</p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;