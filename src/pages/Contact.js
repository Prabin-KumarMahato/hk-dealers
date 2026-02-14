import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailSubject = form.subject || "General Inquiry - WatchHK";
    const emailBody = `
Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}

Subject: ${form.subject}

Message:
${form.message}
    `.trim();

    window.location.href = `mailto:your@email.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  };

  return (
    <div
      className="container"
      style={{ paddingTop: "2rem", paddingBottom: "3rem" }}
    >
      <h1 style={{ marginBottom: "2rem" }}> Contact Us </h1>{" "}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          marginBottom: "3rem"
        }}
      >
        <div>
          <h2 style={{ marginBottom: "1.5rem", color: "#d4af37" }}>
            {" "}
            Get in Touch{" "}
          </h2>{" "}
          <p style={{ lineHeight: "1.8", color: "#555", marginBottom: "2rem" }}>
            Have questions about our luxury timepieces ? Our expert team is here
            to help.Fill out the form and we 'll get back to you within 24
            hours.{" "}
          </p>{" "}
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
              {" "}
              Contact Information{" "}
            </h3>{" "}
            <div style={{ lineHeight: "2.5", color: "#555" }}>
              <div style={{ marginBottom: "1rem" }}>
                <strong> Email : </strong> <br />
                <a href="mailto:info@watchhk.com" style={{ color: "#d4af37" }}>
                  info @watchhk.com{" "}
                </a>{" "}
              </div>{" "}
              <div style={{ marginBottom: "1rem" }}>
                <strong> Phone: </strong> <br />
                <a href="tel:+9771234567890" style={{ color: "#d4af37" }}>
                  +977 1234 567 890{" "}
                </a>{" "}
              </div>{" "}
              <div style={{ marginBottom: "1rem" }}>
                <strong> WhatsApp: </strong> <br />
                <a
                  href="https://wa.me/9771234567890"
                  style={{ color: "#d4af37" }}
                >
                  +977 1234 567 890{" "}
                </a>{" "}
              </div>{" "}
              <div>
                <strong> Address: </strong> <br />
                Durbar Marg, Kathmandu <br />
                Nepal{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div
            style={{
              background: "#f9f9f9",
              padding: "1.5rem",
              borderRadius: "8px"
            }}
          >
            <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
              {" "}
              Business Hours{" "}
            </h3>{" "}
            <div style={{ lineHeight: "2", color: "#555" }}>
              <div> Monday - Friday: 10: 00 AM - 7: 00 PM </div>{" "}
              <div> Saturday: 10: 00 AM - 6: 00 PM </div>{" "}
              <div> Sunday: Closed </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div>
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
          >
            <h2 style={{ marginBottom: "1.5rem" }}> Send us a Message </h2>{" "}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "600"
                  }}
                >
                  Full Name *
                </label>{" "}
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
                />{" "}
              </div>{" "}
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "600"
                  }}
                >
                  Email Address *
                </label>{" "}
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
                />{" "}
              </div>{" "}
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "600"
                  }}
                >
                  Phone Number{" "}
                </label>{" "}
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+977 1234 567 890"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "1rem"
                  }}
                />{" "}
              </div>{" "}
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "600"
                  }}
                >
                  Subject *
                </label>{" "}
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What is this regarding?"
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "1rem"
                  }}
                />{" "}
              </div>{" "}
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "600"
                  }}
                >
                  Message *
                </label>{" "}
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows="6"
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "1rem",
                    resize: "vertical"
                  }}
                />{" "}
              </div>{" "}
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  width: "100%",
                  padding: "1rem",
                  fontSize: "1.1rem"
                }}
              >
                Send Message{" "}
              </button>{" "}
              <p
                style={{
                  textAlign: "center",
                  marginTop: "1rem",
                  fontSize: "0.85rem",
                  color: "#999"
                }}
              >
                * Required fields{" "}
              </p>{" "}
            </form>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div
        style={{
          background: "#1a1a1a",
          color: "white",
          padding: "3rem",
          borderRadius: "8px",
          textAlign: "center"
        }}
      >
        <h2 style={{ marginBottom: "1rem", color: "#d4af37" }}>
          {" "}
          Schedule a Private Viewing{" "}
        </h2>{" "}
        <p
          style={{
            lineHeight: "1.8",
            marginBottom: "1.5rem",
            maxWidth: "600px",
            margin: "0 auto 1.5rem"
          }}
        >
          Book an appointment to view our exclusive collection in our luxury
          showroom.Our experts will provide personalized assistance to help you
          find your perfect timepiece.{" "}
        </p>{" "}
        <a
          href="mailto:appointments@watchhk.com"
          className="btn btn-primary"
          style={{ display: "inline-block" }}
        >
          Book Appointment{" "}
        </a>{" "}
      </div>{" "}
    </div>
  );
};

export default Contact;
