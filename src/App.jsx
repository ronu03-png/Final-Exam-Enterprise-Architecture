import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetailsPage from "./pages/ProductDetails";
import AddProductPage from "./pages/AddProduct";
import Checkout from "./pages/Checkout";
import Successful from "./pages/Successful";
import CartDrawer from "./components/CartDrawer";
import "./styles.css";

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/add" element={<AddProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Successful />} />
        </Routes>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
