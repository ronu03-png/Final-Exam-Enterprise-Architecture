import React from "react";
import { useCart } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../contexts/ProductContext";

export default function CartPage() {
  const { cartItems, updateQty, removeFromCart, subtotal, clearCart } = useCart();
  const { products, updateProductQuantity } = useProducts();
  const navigate = useNavigate();

  function handleCheckout() {
    // reduce product inventory based on cart
    cartItems.forEach((item) => {
      const prod = products.find((p) => p.id === item.id);
      if (prod) {
        updateProductQuantity(prod.id, prod.quantity - item.qty);
      }
    });
    clearCart();
    navigate("/success");
  }

  if (cartItems.length === 0) {
    return (
      <div>
        <h2>Your Cart is empty</h2>
        <Link to="/products">Go to Products</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((i) => (
            <tr key={i.id}>
              <td className="product-cell">
                <img src={i.image} alt={i.name} />
                <div>{i.name}</div>
              </td>
              <td>₱{i.price.toFixed(2)}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={i.qty}
                  onChange={(e) => updateQty(i.id, Math.max(1, Number(e.target.value)))}
                />
              </td>
              <td>₱{(i.price * i.qty).toFixed(2)}</td>
              <td><button onClick={() => removeFromCart(i.id)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-summary">
        <h3>Total: ₱{subtotal.toFixed(2)}</h3>
        <div className="cart-actions">
          <button onClick={handleCheckout}>Checkout</button>
          <button onClick={() => navigate("/products")}>Continue Shopping</button>
        </div>
      </div>
    </div>
  );
}
