import React from "react";

const About = () => {
  return (
    <div className='about-section'>
      <div className='about-container'>
        <h1> About Us </h1>
        <section className='about-content'>
          <h2> Welcome to HK </h2>{" "}
          <p>
            We are a leading e - commerce platform dedicated to bringing you the
            finest selection of products at competitive prices.With years of
            experience in the industry, we pride ourselves on delivering
            exceptional customer service and high - quality products.{" "}
          </p>{" "}
        </section>
        <section className='about-content'>
          <h2> Our Mission </h2>{" "}
          <p>
            Our mission is to make online shopping easy, affordable, and
            enjoyable for everyone.We believe in providing a seamless shopping
            experience with reliable delivery and customer support.{" "}
          </p>{" "}
        </section>
        <section className='about-content'>
          <h2> Why Choose Us ? </h2>{" "}
          <ul>
            <li> Wide variety of products across multiple categories </li>{" "}
            <li> Competitive pricing and regular discounts </li>{" "}
            <li> Fast and reliable shipping </li>{" "}
            <li> 24 / 7 customer support </li> <li> Secure payment options </li>{" "}
            <li> Easy returns and exchanges </li>{" "}
          </ul>{" "}
        </section>
        <section className='about-content'>
          <h2> Our Values </h2>{" "}
          <p>
            We are committed to integrity, quality, and customer
            satisfaction.Our team works tirelessly to ensure that every
            interaction with HK is positive and rewarding.We believe in
            continuous improvement and innovation to better serve our customers.{" "}
          </p>{" "}
        </section>
        <section className='about-content'>
          <h2> Contact Us </h2>{" "}
          <p>
            Have questions ? We 'd love to hear from you! Reach out to us
            through our contact page or visit our store location.Our dedicated
            team is always ready to assist you.{" "}
          </p>{" "}
        </section>{" "}
      </div>{" "}
    </div>
  );
};

export default About;
