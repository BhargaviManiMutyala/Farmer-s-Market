import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'; // ✅ Don't forget this
import './Home.css';

export default function BuyerHome() {
  const [farmers, setFarmers] = useState([]);
  const [products, setProducts] = useState({});

  // Fetch all farmers and their products when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/farmers')
      .then(res => {
        setFarmers(res.data); // Set farmers

        // Fetch products for each farmer based on their phone number
        res.data.forEach(farmer => {
          axios.get(`http://localhost:5000/api/products?phone=${farmer.phone}`)
            .then(res => {
              setProducts(prev => ({
                ...prev,
                [farmer.phone]: res.data, // Store products per farmer
              }));
            })
            .catch(err => console.error(err));
        });
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Navbar role="buyer" /> {/* ✅ Navbar specific to buyer */}
      <div className="home-container">
        <h3>Available Farmers</h3>
        <div className="card-container">
          {farmers.map((farmer) => (
            <div className="card" key={farmer._id}>
              <h4>{farmer.farmName}</h4>
              <p>Phone: {farmer.phone}</p>
              <p>Location: {farmer.location}</p>

              {/* Display Products for this Farmer */}
              <div className="product-list">
                <h5>Products:</h5>
                {products[farmer.phone] ? (
                  <ul>
                    {products[farmer.phone].map((product) => (
                      <li key={product._id}>
                        {product.name} - {product.price} - {product.quantity}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No products available</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
