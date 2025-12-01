import React from "react";
import { Link } from "react-router-dom";

export default function Successful() {
  return (
    <div className="success">
      <h2>Purchase Successful</h2>
      <p>Thank you for your order — inventory updated.</p>
      <Link to="/products">Back to products</Link>
    </div>
  );
}
