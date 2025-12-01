import React from "react";
import { useCart } from "../contexts/CartContext";
import { useProducts } from "../contexts/ProductContext";
import { useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const { cartItems, removeFromCart, updateQty, subtotal, isDrawerOpen, closeDrawer, clearCart } = useCart();
  const { products, updateProductQuantity } = useProducts();
  const navigate = useNavigate();

  function handleCheckout() {
    // Reduce inventory quantities by cart qty (validate)
    cartItems.forEach((item) => {
      const prod = products.find((p) => p.id === item.id);
      if (prod) {
        updateProductQuantity(prod.id, Math.max(0, prod.quantity - item.qty));
      }
    });
    clearCart();
    closeDrawer();
    // optionally show success page (we keep it local). If you still have /success route, you can navigate.
    navigate("/success");
  }

  return (
    <>
      <div className={`cart-drawer__backdrop ${isDrawerOpen ? "open" : ""}`} onClick={closeDrawer} />
      <aside className={`cart-drawer ${isDrawerOpen ? "open" : ""}`} aria-hidden={!isDrawerOpen}>
        <div className="top">
          <div>
            <h3 style={{margin:0, color:"#3e2f26"}}>Your Cart</h3>
            <div style={{fontSize:12, color:"#8a7768"}}>{cartItems.length} item(s)</div>
          </div>
          <div>
            <button onClick={closeDrawer} style={{background:"transparent", border:"none", cursor:"pointer", fontWeight:700}}>Close</button>
          </div>
        </div>

        <div className="items">
          {cartItems.length === 0 && <div style={{color:"#8a7768", padding:"18px 0"}}>No items in cart yet — add something tasty 🍰</div>}
          {cartItems.map((i) => (
            <div key={i.id} className="cart-item">
              <img src={i.image} alt={i.name} />
              <div style={{flex:1}}>
                <div className="meta">
                  <div className="name">{i.name}</div>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:6}}>
                    <div className="price">₱{(i.price).toFixed(2)}</div>
                    <div className="qty-controls">
                      <button className="inv-btn" onClick={() => updateQty(i.id, Math.max(1, i.qty - 1))}>−</button>
                      <div style={{padding:"6px 8px", background:"#fff", borderRadius:8}}>{i.qty}</div>
                      <button className="inv-btn" onClick={() => updateQty(i.id, i.qty + 1)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button onClick={() => removeFromCart(i.id)} style={{background:"transparent", border:"none", cursor:"pointer", color:"#b35b2b"}}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="drawer-footer">
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <div style={{fontSize:14, color:"#6b5a4a"}}>Subtotal</div>
            <div style={{fontWeight:800, color:"var(--mm-accent)"}}>₱{subtotal.toFixed(2)}</div>
          </div>
          <div style={{display:"flex", gap:8}}>
            <button className="checkout-btn" onClick={handleCheckout} disabled={cartItems.length === 0}>
              Checkout
            </button>
            <button className="clear-btn" onClick={clearCart} disabled={cartItems.length === 0}>
              Clear
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
