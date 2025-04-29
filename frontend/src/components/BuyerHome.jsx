import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

export default function BuyerHome() {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/farmers')
      .then(res => setFarmers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="home-container">
      <h2>Welcome, Buyer!</h2>
      <h3>Available Farmers</h3>
      <ul>
        {farmers.map((farmer) => (
          <li key={farmer._id}>
            {farmer.farmName} - {farmer.phone} - {farmer.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
