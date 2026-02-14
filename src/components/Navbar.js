import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-container">
          <Link to="/" className="logo">
            <img src="/logo.png" alt="WatchHK Logo" className="logo-img" />
          </Link>

          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="nav-link">
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
            <li className="cart-icon">
              <Link to="/cart" className="nav-link">
                Cart
                {cartItems.length > 0 && (
                  <span className="cart-count">{cartItems.length}</span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
