import React, { useState } from "react";
import { useProducts } from "../contexts/ProductContext";
import { useNavigate } from "react-router-dom";

export default function AddProductForm() {
  const { addProduct } = useProducts();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    image: "",
    name: "",
    category: "",
    description: "",
    specification: "",
    rating: "",
    price: "",
    quantity: "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function validate() {
    const err = {};
    if (!form.image) err.image = "Image URL is required";
    if (!form.name) err.name = "Product name is required";
    if (!form.category) err.category = "Category is required";
    if (!form.description) err.description = "Description is required";
    if (!form.specification) err.specification = "Specification is required";
    if (!form.rating || Number(form.rating) < 0 || Number(form.rating) > 5) err.rating = "Rating 0-5 required";
    if (!form.price || Number(form.price) <= 0) err.price = "Price must be > 0";
    if (!form.quantity || Number(form.quantity) < 0) err.quantity = "Quantity must be >= 0";
    return err;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }
    addProduct({
      image: form.image,
      name: form.name,
      category: form.category,
      description: form.description,
      specification: form.specification,
      rating: Number(form.rating),
      price: Number(form.price),
      quantity: Number(form.quantity),
    });

    navigate("/products");
  }

  return (
    <form className="add-product-form" onSubmit={handleSubmit}>
      <h2>Add New Product</h2>
      <label>
        Image URL
        <input name="image" value={form.image} onChange={handleChange} />
        {errors.image && <small className="error">{errors.image}</small>}
      </label>

      <label>
        Name
        <input name="name" value={form.name} onChange={handleChange} />
        {errors.name && <small className="error">{errors.name}</small>}
      </label>

      <label>
        Category
        <input name="category" value={form.category} onChange={handleChange} />
        {errors.category && <small className="error">{errors.category}</small>}
      </label>

      <label>
        Description
        <textarea name="description" value={form.description} onChange={handleChange} />
        {errors.description && <small className="error">{errors.description}</small>}
      </label>

      <label>
        Specification
        <input name="specification" value={form.specification} onChange={handleChange} />
        {errors.specification && <small className="error">{errors.specification}</small>}
      </label>

      <label>
        Rating (0-5)
        <input name="rating" type="number" step="0.1" value={form.rating} onChange={handleChange} />
        {errors.rating && <small className="error">{errors.rating}</small>}
      </label>

      <label>
        Price
        <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} />
        {errors.price && <small className="error">{errors.price}</small>}
      </label>

      <label>
        Quantity
        <input name="quantity" type="number" value={form.quantity} onChange={handleChange} />
        {errors.quantity && <small className="error">{errors.quantity}</small>}
      </label>

      <div className="form-actions">
        <button type="submit">Add Product</button>
      </div>
    </form>
  );
}
