import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { CartContext } from "../context/CartContext.jsx";
import { api } from "../api/client.js";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, createOrder } = useContext(CartContext);

  const [showOrderForm, setShowOrderForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [form, setForm] = useState({
    name: "",
    address: "",
    mobile: "",
    email: "",
    message: "",
  });

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSubmitError("");
  };

  const handleBuyNowClick = () => {
    setShowOrderForm(true);
    setSubmitError("");
    setTimeout(() => {
      document.querySelector(".order-form-section")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  const closeForm = () => {
    setShowOrderForm(false);
    setSubmitError("");
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    const orderData = {
      name: form.name.trim(),
      address: form.address.trim(),
      mobile: form.mobile.trim(),
      email: form.email.trim(),
      message: (form.message || "").trim(),
      items: cartItems.map((item) => ({
        productId: item.id || item.productId,
        qty: item.quantity || 1,
      })),
      totalPrice,
    };

    console.log("Submitting order:", orderData);

    try {
      await createOrder(orderData);
      console.log("Order saved to backend successfully");

      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_x2sy4ov",
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_2mtyx2p",
          {
            name: form.name,
            email: form.email,
            subject: `New Order - ${form.name}`,
            message: `Order from ${form.name}\nEmail: ${form.email}\nMobile: ${form.mobile}\nAddress: ${form.address}\nMessage: ${form.message || "—"}\n\nItems: ${cartItems.length}\nTotal: Rs. ${totalPrice}`,
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "1_0YGRViezqRkyJFD"
        );
        console.log("Order confirmation email sent");
      } catch (emailErr) {
        console.error("EmailJS error (order still saved):", emailErr);
      }

      setShowSuccessModal(true);
      setForm({ name: "", address: "", mobile: "", email: "", message: "" });
      setShowOrderForm(false);
      clearCart();

      setTimeout(() => setShowSuccessModal(false), 4000);
    } catch (error) {
      console.error("Order submit error:", error);
      const message = error?.message || error?.response?.data?.message || "Failed to submit order. Please try again.";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (cartItems.length === 0 && !showOrderForm) {
    return (
      <div
        className="container"
        style={{
          paddingTop: "3rem",
          paddingBottom: "3rem",
          textAlign: "center",
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
      {showSuccessModal && (
        <div
          className="success-modal-overlay"
          onClick={() => setShowSuccessModal(false)}
        >
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="success-title">Order Sent Successfully!</h2>
            <p className="success-message">
              Thank you for your order! We have saved it and will contact you shortly.
            </p>
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
        <h1 className="cart-title">Your Shopping Cart</h1>

        <div className="cart-grid">
          <div className="cart-items-section">
            <div className="cart-items-card">
              <h3>Cart Items ({cartItems.length})</h3>

              {cartItems.map((item) => (
                <div key={item.id || item.productId} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.model || item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h4>
                      {item.brand} {item.model || item.name}
                    </h4>
                    <div>Price: Rs. {item.price}</div>
                    <div>Qty: {item.quantity}</div>
                    <div>Subtotal: Rs. {(item.price || 0) * (item.quantity || 0)}</div>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id || item.productId)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button onClick={handleClearCart} className="clear-cart-btn">
                Clear Cart
              </button>
            </div>
          </div>

          <div className="order-summary-section">
            <div className="order-summary-card">
              <h3>Order Summary</h3>
              <div>Total Products: {cartItems.length}</div>
              <div>
                Total Quantity:{" "}
                {cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0)}
              </div>
              <div>Total Price: Rs. {totalPrice}</div>
              <button className="buy-now-btn" onClick={handleBuyNowClick}>
                Buy Now
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
              {submitError && (
                <div className="order-form-error" role="alert">
                  {submitError}
                </div>
              )}
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
                placeholder="Message (optional)"
                value={form.message}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="submit-order-btn"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Submit Order"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
