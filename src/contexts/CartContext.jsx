import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [userSession, setUserSession] = useState(() => {
    const storedSession = Cookies.get('user_session');
    return storedSession ? JSON.parse(storedSession) : null;
  });

  const [cartItems, setCartItems] = useState(() => {
    const local = localStorage.getItem('cart');
    if (local) return JSON.parse(local);

    const session = sessionStorage.getItem('cart');
    if (session) return JSON.parse(session);

    const cookie = Cookies.get('cart');
    if (cookie) return JSON.parse(cookie);

    return [];
  });

  const syncCartStorage = async (items) => {
    const data = JSON.stringify(items);

    localStorage.setItem('cart', data);

    sessionStorage.setItem('cart', data);

    Cookies.set('cart', data, { expires: 7 });

    // Cache storage
    if ('caches' in window) {
      const cache = await caches.open('cart-cache');
      const response = new Response(data, {
        headers: { 'Content-Type': 'application/json' },
      });
      await cache.put('/cart-cache', response);
    }
  };

  useEffect(() => {
    syncCartStorage(cartItems);
  }, [cartItems]);

  const saveUserSession = (sessionData) => {
    setUserSession(sessionData);
    Cookies.set('user_session', JSON.stringify(sessionData), { expires: 7 });
  };

  const clearUserSession = () => {
    setUserSession(null);
    Cookies.remove('user_session');
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems((prevItems) => {
      if (newQuantity === 0) {
        return prevItems.filter((item) => item.id !== itemId);
      }
      return prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  return (
    <CartContext.Provider
      value={{
        userSession,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        saveUserSession,
        clearUserSession,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
