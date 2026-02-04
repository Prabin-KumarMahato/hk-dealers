import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [cartCount] = useState(3); // Example cart count

  return (
    <nav className='navbar'>
      <div className='container nav-container'>
        <Link
          to='/'
          className='logo'>
          <img
            src='/logo.png'
            alt='HK Dealers'
            className='logo-img'
          />
          <span className='logo-text'>
            {" "}
            HK <span className='logo-highlight'> DEALERS </span>
          </span>
        </Link>{" "}
        <ul className='nav-links'>
          <li>
            <Link
              to='/'
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}>
              Home{" "}
            </Link>{" "}
          </li>{" "}
          <li>
            <Link
              to='/products'
              className={`nav-link ${
                location.pathname === "/products" ? "active" : ""
              }`}>
              Watches{" "}
            </Link>{" "}
          </li>{" "}
          <li>
            <Link
              to='/about'
              className={`nav-link ${
                location.pathname === "/about" ? "active" : ""
              }`}>
              About{" "}
            </Link>{" "}
          </li>{" "}
          <li>
            <Link
              to='/contact'
              className={`nav-link ${
                location.pathname === "/contact" ? "active" : ""
              }`}>
              Contact{" "}
            </Link>{" "}
          </li>{" "}
          <li>
            <Link
              to='/cart'
              className='nav-link cart-icon'>
              Cart{" "}
              {cartCount > 0 && (
                <span className='cart-count'> {cartCount} </span>
              )}{" "}
            </Link>{" "}
          </li>{" "}
        </ul>{" "}
      </div>{" "}
    </nav>
  );
};

export default Navbar;
