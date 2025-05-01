import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Home.css'; // You can use your existing styles here

export default function FarmerProducts() {
  const { phone } = useParams();
  const [farmer, setFarmer] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Get farmer info
    axios.get('http://localhost:5000/api/farmers')
      .then(res => {
        const found = res.data.find(f => f.phone === phone);
        setFarmer(found);
      });

    // Get products of farmer
    axios.get(`http://localhost:5000/api/products?phone=${phone}`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, [phone]);

  const handleRequest = async (product) => {
    const buyer = JSON.parse(localStorage.getItem('buyer'));
    if (!buyer) {
      alert('Please log in as a buyer.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/requests', {
        buyerName: buyer.name,
        buyerPhone: buyer.phone,
        buyerEmail: buyer.email,
        farmerPhone: farmer.phone,
        productId: product._id,
        productName: product.name
      });

      alert('Request sent to farmer!');
    } catch (err) {
      console.error('Failed to send request:', err);
      alert('Failed to send request.');
    }
  };

  if (!farmer) return <p>Loading...</p>;

  return (
    <div>
      <Navbar role="buyer" />
      <div className="home-container">
        <h3>Products by {farmer.farmName}</h3>
        <div className="card-container">
          {products.map(product => (
            <div className="card" key={product._id}>
              <h4>{product.name}</h4>
              <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} width="100%" />
              <p><strong>Farmer:</strong> {farmer.farmName}</p>
              <p><strong>Phone:</strong> {farmer.phone}</p>
              <p><strong>Location:</strong> {farmer.location}</p>
              <p><strong>Quantity:</strong> {product.quantity}</p>
              <p><strong>Price:</strong> {product.price}</p>
              <p><strong>Last Date:</strong> {product.lastDate}</p>
              <button onClick={() => handleRequest(product)}>Request</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
