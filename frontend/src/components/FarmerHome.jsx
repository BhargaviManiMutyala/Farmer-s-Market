import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

export default function FarmerHome() {
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/buyers')
      .then(res => setBuyers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="home-container">
      <h2>Welcome, Farmer!</h2>
      <h3>Available Buyers</h3>
      <ul>
        {buyers.map((buyer) => (
          <li key={buyer._id}>
            {buyer.marketName} - {buyer.phone} - {buyer.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
