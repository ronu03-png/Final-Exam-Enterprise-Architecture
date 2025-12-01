import React, { createContext, useState, useContext, useMemo } from "react";
import defaultProducts from "../data/products";

const ProductContext = createContext();

export function useProducts() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(defaultProducts);

  // Add a product (validate before calling)
  function addProduct(newProduct) {
    // generate simple id
    const id = "p" + Date.now();
    setProducts((prev) => [{ ...newProduct, id }, ...prev]);
  }

  function updateProductQuantity(id, newQty) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(0, newQty) } : p))
    );
  }

  function getProductById(id) {
    return products.find((p) => p.id === id);
  }

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [products]);

  // overall total of all product subtotals (inventory price * quantity)
  const overallInventoryTotal = useMemo(() => {
    return products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  }, [products]);

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProductQuantity,
        getProductById,
        categories,
        overallInventoryTotal,
        setProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
