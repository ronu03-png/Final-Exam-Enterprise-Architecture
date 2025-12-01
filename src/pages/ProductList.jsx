import React from "react";
import { useProducts } from "../contexts/ProductContext";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";

export default function ProductList({ preview = false }) {
  const { products } = useProducts();
  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);
  const category = urlParams.get("category");

  let list = products;
  if (category && category !== "All") {
    list = products.filter((p) => p.category === category);
  }
  if (preview) list = list.slice(0, 4);

  return (
    <div className="product-list">
      {list.length === 0 && <p>No products found.</p>}
      <div className="grid">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
