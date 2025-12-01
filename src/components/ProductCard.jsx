import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../contexts/ProductContext";
import { useCart } from "../contexts/CartContext";

export default function ProductCard({ product }) {
  const { updateProductQuantity } = useProducts();
  const { addToCart } = useCart();
  const [localQty, setLocalQty] = useState(1);

  const subtotal = product.price * product.quantity;

  function decreaseInventory() {
    updateProductQuantity(product.id, product.quantity - 1);
  }
  function increaseInventory() {
    updateProductQuantity(product.id, product.quantity + 1);
  }

  return (
    <div className={"product-card " + (product.quantity < 5 ? "low-stock" : "")}>
      <img src={product.image} alt={product.name} />

      <div className="card-body">
        <div className="card-top">
          <div className="category">{product.category}</div>
        </div>

        <h3>
          <Link
            to={`/product/${product.id}`}
            style={{ textDecoration: "none", color: "#3e2f26" }}
          >
            {product.name}
          </Link>
        </h3>

        {/* ⭐⭐⭐ Rating Stars with Half-Star Support ⭐⭐⭐ */}
        <div className="rating-stars">
          {Array.from({ length: 5 }, (_, i) => {
            const fullStars = Math.floor(product.rating);
            const isHalf =
              product.rating - fullStars >= 0.5 && i === fullStars;

            return (
              <span
                key={i}
                className={
                  i < fullStars
                    ? "star filled"
                    : isHalf
                    ? "star half"
                    : "star"
                }
              >
                {isHalf ? "⯨" : "★"}
              </span>
            );
          })}
        </div>

        <p className="desc">{product.description}</p>

        <div className="card-meta">
          <div className="price">₱{product.price.toFixed(2)}</div>
          <div className="stock">{product.quantity} left</div>
        </div>

        <div className="inventory">
          <button
            className="inv-btn"
            onClick={decreaseInventory}
            disabled={product.quantity <= 0}
          >
            −
          </button>

          <div style={{ fontSize: 13 }}>{product.quantity}</div>

          <button className="inv-btn" onClick={increaseInventory}>
            +
          </button>

          {product.quantity < 5 && <div className="low-stock">Low Stock</div>}
        </div>

        <div className="actions">
          <div className="add-to-cart">
            <input
              type="number"
              min="1"
              max={product.quantity}
              value={localQty}
              onChange={(e) =>
                setLocalQty(
                  Math.max(
                    1,
                    Math.min(
                      product.quantity,
                      Number(e.target.value || 1)
                    )
                  )
                )
              }
            />

            <button
              onClick={() => addToCart(product, Number(localQty))}
              disabled={product.quantity <= 0}
            >
              Add
            </button>
          </div>

          <div style={{ fontSize: 13, color: "#6b5a4a" }}>
            Inventory subtotal: ₱{subtotal.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
