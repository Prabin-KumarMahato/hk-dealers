import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./app.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <main className='main-content'>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />{" "}
            <Route
              path='/products'
              element={<Products />}
            />{" "}
            <Route
              path='/product/:id'
              element={<ProductDetail />}
            />{" "}
            <Route
              path='/cart'
              element={<Cart />}
            />{" "}
            <Route
              path='/about'
              element={<About />}
            />{" "}
            <Route
              path='/contact'
              element={<Contact />}
            />{" "}
          </Routes>{" "}
        </main>
        <footer className='footer'>
          <div className='container'>
            <div className='footer-content'>
              <div className='footer-section'>
                <h3>
                  Watch <span> HK </span>{" "}
                </h3>{" "}
                <p> Hong Kong 's Premier Watch Dealer</p>{" "}
              </div>{" "}
              <div className='footer-section'>
                <p> ©2024 WatchHK.All rights reserved. </p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </footer>{" "}
      </div>{" "}
    </Router>
  );
}

export default App;
