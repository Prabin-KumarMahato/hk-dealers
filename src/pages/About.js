import React from "react";

const About = () => {
  return (
    <div
      className="container"
      style={{ paddingTop: "2rem", paddingBottom: "3rem" }}
    >
      <h1 style={{ marginBottom: "2rem" }}> About WatchHK </h1>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ marginBottom: "1rem", color: "#d4af37" }}>
            Nepal 's Premier Luxury Watch Dealer{" "}
          </h2>{" "}
          <p style={{ lineHeight: "1.8", color: "#555", marginBottom: "1rem" }}>
            Welcome to WatchHK, your trusted destination for authentic luxury
            timepieces in Nepal.Since our establishment, we have been dedicated
            to bringing the world 's finest watches to discerning collectors and
            enthusiasts.{" "}
          </p>{" "}
          <p style={{ lineHeight: "1.8", color: "#555", marginBottom: "1rem" }}>
            Our carefully curated collection features prestigious brands
            including Rolex, Patek Philippe, Audemars Piguet, Omega, and
            Cartier.Each timepiece in our inventory is meticulously verified for
            authenticity and condition by our team of expert horologists.{" "}
          </p>{" "}
        </div>
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ marginBottom: "1rem", color: "#d4af37" }}>
            {" "}
            Our Commitment{" "}
          </h2>{" "}
          <div
            style={{
              display: "grid",
              gap: "1.5rem",
              background: "#f9f9f9",
              padding: "2rem",
              borderRadius: "8px"
            }}
          >
            <div>
              <h3 style={{ marginBottom: "0.5rem", fontSize: "1.2rem" }}>
                {" "}
                Authenticity Guaranteed{" "}
              </h3>{" "}
              <p style={{ lineHeight: "1.8", color: "#555" }}>
                Every watch we sell comes with a certificate of authenticity and
                has been thoroughly inspected by our expert team.We guarantee
                100 % genuine luxury timepieces.{" "}
              </p>{" "}
            </div>{" "}
            <div>
              <h3 style={{ marginBottom: "0.5rem", fontSize: "1.2rem" }}>
                {" "}
                Expert Knowledge{" "}
              </h3>{" "}
              <p style={{ lineHeight: "1.8", color: "#555" }}>
                Our team consists of certified watch specialists with decades of
                combined experience in luxury horology.We 're here to guide you
                through every step of your purchase.{" "}
              </p>{" "}
            </div>{" "}
            <div>
              <h3 style={{ marginBottom: "0.5rem", fontSize: "1.2rem" }}>
                {" "}
                Complete Service{" "}
              </h3>{" "}
              <p style={{ lineHeight: "1.8", color: "#555" }}>
                From purchase to after - sales support, we provide comprehensive
                service including warranty coverage, maintenance, and trade - in
                options for your collection.{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ marginBottom: "1rem", color: "#d4af37" }}>
            {" "}
            Why Choose Us ?{" "}
          </h2>{" "}
          <ul
            style={{ lineHeight: "2.5", color: "#555", paddingLeft: "1.5rem" }}
          >
            <li> Largest selection of luxury watches in Nepal </li>{" "}
            <li> Competitive pricing and flexible payment options </li>{" "}
            <li> 2 - year comprehensive warranty on all timepieces </li>{" "}
            <li> Free worldwide insured shipping </li>{" "}
            <li> Professional servicing and maintenance </li>{" "}
            <li> Trade - in and consignment services </li>{" "}
            <li> Personalized customer service </li>{" "}
          </ul>{" "}
        </div>
        <div
          style={{
            background: "#1a1a1a",
            color: "white",
            padding: "2rem",
            borderRadius: "8px",
            textAlign: "center"
          }}
        >
          <h2 style={{ marginBottom: "1rem", color: "#d4af37" }}>
            {" "}
            Visit Our Showroom{" "}
          </h2>{" "}
          <p style={{ lineHeight: "1.8", marginBottom: "1.5rem" }}>
            Experience our collection in person at our luxury showroom in
            Kathmandu.Schedule an appointment for personalized service.{" "}
          </p>{" "}
          <a
            href="/contact"
            className="btn btn-primary"
            style={{ display: "inline-block" }}
          >
            Contact Us{" "}
          </a>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default About;
