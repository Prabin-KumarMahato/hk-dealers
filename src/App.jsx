import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./app.css";
import Navbar from "./components/Navbar.jsx";
import { CartProvider } from "./context/CartContext.jsx";

// ── Route-based code splitting ───────────────────────────────────
// Only Home loads eagerly (it's the landing page). The rest load on demand.
import Home from "./pages/Home.jsx";

const Products = lazy(() => import("./pages/Products.jsx"));
const ProductDetail = lazy(() => import("./pages/ProductDetail.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));

// Minimal spinner for route transitions
const RouteFallback = () => <div className="spinner" />;

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Suspense>
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
