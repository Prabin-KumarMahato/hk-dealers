import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendCartEmail = (e) => {
    e.preventDefault();

    const productList = cartItems
      .map((item, index) => `${index + 1}. ${item.brand} ${item.model}
   Price: HKD ${item.price.toLocaleString()}
   Condition: ${item.condition}`)
      .join("\n\n");

    const emailSubject = `Cart Order Inquiry - ${cartItems.length} Watch${cartItems.length > 1 ? 'es' : ''}`;
    const emailBody = `
CUSTOMER INFORMATION:
Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}

PRODUCTS IN CART (${cartItems.length} item${cartItems.length > 1 ? 's' : ''}):

${productList}

TOTAL VALUE: HKD ${totalPrice.toLocaleString()}

CUSTOMER MESSAGE:
${form.message || "No additional message"}

---
This is a multiple product inquiry from WatchHK website.
    `.trim();

    window.location.href = `mailto:admin@watchhk.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Reset form after submission
    setForm({ name: "", email: "", phone: "", message: "" });
    alert("Email client opened! Please send the email to complete your inquiry.");
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
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
      <h1 style={{ marginBottom: "2rem" }}>Your Shopping Cart</h1>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
        <div>
          <div style={{
            background: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            padding: "1.5rem"
          }}>
            <h3 style={{ marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "2px solid #f0f0f0" }}>
              Cart Items ({cartItems.length})
            </h3>

            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr auto",
                  gap: "1.5rem",
                  padding: "1.5rem 0",
                  borderBottom: "1px solid #f0f0f0"
                }}
              >
                <img
                  src={item.image}
                  alt={`${item.brand} ${item.model}`}
                  style={{
                    width: "100%",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "6px"
                  }}
                />

                <div>
                  <div style={{ color: "#999", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                    {item.brand}
                  </div>
                  <h4 style={{ marginBottom: "0.5rem", fontSize: "1.1rem" }}>{item.model}</h4>
                  <div style={{
                    display: "inline-block",
                    padding: "0.25rem 0.75rem",
                    background: item.condition === "New" ? "#e8f5e9" : "#fff3e0",
                    color: item.condition === "New" ? "#2e7d32" : "#e65100",
                    borderRadius: "4px",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    marginBottom: "0.5rem"
                  }}>
                    {item.condition}
                  </div>
                  <div style={{ fontWeight: "bold", color: "#d4af37", fontSize: "1.2rem" }}>
                    HKD {item.price.toLocaleString()}
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: "#ff4444",
                      color: "white",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      fontWeight: "600"
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div style={{ marginTop: "1.5rem", textAlign: "right" }}>
              <button
                onClick={clearCart}
                style={{
                  background: "transparent",
                  color: "#666",
                  border: "1px solid #ddd",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.9rem"
                }}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        <div>
          <div style={{
            background: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            padding: "1.5rem",
            position: "sticky",
            top: "2rem"
          }}>
            <h3 style={{ marginBottom: "1.5rem" }}>Order Summary</h3>
            
            <div style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid #f0f0f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "#666" }}>Items:</span>
                <span>{cartItems.length}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "#666" }}>Subtotal:</span>
                <span>HKD {totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              fontSize: "1.3rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
              paddingTop: "1rem"
            }}>
              <span>Total:</span>
              <span style={{ color: "#d4af37" }}>HKD {totalPrice.toLocaleString()}</span>
            </div>

            <div style={{
              background: "#f9f9f9",
              padding: "1rem",
              borderRadius: "4px",
              marginBottom: "1rem",
              fontSize: "0.85rem",
              color: "#666"
            }}>
              <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
                <li>Free worldwide shipping</li>
                <li>2-year warranty included</li>
                <li>Authentic guarantee</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        background: "white",
        padding: "2.5rem",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        marginTop: "3rem",
        maxWidth: "800px",
        margin: "3rem auto 0"
      }}>
        <h2 style={{ marginBottom: "0.5rem", textAlign: "center" }}>Send Cart Inquiry</h2>
        <p style={{ textAlign: "center", color: "#666", marginBottom: "2rem" }}>
          Ready to proceed? Fill out the form below and we'll contact you about your selected watches.
        </p>

        <form onSubmit={sendCartEmail}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "1rem"
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "1rem"
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+852 1234 5678"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "1rem"
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
              Additional Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Any specific questions or requirements?"
              rows="4"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "1rem",
                resize: "vertical"
              }}
            />
          </div>

          <div style={{
            background: "#f9f9f9",
            padding: "1rem",
            borderRadius: "4px",
            marginBottom: "1.5rem"
          }}>
            <strong style={{ display: "block", marginBottom: "0.5rem" }}>Selected Watches:</strong>
            <ul style={{ margin: 0, paddingLeft: "1.5rem", fontSize: "0.9rem", color: "#666" }}>
              {cartItems.map((item, index) => (
                <li key={item.id} style={{ marginBottom: "0.25rem" }}>
                  {item.brand} {item.model} - HKD {item.price.toLocaleString()}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "0.75rem", fontWeight: "bold", fontSize: "1.05rem" }}>
              Total: HKD {totalPrice.toLocaleString()}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: "100%",
              padding: "1rem",
              fontSize: "1.1rem"
            }}
          >
            Send Cart Inquiry via Email
          </button>

          <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.85rem", color: "#999" }}>
            * Required fields
          </p>
        </form>
      </div>
    </div>
  );
};

export default Cart;