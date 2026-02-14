import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (watch) => {
    const existingItem = cartItems.find(item => item.id === watch.id);
    
    if (existingItem) {
      alert("This watch is already in your cart!");
      return;
    }
    
    setCartItems((prev) => [...prev, watch]);
    alert("Watch added to cart!");
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};