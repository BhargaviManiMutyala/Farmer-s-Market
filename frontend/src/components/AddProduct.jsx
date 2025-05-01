import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css';
import Navbar from '../components/Navbar';

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    quantity: '',
    lastDate: '',
    price: '',
    phone: '',
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('quantity', product.quantity);
    formData.append('lastDate', product.lastDate);
    formData.append('price', product.price);
    formData.append('phone',product.phone);
    formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Product added successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to add product');
    }
  };

  return (
    <div className="add-product-container">
    <Navbar role="farmer" />
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-row">
            <label>Product Name</label>
            <input name="name" onChange={handleChange} required />
        </div>

        <div className="form-row">
            <label>Product Photo</label>
            <input type="file" accept="image/*" capture="environment" onChange={handleImageChange} required />
        </div>

        <div className="form-row">
            <label>Product Quantity</label>
            <input name="quantity" onChange={handleChange} required />
        </div>

        <div className="form-row">
            <label>Last date for sale</label>
            <input type="date" name="lastDate" onChange={handleChange} required />
        </div>

        <div className="form-row">
            <label>Price per weight</label>
            <input name="price" onChange={handleChange} required />
        </div>

        <div className="form-row">
            <label>Phone Number</label>
            <input name="phone" onChange={handleChange} required />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
