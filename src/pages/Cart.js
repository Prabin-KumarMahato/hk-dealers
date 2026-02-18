import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import emailjs from "@emailjs/browser";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const [showOrderForm, setShowOrderForm] = useState(false);
  const [loading, setLoading] = useState(false);

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

    setTimeout(() => {
      document.querySelector(".order-form-section")?.scrollIntoView({
        behavior: "smooth"
      });
    }, 100);
  };

  const closeForm = () => {
    setShowOrderForm(false);
  };

  // ✅ EMAILJS SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const productList = cartItems
      .map(
        (item, index) =>
          `${index + 1}. ${item.brand} ${item.model} - Rs. ${item.price}`
      )
      .join("\n");

    const templateParams = {
      name: form.name,
      address: form.address,
      mobile: form.mobile,
      email: form.email,
      message: form.message,
      product: productList,
      quantity: cartItems.length,
      total: totalPrice
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

        setShowOrderForm(false);
        setLoading(false);

        clearCart(); // optional auto clear
      })
      .catch((error) => {
        console.error(error);
        alert("❌ Failed to send order");
        setLoading(false);
      });
  };

  if (cartItems.length === 0) {
    return (
      <div
        className="container"
        style={{
          paddingTop: "3rem",
          paddingBottom: "3rem",
          textAlign: "center"
        }}
      >
        <h2>Your Cart is Empty</h2>
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

          {/* LEFT — ITEMS */}
          <div className="cart-items-section">
            <div className="cart-items-card">

              <h3>Cart Items ({cartItems.length})</h3>

              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">

                  <img
                    src={item.image}
                    alt={item.model}
                    className="cart-item-image"
                  />

                  <div className="cart-item-details">
                    <h4>{item.brand} {item.model}</h4>
                    <div>Rs. {item.price}</div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>

                </div>
              ))}

              <button onClick={clearCart} className="clear-cart-btn">
                Clear Cart
              </button>

            </div>
          </div>

          {/* RIGHT — SUMMARY */}
          <div className="order-summary-section">
            <div className="order-summary-card">

              <h3>Order Summary</h3>

              <div>Total Items: {cartItems.length}</div>
              <div>Total Price: Rs. {totalPrice}</div>

              <button className="buy-now-btn" onClick={handleBuyNowClick}>
                Buy Now
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

export default Cart;
