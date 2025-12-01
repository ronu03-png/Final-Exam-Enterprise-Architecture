import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../contexts/ProductContext";
import { useCart } from "../contexts/CartContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { getProductById } = useProducts();
  const product = getProductById(id);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-details">
      <button onClick={() => navigate(-1)}>← Back</button>
      <div className="details-grid">
        <img src={product.image} alt={product.name} />
        <div>
          <h2>{product.name}</h2>
          <p className="category">Category: {product.category}</p>
          <p className="price">₱{product.price.toFixed(2)}</p>
          <p>{product.description}</p>
          <p>Specification: {product.specification}</p>
          <p>Rating: {product.rating} / 5</p>
          {product.quantity < 5 && <p className="lowstock">Low Stock</p>}
          <div className="actions">
            <button onClick={() => addToCart(product, 1)} disabled={product.quantity <= 0}>
              Add to Cart
            </button>
            <button onClick={() => navigate("/cart")}>Go to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
