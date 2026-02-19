import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <footer className="footer">
            <div className="container">
              <div className="footer-content">
                <h3 className="footer-title">
                  HK<span> Dealers</span>
                </h3>
                <p className="footer-tagline">Nepal's Premier Watch Dealer</p>
                <p className="footer-copyright">
                  © 2026 HK Dealers. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
