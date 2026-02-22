import React, { createContext, useEffect, useState } from "react";
import { api } from "../api/client.js";

const CART_STORAGE_KEY = "hk_dealers_cart";

export const CartContext = createContext();

function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(items) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Failed to save cart:", e);
  }
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCartItems(loadCartFromStorage());
  }, []);

  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);

  const addToCart = async (product, qty = 1) => {
    const quantity = Math.max(1, Number(qty) || 1);
    const id = product._id || product.id;
    if (!id) {
      console.error("Product has no _id or id", product);
      return;
    }
    setCartItems((prev) => {
      const existing = prev.find((item) => (item.id || item.productId) === id);
      if (existing) {
        return prev.map((item) =>
          (item.id || item.productId) === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id,
          productId: id,
          brand: product.brand,
          model: product.name,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => (item.id || item.productId) !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateQuantity = (productId, quantity) => {
    const q = Math.max(0, Number(quantity) || 0);
    if (q === 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        (item.id || item.productId) === productId ? { ...item, quantity: q } : item
      )
    );
  };

  /**
   * Submit order to backend. Call with full orderData (form + items + totalPrice).
   * Does NOT clear cart; caller should clearCart() after success.
   */
  const createOrder = async (orderData) => {
    const response = await api.post("/api/orders", orderData);
    return response;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
