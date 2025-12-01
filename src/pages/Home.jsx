import React from "react";
import ProductList from "./ProductList";

export default function Home() {
  return (
    <div>
      <section className="hero">
        <h2>Welcome to RonuBites</h2>
        <p>Explore coffee, tea, shakes, bread, chips and more.</p>
      </section>
      <ProductList preview />
    </div>
  );
}
