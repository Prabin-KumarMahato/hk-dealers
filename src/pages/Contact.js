import React, { useState } from "react";
import "./Contact.css"; // Create this CSS file

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailSubject = form.subject || "Contact Inquiry - HK DEALERS";
    const emailBody = `
Name: ${form.name}
Email: ${form.email}
Subject: ${form.subject}

Message:
${form.message}
    `.trim();

    window.location.href = `mailto:himanshu982472@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    alert("Email client opened! Please send the email to complete your inquiry.");
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
          {/* Email Card */}
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

          {/* Live Chat Card */}
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

          {/* Call Card */}
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
          {/* Left Column - Form */}
          <div className="contact-form-section">
            <div className="form-card">
              <h2 className="form-title">Send us a Message</h2>
              <p className="form-subtitle">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
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
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    rows="5"
                    required
                  />
                </div>

                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>

              {/* Quick Response Guarantee */}
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

          {/* Right Column - Map & Info */}
          <div className="info-section">
            {/* Google Maps */}
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.5805154653167!2d85.32247917507922!3d27.668447376204966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19b262b8126d%3A0xec98f46764ed2b95!2sHK%20DEALERS%20(%20Himanshu%20kumar%20Dealers)!5e0!3m2!1sen!2sin!4v1771155463042!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
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
                  <a href="mailto:himanshu982472@gmail.com" className="info-link">
                    himanshu982472@gmail.com
                  </a>
                </div>

                <div className="info-row">
                  <span className="info-label">📞 Phone:</span>
                  <a href="tel:+9779824722712" className="info-link">
                    +977 9824722712
                  </a>
                </div>

                <div className="info-row">
                  <span className="info-label">💬 WhatsApp:</span>
                  <a href="https://wa.me/9779824722712" className="info-link">
                    +977 9824722712
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="business-hours">
              <h3 className="hours-title">🕒 Business Hours</h3>
              <div className="hours-grid">
                <div className="hours-row">
                  <span>Monday</span>
                  <span>10 am–7 pm</span>
                </div>
                <div className="hours-row">
                  <span>Tuesday</span>
                  <span>10 am–7 pm</span>
                </div>
                <div className="hours-row">
                  <span>Wednesday</span>
                  <span>10 am–7 pm</span>
                </div>
                <div className="hours-row">
                  <span>Thursday</span>
                  <span>10 am–7 pm</span>
                </div>
                <div className="hours-row">
                  <span>Friday</span>
                  <span>9 am–7 pm</span>
                </div>
                <div className="hours-row closed">
                  <span>Saturday</span>
                  <span>closed</span>
                </div>
                <div className="hours-row ">
                  <span>Sunday</span>
                  <span>9 am–7 pm</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2 className="cta-title">Schedule a Private Viewing</h2>
          <p className="cta-text">
            Book an appointment to view our exclusive collection in our luxury showroom. 
            Our experts will provide personalized assistance to help you find your perfect timepiece.
          </p>
          <a href="http://localhost:5000/api/contact" className="cta-btn">
            Book Appointment
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;