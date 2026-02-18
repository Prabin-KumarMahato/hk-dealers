import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ EMAILJS SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message
    };

    emailjs
      .send(
        "service_x2sy4ov",      // your service ID
        "template_2mtyx2p",     // your template ID
        templateParams,
        "1_0YGRViezqRkyJFD"     // your public key
      )
      .then(() => {
        alert("✅ Message sent successfully!");

        setForm({
          name: "",
          email: "",
          subject: "",
          message: ""
        });

        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        alert("❌ Failed to send message");
        setLoading(false);
      });
  };

  return (
    <div className="contact-page">
      <div className="container">

        {/* Header */}
        <div className="contact-header">
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-subtitle">
            Have questions about HK DEALERS? Need support with your luxury watch purchase? 
            We're here to help you on your horology journey.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="contact-cards">
          <div className="contact-card">
            <div className="card-icon">📧</div>
            <h3 className="card-title">Email Us</h3>
            <p className="card-text">
              Send us an email and we'll respond within 24 hours
            </p>
            <a href="mailto:himanshu982472@gmail.com" className="card-link">
              himanshu982472@gmail.com
            </a>
          </div>

          <div className="contact-card">
            <div className="card-icon">💬</div>
            <h3 className="card-title">Live Chat</h3>
            <p className="card-text">
              Chat with our support team directly on social media
            </p>
            <p className="card-hours">Available 9 AM - 7 PM</p>
          </div>

          <div className="contact-card">
            <div className="card-icon">📞</div>
            <h3 className="card-title">Call Us</h3>
            <p className="card-text">
              Speak directly with our luxury watch specialists
            </p>
            <a href="tel:+9779824722712" className="card-link">
              +977 9824722712
            </a>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="contact-grid">

          {/* FORM */}
          <div className="contact-form-section">
            <div className="form-card">
              <h2 className="form-title">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="contact-form">

                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
