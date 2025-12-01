import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useProducts } from "../contexts/ProductContext";
import { useCart } from "../contexts/CartContext";
import logo from "../assets/logo.jpg";


export default function Header() {
  const { categories } = useProducts();
  const { cartItems, toggleDrawer, openDrawer } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [cat, setCat] = useState("All");

  function handleFilterChange(e) {
    setCat(e.target.value);
    const url = new URL(window.location);
    if (e.target.value === "All") url.searchParams.delete("category");
    else url.searchParams.set("category", e.target.value);
    navigate({ pathname: location.pathname, search: url.search }, { replace: true });
  }

  return (
    <header className="header container" role="banner">
      <div className="brand">
        <div className="logo">
          <img src={logo} alt="Morning Munch Logo" />
        </div>

        <div>
          <h1>Morning Munch</h1>
          <div style={{fontSize:12, color:"#8a7768"}}>Cafe • Snacks • Morning treats</div>
        </div>
      </div>

      <div className="header-controls">
        <div className="header-nav" aria-hidden>
          <Link to="/products">Menu</Link>
          <Link to="/add">Add</Link>
        </div>

        <select value={cat} onChange={handleFilterChange} aria-label="Filter by category">
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button
          className="cart-btn"
          onClick={() => {
            // open the floating drawer; no navigation
            openDrawer();
          }}
          aria-label="Open cart"
          title="Open cart"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="10" cy="20" r="1.6" fill="white"/>
            <circle cx="18" cy="20" r="1.6" fill="white"/>
          </svg>
          Cart <span className="cart-count">{cartItems.length}</span>
        </button>
      </div>
    </header>
  );
}
