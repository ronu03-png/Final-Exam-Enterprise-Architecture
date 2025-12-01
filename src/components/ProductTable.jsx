import React from "react";

export default function ProductTable({ rows }) {
  // Simple table renderer, rows is array of {id, name, price, quantity}
  return (
    <table className="simple-table">
      <thead>
        <tr><th>Product</th><th>Price</th><th>Qty</th><th>Subtotal</th></tr>
      </thead>
      <tbody>
        {rows.map(r => (
          <tr key={r.id}>
            <td>{r.name}</td>
            <td>₱{r.price.toFixed(2)}</td>
            <td>{r.quantity}</td>
            <td>₱{(r.price * r.quantity).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
