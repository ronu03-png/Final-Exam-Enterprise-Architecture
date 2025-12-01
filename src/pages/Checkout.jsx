import React from "react";
import { Link } from "react-router-dom";

export default function Checkout() {
  return (
    <div>
      <h2>Checkout</h2>
      <p>This demo performs checkout immediately from the cart page (reduces inventory).</p>
      <Link to="/products">Back to shop</Link>
    </div>
  );
}
