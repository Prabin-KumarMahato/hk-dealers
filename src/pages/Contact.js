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
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
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
        "service_x2sy4ov",
        "template_2mtyx2p",
        templateParams,
        "1_0YGRViezqRkyJFD"
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

            <div className="social-links">
              <a href="https://www.instagram.com/hkdealers9824/" className="social-link">Instagram</a>
              <a href="https://www.facebook.com/hk.dealers.337205" className="social-link">Facebook</a>
            </div>
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

        {/* Main Grid */}
        <div className="contact-grid">

          {/* LEFT — FORM */}
          <div className="contact-form-section">
            <div className="form-card">

              <h2 className="form-title">Send us a Message</h2>
              <p className="form-subtitle">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

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
                  <label>Email Address *</label>
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

              <div className="response-guarantee">
                <div className="guarantee-item">
                  <span className="guarantee-value">2-4hrs</span>
                  <span className="guarantee-label">Response Time</span>
                </div>

                <div className="guarantee-item">
                  <span className="guarantee-value">24/7</span>
                  <span className="guarantee-label">Web App Support</span>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT — MAP + INFO */}
          <div className="info-section">

            {/* Google Map */}
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.5805154653167!2d85.32247917507922!3d27.668447376204966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19b262b8126d%3A0xec98f46764ed2b95!2sHK%20DEALERS%20(%20Himanshu%20kumar%20Dealers)!5e0!3m2!1sen!2sin!4v1771155463042!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen
                loading="lazy"
                title="HK DEALERS Location"
              ></iframe>
            </div>

            {/* Business Info */}
            <div className="business-info">

              <h3 className="info-title">Visit Our Showroom</h3>

              <div className="info-details">

                <div className="info-row">
                  <span className="info-label">📍 Address:</span>
                  <span className="info-value">
                    Shiva Saloon, Prayag Pokhari Marg,<br />
                    Lalitpur 44600, Nepal
                  </span>
                </div>

                <div className="info-row">
                  <span className="info-label">📧 Email:</span>
                  <span className="info-value">
                    himanshu982472@gmail.com
                  </span>
                </div>

                <div className="info-row">
                  <span className="info-label">📞 Phone:</span>
                  <span className="info-value">
                    +977 9824722712
                  </span>
                </div>

                <div className="info-row">
                  <span className="info-label">💬 WhatsApp:</span>
                  <span className="info-value">
                    +977 9824722712
                  </span>
                </div>

              </div>

            </div>

            {/* Business Hours */}
            <div className="business-hours">

              <h3 className="hours-title">🕒 Business Hours</h3>

              <div className="hours-grid">

                <div className="hours-row"><span>Monday</span><span>10 am–7 pm</span></div>
                <div className="hours-row"><span>Tuesday</span><span>10 am–7 pm</span></div>
                <div className="hours-row"><span>Wednesday</span><span>10 am–7 pm</span></div>
                <div className="hours-row"><span>Thursday</span><span>10 am–7 pm</span></div>
                <div className="hours-row"><span>Friday</span><span>9 am–7 pm</span></div>
                <div className="hours-row closed"><span>Saturday</span><span>Closed</span></div>
                <div className="hours-row"><span>Sunday</span><span>9 am–7 pm</span></div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
