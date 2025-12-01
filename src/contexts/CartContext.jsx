import React, { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]); // {id, name, price, qty, image}
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Drawer controls
  function openDrawer() {
    setDrawerOpen(true);
  }
  function closeDrawer() {
    setDrawerOpen(false);
  }
  function toggleDrawer() {
    setDrawerOpen((v) => !v);
  }

  function addToCart(product, qty = 1) {
    setCartItems((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: Math.min(i.qty + qty, product.quantity) } : i
        );
      } else {
        return [...prev, { id: product.id, name: product.name, price: product.price, qty: Math.min(qty, product.quantity), image: product.image }];
      }
    });
  }

  function removeFromCart(id) {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }

  function updateQty(id, qty) {
    setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  }

  function clearCart() {
    setCartItems([]);
  }

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, i) => acc + i.price * i.qty, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        subtotal,
        // drawer controls
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
