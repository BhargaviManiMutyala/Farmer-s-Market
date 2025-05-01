import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css'; // same Home.css file
import Navbar from '../components/Navbar'; // adjust the path based on your file structure


export default function FarmerHome() {
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/buyers')
      .then(res => setBuyers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Navbar role="farmer" />
      <div className="home-container">
        <h3>Available Buyers</h3>
        <div className="card-container">
          {buyers.map((buyer) => (
            <div className="card" key={buyer._id}>
              <h4>{buyer.marketName}</h4>
              <p>Phone: {buyer.phone}</p>
              <p>Location: {buyer.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
